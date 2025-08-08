import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { NgpButton } from 'ng-primitives/button';
import { NgpMenu, NgpMenuItem, NgpMenuTrigger } from 'ng-primitives/menu';

@Component({
  selector: 'app-language',
  imports: [NgpButton, NgpMenu, NgpMenuTrigger, NgpMenuItem],
  templateUrl: './language.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './language.component.css',
})
export class LanguageComponent {
  public translocoService = inject(TranslocoService);

  getCurrentLanguage(): string {
    const lang = this.translocoService.getActiveLang();
    return lang === 'en' ? 'EN' : 'FR';
  }

  setLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
  }
}
