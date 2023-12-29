import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { ContactComponent } from './home/contact/contact.component';
import { ProjectsComponent } from './home/projects/projects.component';
declare const gtag: Function;
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, HomeComponent, PreloaderComponent, ContactComponent, ProjectsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-42206BJGCL', { 'page_path': event.urlAfterRedirects });
      }
    })
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          // @ts-ignore
          HSStaticMethods.autoInit();
        }, 100);
      }
    });
  }
}
