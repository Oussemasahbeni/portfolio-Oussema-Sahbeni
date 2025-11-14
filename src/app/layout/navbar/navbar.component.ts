import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  inject,
  model,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { NgpButton } from 'ng-primitives/button';
import { LanguageComponent } from '../language/language.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-navbar',
  imports: [
    NgpButton,
    ThemeToggleComponent,
    LanguageComponent,
    TranslocoDirective,
  ],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnDestroy {
  /**
   * Determine the platform.
   */
  private readonly platform = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  /**
   * Whether the mobile menu is open.
   */
  readonly menuOpen = model(false);

  private clickListener?: (event: Event) => void;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      // Close mobile menu when clicking outside
      this.clickListener = (event: Event) => {
        const target = event.target as HTMLElement;
        const navbar = this.document.querySelector('app-navbar');

        if (this.menuOpen() && navbar && !navbar.contains(target)) {
          this.menuOpen.set(false);
        }
      };

      this.document.addEventListener('click', this.clickListener);
    }
  }

  ngOnDestroy(): void {
    if (this.clickListener) {
      this.document.removeEventListener('click', this.clickListener);
    }
  }

  toggle(): void {
    this.menuOpen.update((open) => !open);
  }

  scrollTo(id: string): void {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }

    const element = this.document.getElementById(id);
    if (element) {
      const yCoordinate =
        element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: yCoordinate, behavior: 'smooth' });
    }
  }
}
