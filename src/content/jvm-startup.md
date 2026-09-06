---
title: From Bytecode to AOT Cache, Part 1 - What the JVM Does When You Start Your App
slug: jvm-startup
description: My journey to understand why Java apps start slow. Part 1 covers what I learned about bytecode, class loading, linking, initialization, and where all of it lives in memory.
date: 2026-09-01
tags: ['Java', 'JVM', 'Performance', 'Spring Boot']
attributes:
  author: Oussema Sahbeni
---

At work, we run a lot of Spring Boot microservices on Kubernetes. They are not all the same size, and they do not all start at the same speed. The small ones start in about 4 seconds. The big ones take up to 20 seconds. When Kubernetes needs to scale up because traffic is coming in, 20 seconds is a long time to wait for a pod that is supposed to help right now.

So I started digging: why does a Java app take so long to start, and what can we do about it?

The short answer is a new feature of the JVM called the **AOT cache**, which comes from [Project Leyden](https://openjdk.org/projects/leyden/). With it, I got the Spring Petclinic sample app from **6.9 seconds to 2.2 seconds** of startup, with no code change. But before getting there I had to understand a lot of things about the JVM that I had never really looked at.

That journey was too long for one article, so I wrote it as a **series of four**, and this is part 1:

1. **What the JVM does when you start your app**
2. [Warmup: why the app is still slow after "Started"](/blog/jvm-warmup)
3. [From CDS to Project Leyden: the AOT cache](/blog/jvm-aot-cache)
4. [Spring Boot, fat jars, and the AOT cache by the numbers](/blog/jvm-spring-boot-aot)

Each part builds on the previous one, and the last one ends with real measurements.

In this first part there is no AOT cache at all. It is only about what the JVM is doing during those seconds, because the cache makes no sense if you do not know what it is caching.

## Java is compiled and interpreted

When you run `javac`, you compile your `.java` files. But the result is not machine code that your CPU can run. It is **bytecode**, stored in `.class` files. Bytecode is a code representation that only the JVM understands. It is the same on Windows, Linux, macOS, x86 or ARM. That is the whole point: **build once, run everywhere**. You ship the same jar to any machine that has a JVM.

Then, when you run the app, the JVM reads that bytecode and translates it into something the machine it is running on can actually execute. That second step is the "interpreted" part.

Here is what bytecode looks like. Take this method:

```java
public static int add(int a, int b) {
    return a + b;
}
```

Compile it and look inside the class file with `javap`:

```bash
javac Hello.java
javap -c Hello
```

```text
public static int add(int, int);
  Code:
     0: iload_0
     1: iload_1
     2: iadd
     3: ireturn
```

`iload_0`, `iadd`, `ireturn`. These are instructions for the JVM, not for your CPU. Something has to translate them at runtime.

What I did not fully realize before is that the JVM has **two** ways to do this translation:

- The **interpreter** reads the bytecode instruction by instruction and executes it. It can start right away, but it is slow, because it re-translates the same instructions every time they run.
- The **JIT compiler** (Just-In-Time) takes a whole method, turns it into real native code once, and from then on the CPU runs that native code directly. This is fast, but the translation itself costs CPU time.

The JVM starts everything in the interpreter and only compiles the methods that are actually used a lot. How it decides what to compile, and why that makes Java apps slow after they start, is a story of its own: it gets the whole of part 2.

So a Java app pays two separate costs when it starts:

1. **Startup time**: everything the JVM does before your code is ready to serve requests.
2. **Warmup time**: the period after startup where your code is running, but slowly, because it is not compiled yet.

At work we mostly cared about the first one, and it is the subject of this article. The second one is part 2.

## Startup: what happens before your app is ready

Before I looked into this, my mental model of `java -jar app.jar` was simple: the JVM loads the classes from the jar, and then it runs `main`. That is not wrong, but "loads the classes" hides three separate steps, and they are not equally expensive.

The JVM specification calls them **loading**, **linking** and **initialization**. Every single class goes through them, one by one, the first time it is needed.

![JVM class loading: loading, linking and initialization](/images/blog/jvm-aot-cache/jvm-class-loading.webp)

### Loading

The JVM finds the `.class` file on the classpath (in a directory or inside a jar), reads its bytes, and parses them.

What does "parse" mean here? A `.class` file is just a binary file with a known layout, and the JVM turns those bytes into something it can work with, the same way a JSON parser turns text into objects. You can see what is inside one with `javap -v Hello`.

The part worth understanding is the **constant pool**. It is a lookup table at the top of the file: every name the class ever refers to (class names, method names, strings) is stored there once, with a number.

```text
Constant pool:
  #13 = Methodref   // Hello.add:(II)I
  #16 = Utf8        Hello
  #17 = Utf8        add
```

Why does this table exist? Because the bytecode itself never contains names. It never says "call `Hello.add`". It says "call #13", and entry #13 says "the method `add` of class `Hello`". Keep this table in mind, it comes back in the linking step.

The rest of the file is what you would expect: the fields, the methods with their bytecode (the `iload_0`, `iadd`... we saw earlier), and some metadata like the line numbers you see in stack traces.

Once parsing is done, the class exists in memory in two forms. The JVM builds its own internal representation, which is what it will actually use to run the code. And it creates one `java.lang.Class` object in the heap, which is the only form you can touch from Java: it is what `Foo.class` or `obj.getClass()` gives you.

One thing worth knowing: the loading is done by a **class loader**, and there are several of them. The bootstrap loader loads the core JDK classes (`java.lang.*`), the platform loader loads the rest of the JDK, and the application loader loads your classpath. Frameworks can add their own. Spring Boot does exactly that: a fat jar is loaded by a custom class loader that knows how to read jars nested inside the main jar. This detail will matter a lot in part 4, so keep it in mind.

The loaders form a hierarchy, and each one asks its parent before loading anything itself. The reason is not to save work, it is identity: in the JVM a class is identified by its name plus the loader that loaded it. If two loaders each loaded `java.lang.String`, you would have two incompatible `String` types in the same process. Delegation guarantees one copy, owned by one loader. It also means you cannot shadow a JDK class from your classpath: the bootstrap loader always finds the real one first.

![The class loader hierarchy: bootstrap, platform and application are built into the JDK, and frameworks add a custom loader below them such as Spring Boot's LaunchedClassLoader. Each one asks its parent first](/images/blog/jvm-aot-cache/jvm-class-loaders.webp)

### Linking

I thought linking was the JVM verifying the bytecode, and that is true, but it is only one of three things that happen in linking.

**Verification.** The JVM checks that the bytecode is valid and safe: types are consistent (you cannot add an object to an integer), jumps go to real instructions, `final` methods are not overridden, and so on. Verification is about the structure of the code, not about what happens when it runs. What surprised me is that verification is **real CPU work**: it is basically a type analysis of every method of every class. For a hello world it is nothing. For a Spring Boot app with more than ten thousand classes, it adds up.

**Preparation.** The JVM allocates the memory for the static fields of the class and sets them to their default values: numeric fields to 0, booleans to false, object references to null. The important detail is that your assignments do **not** run here. Take this class:

```java
static int count = 5;
static double rate = 1.5;
static String name = "App";
static int total;

static { total = count * 2; }
```

After preparation, the memory looks like this:

```text
count = 0      // not 5 yet
rate  = 0.0    // not 1.5 yet
name  = null   // not "App" yet
total = 0      // the static block has not run
```

The `= 5` and `= "App"` are code, and no code of yours has run at this point. They will run later, in the initialization step.

**Resolution.** This is where the constant pool from loading comes back. The bytecode never says "call `Hello.add`". It says "call #13", and #13 is just a name written in the table: "the method `add` of the class `Hello`". A name is not something you can execute. And why store a name instead of a pointer to the method? Because when `javac` compiled the file, there was no running program and no memory. There was nothing to point to. Resolution is the lookup that fixes this at runtime: the first time the instruction runs, the JVM takes the name, finds the class (loading it now if nobody has used it yet), finds the method inside it, and saves the answer in place of the name.

```text
Constant pool, before resolution (what javac wrote):
  #13 = Methodref   // Hello.add:(II)I      <- still just text

Constant pool, after resolution:
  #13 = 0x00007f3a2c40                      <- the real location of add in memory
```

The second time, the answer is already there. This is one reason the first execution of any code path is slower than the second.

### Initialization

Initialization is when the JVM runs the **static initializers** of the class: the static field assignments and the `static { }` blocks. This is also the moment static fields get their real values. Remember the class from the preparation step, where everything was 0 and null? Initialization runs its assignments and its static block, top to bottom, and now the memory looks the way you would expect:

```text
count = 5        // the = 5 finally runs
rate  = 1.5
name  = "App"    // a real String object, created in the heap
total = 10       // the static block runs: count * 2
```

It happens the first time the class is really used (you create an instance, call a static method, or access a static field).

Which means initialization is the only one of the three steps where your code runs. A static `Logger` field, a static `Pattern.compile(...)`, a static map filled from a file: all of that runs during initialization, and it can be as slow as you make it.

### Seeing it for yourself

I had never looked at what the JVM actually loads, so I tried it. The JVM has a logging flag, `-Xlog:class+load`, that prints one line per class it loads, in order, with where it came from. Here is a hello world on JDK 25:

```bash
java -Xlog:class+load Hello
```

```text
[0.019s][info][class,load] java.lang.Object source: shared objects file
[0.019s][info][class,load] java.io.Serializable source: shared objects file
[0.019s][info][class,load] java.lang.Comparable source: shared objects file
...
[0.038s][info][class,load] Hello source: file:/C:/dev/hello/
```

Two things I did not expect.

First, the number. A program that prints one line loads **617 classes**. My class is one of them. The other 616 are the JDK itself: strings, collections, the module system, `System.out`, and so on. A Spring Boot web app loads more than 10,000. Every one of them goes through loading, linking and initialization, and when the process exits, all of that work is thrown away. Next start, the JVM does it all again.

Second, that `source: shared objects file`. 613 of the 617 classes did not come from a jar or from the JDK's own class files. They came from something called a shared objects file. I had no idea what that was. It turns out the JDK has been shipping a pre-built archive of its core classes for years, so it can skip the loading and parsing for them. This is called **CDS**, Class Data Sharing, and it is the ancestor of the AOT cache. You can turn it off with `-Xshare:off` and see the difference: on my machine the hello world goes from about 180 ms to about 215 ms. Not a lot, but on a hello world there is not a lot to save. Part 3 starts from there.

If you want to count classes for your own app:

```bash
java -Xlog:class+load:file=classes.log -jar app.jar
# wait for "Started ..." then stop it
grep -c 'class,load' classes.log
```

## Where does all of this live? JVM memory

At this point the JVM has parsed 617 classes (or 10,000), built its internal representation for each one, created the `Class` objects, allocated the static fields, and `main` is creating objects on top of all that. All of it has to live somewhere. If you had asked me before, I would have said "in the heap". But the heap is only one region among several, and classes do not even live there.

![The memory of a JVM process: the heap, the metaspace, one stack per thread and the code cache, all inside native memory](/images/blog/jvm-aot-cache/jvm-memory.webp)

### The heap

This is the region everybody knows. Every object you create with `new` goes to the heap, and the garbage collector cleans it up when nobody references it anymore. It is also where the `java.lang.Class` objects from the loading step live, and the static fields of a class are stored with its `Class` object. The heap is what you size with `-Xmx`, and for most people it is the only JVM memory they have ever thought about. It was for me.

### The metaspace

Remember the loading step, where the JVM parses the `.class` file into its own internal representation: the method bytecode, the constant pool, the field layout? All of that goes to the **metaspace**. Not the heap. One entry per loaded class, and it stays there as long as the class stays loaded, which in practice means as long as the app runs.

For our `Hello` class, the metaspace entry is everything we met earlier in this article, in one place:

![The metaspace entry of the Hello class: its constant pool, field layout and method bytecode, with the Class object in the heap as a small handle pointing to it](/images/blog/jvm-aot-cache/jvm-metaspace-entry.webp)

The `Class` object in the heap is just a small handle; this entry is the real thing the JVM works with when it runs your code.

This is the region that grows with the number of classes, so a Spring Boot app that loads 10,000+ classes has a metaspace of tens of megabytes before it has done any real work. If you have been doing Java long enough to have seen `OutOfMemoryError: PermGen space`: the metaspace is what replaced PermGen in Java 8.

### The thread stacks

Each thread gets its own stack, and every method call pushes a **frame** onto it: the parameters, the local variables, and where to return when the method is done. When the method returns, the frame is popped. Take the `add` method from the beginning of the article, called from `main`:

```java
public static void main(String[] args) {
    int result = add(2, 3);
}
```

While `add` is executing, the main thread's stack looks like this:

![The main thread's stack while add is running: the frame of add (a=2, b=3) sits on top of the frame of main, which is waiting for the result](/images/blog/jvm-aot-cache/jvm-thread-stack.webp)

Each box is one frame. `a` and `b` live in the frame of `add`, and the moment `add` returns, its frame is gone and the `5` lands in `result`, one frame below. This is the "stack" in stack trace and in `StackOverflowError`: a stack trace is literally this list printed top to bottom, and the error is what happens when a recursion pushes more frames than the stack can hold.

And where does the `5` come from? This is where the bytecode from the beginning of the article finally clicks. Inside every frame, next to the local variables, there is a second, tiny stack called the **operand stack**, and it is what the bytecode instructions actually work with. `iload_0` means "push local variable 0 (our `a`) onto it". `iadd` means "pop two values, add them, push the result". `ireturn` means "pop the result and hand it to the frame below". Here is `add(2, 3)` running, one instruction at a time:

![The operand stack inside the frame of add, step by step: iload_0 pushes 2, iload_1 pushes 3, iadd replaces them with 5, ireturn hands the 5 to main's frame](/images/blog/jvm-aot-cache/jvm-operand-stack.webp)

So `iload_0, iload_1, iadd, ireturn` reads as: push 2, push 3, replace them with their sum, give it to the caller. Every instruction takes its inputs from this little stack and leaves its output on it. That is why bytecode never mentions registers or memory addresses, and it is a big part of why the same `.class` file runs on any CPU.

One thing I had never made explicit for myself: local variables do not live in the heap. An `int x = 5` inside a method lives in the frame and disappears with it. Only what you `new` goes to the heap; the local variable just holds a reference pointing there.

### Native memory

Around all of that, there is the rest of the process. The JVM is itself a program written in C++, and everything it needs that is not your objects lives in plain native memory: the metaspace we just saw, the thread stacks, the garbage collector's own bookkeeping, and the **code cache**, where the JIT compiler stores the native code it produces (that is part 2 territory).

This has one practical consequence worth knowing: **a Java process uses much more memory than its heap**. When a pod with `-Xmx512m` gets OOM-killed by Kubernetes at 800 MB, nothing is necessarily leaking. The other 300 MB are the metaspace, the stacks, the code cache and the JVM itself.

## Why this matters more today

For a long time nobody cared about any of this. A Java application server started once and ran for months. A few seconds of startup did not matter.

That is not how we run Java anymore. On Kubernetes, pods get restarted on every deployment, every node maintenance, every scale-up. When the autoscaler adds a pod because the existing ones are overloaded, that pod needs 20 seconds of loading, linking and initializing before it helps anyone.

And here is what struck me once I understood the steps: it is **work that has the same result every time**. The same 10,000 classes are loaded, verified, prepared and resolved, in the same order, into the same metaspace. Then the process exits and all of it is thrown away. The next pod starts and does it all again.

If the result is the same every time, why not do it once, save it, and reuse it on the next start?

That question is exactly what Project Leyden is about, and it is where this series is going. But there is one more piece of the slowness story first: even after "Started", the app is slow, because all of its code is still running in the interpreter. **Part 2** is about warmup: the JIT compiler, C1 and C2, and why the first requests after a deploy are the slowest. The "shared objects file" from the log gets its answer in part 3.

## References

Some of what I watched and read while learning this:

- [How Java Works (Explained Simply)](https://www.youtube.com/watch?v=_A1oum1KJPs) — Cave of Programming
- [How the JVM Actually Works](https://www.youtube.com/watch?v=bF28LFPjFsI) — ByteByteGo
- [JVM Anatomy 101](https://www.youtube.com/watch?v=BeMi8K0AFAc) — JetBrains
- [A Deep Dive into JVM Start-Up](https://www.youtube.com/watch?v=ED1oc7gn5uY) — Java (official channel)
- [Class Loaders in Java](https://www.baeldung.com/java-classloaders) — Baeldung
