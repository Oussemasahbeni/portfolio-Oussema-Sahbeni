import { Component, Output } from '@angular/core';
import { gsap } from 'gsap';
@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.css'
})
export class PreloaderComponent {



  ngOnInit(): void {
    const tl: gsap.core.Timeline = gsap.timeline({ defaults: { ease: "power1.out" } });
    tl.to(".intro-text", { y: "0%", duration: 3 });
    tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.1 });
    tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");


  }
}


