import { Component } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {


  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo("#getintouch", {
      y: 100,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: "#getintouch",
        start: "top 75%",
        once: true
      },
    });

    gsap.fromTo("#text", {
      y: 100,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: "#text",
        start: "top 75%",
        once: true
      },
    });

  }
}
