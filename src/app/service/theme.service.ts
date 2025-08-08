import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';

export type Theme = 'light' | 'dark' | 'system-light' | 'system-dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platform = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  readonly theme = signal<Theme>('system-dark');
  readonly isDark = computed(
    () => this.theme() === 'dark' || this.theme() === 'system-dark'
  );

  private mediaQuery?: MediaQueryList;

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    if (!isPlatformBrowser(this.platform)) {
      // For SSR, set a default that matches most common preference
      this.theme.set('system-dark');
      return;
    }

    try {
      const savedTheme = localStorage.getItem('ngp-theme') as Theme | null;

      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      let initialTheme: Theme;
      if (savedTheme) {
        initialTheme = savedTheme;
      } else {
        initialTheme = this.mediaQuery.matches ? 'system-dark' : 'system-light';
      }

      // Check if theme was already applied by inline script
      const documentHasDark =
        this.document.documentElement.classList.contains('dark');
      const shouldHaveDark =
        initialTheme === 'dark' || initialTheme === 'system-dark';

      // Only apply theme if there's a mismatch (prevents unnecessary DOM manipulation)
      if (documentHasDark !== shouldHaveDark) {
        this.applyThemeToDocument(initialTheme);
      }

      this.theme.set(initialTheme);

      // Listen for system preference changes
      this.mediaQuery.addEventListener('change', (e) => {
        const currentTheme = this.theme();
        // Only update if using system theme
        if (currentTheme === 'system-dark' || currentTheme === 'system-light') {
          this.setTheme(e.matches ? 'system-dark' : 'system-light');
        }
      });
    } catch (error) {
      console.warn('Theme initialization failed:', error);
      // Fallback to system preference
      const systemDark =
        window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
      this.setTheme(systemDark ? 'system-dark' : 'system-light');
    }
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);

    if (!isPlatformBrowser(this.platform)) {
      return;
    }

    if (theme === 'light' || theme === 'dark') {
      localStorage.setItem('ngp-theme', theme);
    } else {
      localStorage.removeItem('ngp-theme');
    }

    // Apply theme to document
    this.applyThemeToDocument(theme);
  }

  private applyThemeToDocument(theme: Theme): void {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }

    const isDarkTheme = theme === 'dark' || theme === 'system-dark';

    if (isDarkTheme) {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
  }

  toggleTheme(): void {
    const currentTheme = this.theme();

    switch (currentTheme) {
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
