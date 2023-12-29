import { Component, inject } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clipboard } from '@angular/cdk/clipboard';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private clipboard: Clipboard) { }


  private toastService = inject(HotToastService);

  showToast() {
    this.toastService.success('Text copied')
  }
  copyText() {
    const text = 'oussemasahbeni300@gmail.com';
    this.clipboard.copy(text);
    this.showToast()
  }

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
