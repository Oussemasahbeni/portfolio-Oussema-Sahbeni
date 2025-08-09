import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as AOS from 'aos';
import { ContactComponent } from './contact/contact.component';
import { HeroComponent } from './hero/hero.component';

import { AboutMeComponent } from './about-me/about-me.component';
import { ExperienceComponent } from './experience/experience.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ProjectsComponent } from './projects/projects.component';
import { BackToTopComponent } from "./layout/back-to-top/back-to-top.component";

declare const gtag: Function;
@Component({
  selector: 'app-root',
  imports: [
    FooterComponent,
    ContactComponent,
    NavbarComponent,
    HeroComponent,
    AboutMeComponent,
    ExperienceComponent,
    ProjectsComponent,
    BackToTopComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private router = inject(Router);
  private readonly platform = inject(PLATFORM_ID);

  title = signal('portfolio');

  constructor() {
    afterNextRender(() => {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic',
      });
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (isPlatformBrowser(this.platform) && typeof gtag !== 'undefined') {
          gtag('config', 'G-42206BJGCL', {
            page_path: event.urlAfterRedirects,
          });
        }
      }
    });
  }
}
