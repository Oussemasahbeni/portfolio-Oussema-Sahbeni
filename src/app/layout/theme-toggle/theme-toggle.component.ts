import { Component, computed, inject } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { radixMoon, radixSun } from '@ng-icons/radix-icons';
import { NgpButton } from 'ng-primitives/button';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-theme-toggler',
  templateUrl: './theme-toggle.component.html',
  providers: [provideIcons({ radixSun, radixMoon })],
  imports: [NgIcon],
  hostDirectives: [NgpButton],
  host: {
    '[attr.data-theme]': 'themeService.theme()',
  },
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);

  // Create a computed signal for template usage
  protected readonly isDark = computed(() => this.themeService.isDark());

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
