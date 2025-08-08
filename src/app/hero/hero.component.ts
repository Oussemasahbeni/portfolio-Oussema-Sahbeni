import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  signal,
} from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, TranslocoModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  particlesJS: any;

  showArrow = signal(true);

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.showArrow.set(window.scrollY === 0);
  }

  ngOnInit() {
    // @ts-ignore
    particlesJS.load('particles-js', '/particles.json', function () {});
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
