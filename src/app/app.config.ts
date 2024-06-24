import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
  isDevMode,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHotToastConfig } from '@ngneat/hot-toast';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideHotToastConfig(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'fr'],
        defaultLang: localStorage.getItem('activeLang') ?? 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    {
      // Preload the default language before the app starts to prevent empty/jumping content
      provide: APP_INITIALIZER,
      useFactory: () => {
        const translocoService = inject(TranslocoService);
        const defaultLang = translocoService.getDefaultLang();
        translocoService.setActiveLang(defaultLang);
        return () => firstValueFrom(translocoService.load(defaultLang));
      },
      multi: true,
    },
  ],
};
