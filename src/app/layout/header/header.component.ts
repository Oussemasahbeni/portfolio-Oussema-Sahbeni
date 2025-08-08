import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-header',
  imports: [UpperCasePipe, TranslocoModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private _translocoService = inject(TranslocoService);

  availableLangs = signal(['en', 'fr']);
  activeLang = signal(localStorage.getItem('activeLang') ?? 'en');
  isDarkMode = signal<boolean>(localStorage.getItem('theme') === 'dark');

  flagCodes = signal<any>({});

  langControl: UntypedFormControl = new UntypedFormControl(this.activeLang());

  constructor() {
    // No need to initialize signals in constructor anymore
  }
  ngOnInit(): void {
    this.langControl.valueChanges.subscribe((lang: string) => {
      this.changeLang(lang);
    });

    this.updateThemePreference();

    // Set the country iso codes for languages for flags
    this.flagCodes.set({
      en: 'gb',
      fr: 'fr',
    });
  }

  changeLang(lang: string): void {
    localStorage.setItem('activeLang', lang);
    this._translocoService.setActiveLang(lang);
    this.activeLang.set(lang);
  }

  private updateThemePreference(): void {
    const html = document.documentElement; // Target the <html> element

    // Assume dark mode is the default
    const isDarkOrAuto =
      localStorage.getItem('theme') !== 'light' &&
      (localStorage.getItem('theme') === 'dark' ||
        localStorage.getItem('theme') === 'auto' ||
        localStorage.getItem('theme') === null ||
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    const isLightOrAuto =
      localStorage.getItem('theme') === 'light' ||
      (localStorage.getItem('theme') === 'auto' &&
        window.matchMedia('(prefers-color-scheme: light)').matches);

    // Remove existing class if any
    html.classList.remove('light', 'dark');

    // Apply new class based on preference
    if (isDarkOrAuto) {
      html.classList.add('dark');
    } else if (isLightOrAuto) {
      html.classList.add('light');
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode.set(!this.isDarkMode());
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
    this.updateThemePreference();
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
