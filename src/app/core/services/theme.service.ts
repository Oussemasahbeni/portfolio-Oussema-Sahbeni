import { computed, DOCUMENT, effect, inject, Service, signal } from '@angular/core';
import { LOCAL_STORAGE, WINDOW } from './tokens';

export const THEMES = ['light', 'dark', 'system'] as const;
export type Theme = (typeof THEMES)[number];

const STORAGE_KEY = 'theme-preference';

@Service()
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly _localStorage = inject(LOCAL_STORAGE);
  private readonly _mediaQuery = inject(WINDOW)?.matchMedia('(prefers-color-scheme: dark)');
  private readonly _systemPrefersDark = signal(this._mediaQuery?.matches ?? false);

  private readonly _selectedTheme = signal<Theme>('system');
  public readonly theme = this._selectedTheme.asReadonly();

  public readonly resolvedTheme = computed(() => {
    if (this._selectedTheme() === 'system') {
      return this._systemPrefersDark() ? 'dark' : 'light';
    }
    return this._selectedTheme();
  });

  constructor() {
    const savedTheme = this._localStorage?.getItem(STORAGE_KEY) as Theme;

    this._selectedTheme.set(THEMES.includes(savedTheme) ? savedTheme : 'system');
    this._mediaQuery?.addEventListener('change', (e) => {
      this._systemPrefersDark.set(e.matches);
    });

    effect(() => {
      this.document.documentElement.classList.toggle('dark', this.resolvedTheme() === 'dark');
    });
  }

  /**
   * Toggles the theme. `origin` is the point the circular reveal expands from
   * (the cursor for clicks, the button's center for keyboard). Falls back to
   * the viewport center when no origin is given.
   */
  toggleTheme(origin: { x: number; y: number }): void {
    // Fallback when View Transitions API is unavailable: flip immediately.
    if (!this.document.startViewTransition) {
      this.executeToggle();
      return;
    }
    this.animateThemeSwitch(origin.x, origin.y);
  }

  /**
   * Logic to flip the theme state.
   * This is separated so it can be called inside the View Transition callback.
   */
  private executeToggle(): void {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this._selectedTheme.set(newTheme);
    this._localStorage?.setItem(STORAGE_KEY, newTheme);
  }

  /**
   * Handles the "Circular Reveal" animation using View Transitions and WAAPI.
   */
  private animateThemeSwitch(x: number, y: number) {
    // Calculate distance to the farthest corner of the screen to ensure
    // the circle covers the entire viewport.
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    this.document.documentElement.classList.add('theme-transition');

    // Start the View Transition.
    const transition = document.startViewTransition(() => {
      this.executeToggle();
    });

    // Once the pseudo-elements are ready, animate the "New" view
    // expanding from a small dot to the full screen.
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
        },
        {
          duration: 500,
          easing: 'ease-in',
          // We animate the ::view-transition-new pseudo-element
          // because we want the NEW theme to reveal itself on top.
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });

    // CLEANUP: Remove the marker class when animation finishes.
    // This returns the View Transition behavior to normal (for Router).
    transition.finished.finally(() => {
      this.document.documentElement.classList.remove('theme-transition');
    });
  }
}
