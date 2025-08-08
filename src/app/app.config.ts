import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { firstValueFrom } from 'rxjs';
import { TranslocoHttpLoader } from './transloco-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZonelessChangeDetection(),
    provideHotToastConfig(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'fr'],
        defaultLang: localStorage.getItem('activeLang') ?? 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideAppInitializer(() => {
      const translocoService = inject(TranslocoService);
      const defaultLang = translocoService.getDefaultLang();
      translocoService.setActiveLang(defaultLang);
      return firstValueFrom(translocoService.load(defaultLang));
    }),
  ],
};
