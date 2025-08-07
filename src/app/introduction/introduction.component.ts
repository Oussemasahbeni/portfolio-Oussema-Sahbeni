import { NgOptimizedImage } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
@Component({
    selector: 'app-about',
    imports: [NgOptimizedImage, TranslocoModule],
    templateUrl: './introduction.component.html',
    styleUrl: './introduction.component.css'
})
export class IntroductionComponent {
  particlesJS: any;

  showArrow = true;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.showArrow = window.scrollY === 0;
  }

  ngOnInit() {
    // @ts-ignore
    particlesJS.load('particles-js', 'assets/particles.json', function () {});
  }

  scrollTo(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      const yCoordinate =
        element.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top: yCoordinate, behavior: 'smooth' });
    }
  }
}
