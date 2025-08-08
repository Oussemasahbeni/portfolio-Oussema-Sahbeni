import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { radixMoon, radixSun } from '@ng-icons/radix-icons';
import { NgpButton } from 'ng-primitives/button';

@Component({
  selector: 'app-theme-toggler',
  templateUrl: './theme-toggle.component.html',
  providers: [provideIcons({ radixSun, radixMoon })],
  imports: [NgIcon],
  hostDirectives: [NgpButton],
  host: {
    '[attr.data-theme]': 'theme()',
  },
})
export class ThemeToggleComponent {
  private readonly platform = inject(PLATFORM_ID);
  protected readonly theme = signal<Theme>('system-light');

  protected readonly isDark = computed(
    () => this.theme() === 'dark' || this.theme() === 'system-dark'
  );

  constructor() {
    if (isPlatformBrowser(this.platform)) {
      const theme = localStorage.getItem('ngp-theme') as Theme | null;
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      // Set the theme based on the user's preference
      this.setTheme(
        theme ?? (mediaQuery.matches ? 'system-dark' : 'system-light')
      );

      // Listen for changes in the user's preference
      mediaQuery.addEventListener('change', ({ matches }) => {
        this.setTheme(matches ? 'system-dark' : 'system-light');
      });
    }
  }

  setTheme(theme: Theme) {
    this.theme.set(theme);

    if (isPlatformBrowser(this.platform)) {
      if (theme === 'light' || theme === 'dark') {
        localStorage.setItem('ngp-theme', theme);
      }

      switch (theme) {
        case 'light':
        case 'system-light':
          document.documentElement.classList.remove('dark');
          break;
        case 'dark':
        case 'system-dark':
          document.documentElement.classList.add('dark');
          break;
      }
    }
  }

  protected toggleTheme(): void {
    switch (this.theme()) {
      case 'light':
      case 'system-light':
        this.setTheme('dark');
        break;
      case 'dark':
      case 'system-dark':
        this.setTheme('light');
        break;
    }
  }
}

type Theme = 'light' | 'dark' | 'system-light' | 'system-dark';
