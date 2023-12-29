import { Component } from '@angular/core';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  particlesJS: any;

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
