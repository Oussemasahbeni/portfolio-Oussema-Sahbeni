---
title: From Bytecode to AOT Cache, Part 3 - From CDS to Project Leyden, the AOT Cache
slug: jvm-aot-cache
description: Part 3 of my journey into JVM startup. How the JVM saves work between runs, from the 20-year-old CDS trick to the AOT cache of Project Leyden in JDK 24 and 25.
date: 2026-10-04
draft: true
tags: ['Java', 'JVM', 'Performance', 'Spring Boot']
attributes:
  author: Oussema Sahbeni
---

The first two parts of this series ended on the same sentence. Startup does identical work on every run: the same classes loaded, verified, prepared and resolved, in the same order. Warmup does identical work on every run: the same methods get hot, get the same profiles, get compiled to the same code. And then the process exits and everything is thrown away.

If the result is the same every time, why not do it once, save it, and reuse it?

This part is about how the JVM answers that question. The answer is older than I thought, and it has been sitting in the logs since part 1.

## CDS: the answer the JDK shipped 20 years ago

Remember this line from the class-loading log in [part 1](/blog/jvm-startup)?

```text
[0.019s][info][class,load] java.lang.Object source: shared objects file
```

613 of the 617 classes of a hello world did not come from a jar. They came from a **shared objects file**. That file is `classes.jsa`, it ships inside every JDK, and it is the result of someone at the JDK build farm doing exactly what we asked for: loading the core JDK classes once, and saving the result.

This is **CDS**, Class Data Sharing, and it has been in the JDK since Java 5. The idea:

- Take the classes everybody always loads (`java.lang.String`, the collections, and so on).
- Load, parse and **verify** them once, at JDK build time.
- Write the JVM's internal representation of them, the metaspace form we saw in part 1, into a file.
- On every start, **memory-map** that file straight into the metaspace instead of doing the work.

Memory-mapping is the nice part: the file is not even really "read", the OS just maps it into the address space, and if five JVMs run on the same machine they share the same physical memory for it. That is where the word "sharing" comes from.

You have been using CDS on every `java` command you ever ran. It is on by default (`-Xshare:auto`). From part 1: turning it off with `-Xshare:off` took my hello world from about 180 ms to about 215 ms. That is the JDK's own classes only, which is why the effect is small. The interesting question is: can we do the same for _our_ classes?

## AppCDS: your classes too

Yes, since JDK 10, and it is called AppCDS. The modern form (JDK 13+) takes two commands. First, a run that records and archives:

```bash
java -XX:ArchiveClassesAtExit=app.jsa -jar app.jar
```

You exercise the app a bit, stop it, and when the JVM exits it writes every class it loaded into `app.jsa`. Then every next start uses the archive:

```bash
java -XX:SharedArchiveFile=app.jsa -jar app.jar
```

I tried it on Spring Petclinic (on the extracted layout you will meet in part 4): startup went from **5.4 seconds to 3.2 seconds**, for a 97 MB `app.jsa`. For the 10,000+ classes of a Spring Boot app this is already a real win: loading, parsing and verification are skipped for all of them.

But look at what is still missing, against the list from part 1:

- **Resolution** is not saved. The constant pools come back symbolic; every `#13` is looked up again on every run.
- **Initialization** is not saved, and never will be: your static blocks are code, and code has to run.
- And the whole of part 2, **warmup**, is untouched: the JIT starts from zero, counting and profiling like it is the first day.

CDS caches the loading. Everything after loading is still paid on every start.

## Project Leyden and the AOT cache

This is exactly the gap [Project Leyden](https://openjdk.org/projects/leyden/) is working on. Leyden's whole idea fits in one phrase: **shift work in time**. If the JVM does something at startup that always produces the same result, do it earlier, at build time or in a previous run, and ship the result.

The first delivery is the **AOT cache**, in JDK 24 ([JEP 483](https://openjdk.org/jeps/483)). It works like CDS with one big conceptual addition: the **training run**. Instead of archiving whatever a JDK build farm loaded, you run _your_ app, with _your_ configuration, and the JVM watches what actually happens. On JDK 25 it is one flag ([JEP 514](https://openjdk.org/jeps/514)):

```bash
# training run: a normal run of your app, being watched
java -XX:AOTCacheOutput=app.aot -jar app.jar
```

You send it some traffic, stop it, and the JVM writes `app.aot`. From then on, every start uses it:

```bash
java -XX:AOTCache=app.aot -jar app.jar
```

![The AOT cache workflow: a training run of the app produces app.aot, and every next start uses it to skip the repeated work](/images/blog/jvm-aot-cache/jvm-aot-flow.webp)

What lands in that file is the reason this series spent two articles on internals:

- The classes, **loaded and parsed**: the metaspace entries from part 1, ready to be mapped.
- **Verified**: the type analysis is already done.
- **Linked**: this is the step up from CDS. Constant pool entries come pre-resolved; the `#13 -> 0x...` lookups from part 1 are already done for the classes in the cache.
- Since JDK 25 ([JEP 515](https://openjdk.org/jeps/515)): the **method profiles** from the training run. This is the first time the JVM ever attacked the warmup tax from part 2. The JIT does not start by watching and counting for thousands of calls; it already knows which methods are hot and what the type profiles look like, and it starts compiling them immediately, while the first real requests are coming in.

And to be honest about what is not in there:

- **Initialization**: your static blocks still run on every start. The JVM will not cache the side effects of your code.
- **The compiled native code itself**: in JDK 25 the JIT still has to compile, it just starts immediately and with a warm profile. Caching actual compiled code is the next Leyden step, already being tested in the leyden-premain builds.

## The flags, in one place

| Flag                                                      | Since  | What it does                                           |
| --------------------------------------------------------- | ------ | ------------------------------------------------------ |
| `-Xshare:auto`                                            | JDK 5  | Use the JDK's own CDS archive. Default, always on.     |
| `-Xshare:off`                                             | JDK 5  | Turn CDS off (only useful to measure the difference).  |
| `-XX:ArchiveClassesAtExit=app.jsa`                        | JDK 13 | AppCDS: archive the app's classes when this run exits. |
| `-XX:SharedArchiveFile=app.jsa`                           | JDK 10 | Start using an AppCDS archive.                         |
| `-XX:AOTMode=record` + `-XX:AOTConfiguration=app.aotconf` | JDK 24 | Training run, step 1 of the two-step form.             |
| `-XX:AOTMode=create` + `-XX:AOTCache=app.aot`             | JDK 24 | Turn the recording into the cache file, step 2.        |
| `-XX:AOTCacheOutput=app.aot`                              | JDK 25 | Training run and cache creation in **one** command.    |
| `-XX:AOTCache=app.aot`                                    | JDK 24 | Start the app with the cache.                          |

The JDK 24 two-step form (`record` then `create`) still exists and is what the one-flag version does under the hood. If you are on JDK 25, `-XX:AOTCacheOutput` is all you need to remember.

## So why did my first attempt only get halfway?

Armed with all of this, I pointed the AOT cache at Spring Boot's fat jar, trained it, ran it. It worked, technically. Startup went from about 6.9 seconds to about 4.5 on my machine. Better, sure. But the same app, packaged differently, goes to **2.2 seconds** with the exact same cache flags.

The 2.3 seconds the fat jar leaves on the table come from the way Spring Boot packages applications: jars nested inside a jar, read by a custom class loader (remember, from part 1, that loading detail I asked you to keep in mind). The cache can store those classes, but it cannot give them its best treatment.

What "packaged differently" means, why the fat jar only gets half the win, and the rules you have to follow to get all of it, is **part 4**.
