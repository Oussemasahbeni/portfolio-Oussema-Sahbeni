import { NgOptimizedImage } from '@angular/common';
import { Component, HostListener } from '@angular/core';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  particlesJS: any;

  showArrow = true;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.showArrow = window.pageYOffset === 0;
  }

  ngOnInit() {
    // @ts-ignore
    particlesJS.load('particles-js', 'assets/particles.json', function () {
      // console.log('callback - particles.js config loaded');
    });
  }

  scrollTo(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset - 75;
      window.scrollTo({ top: yCoordinate, behavior: 'smooth' });
    }
  }


}


