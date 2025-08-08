import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  PLATFORM_ID,
  inject,
  model,
} from '@angular/core';
import { NgpButton } from 'ng-primitives/button';
import { LanguageComponent } from '../language/language.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-navbar',
  imports: [NgpButton, ThemeToggleComponent, LanguageComponent],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  /**
   * Determine the platform.
   */
  private readonly platform = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  /**
   * Whether the mobile menu is open.
   */
  readonly menuOpen = model(false);

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
