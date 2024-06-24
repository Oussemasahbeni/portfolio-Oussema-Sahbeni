import { Component, OnInit } from '@angular/core';
import {
  AvailableLangs,
  TranslocoModule,
  TranslocoService,
} from '@jsverse/transloco';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { CommonModule, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UpperCasePipe, TranslocoModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  availableLangs = ['en', 'fr'];
  activeLang = localStorage.getItem('activeLang') ?? 'en';

  flagCodes: any;

  langControl: UntypedFormControl = new UntypedFormControl(this.activeLang);

  constructor(private _translocoService: TranslocoService) {}
  ngOnInit(): void {
    this.langControl.valueChanges.subscribe((lang: string) => {
      this.changeLang(lang);
    });

    // Set the country iso codes for languages for flags
    this.flagCodes = {
      en: 'gb',
      fr: 'fr',
    };
  }

  changeLang(lang: string): void {
    localStorage.setItem('activeLang', lang);
    this._translocoService.setActiveLang(lang);
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
