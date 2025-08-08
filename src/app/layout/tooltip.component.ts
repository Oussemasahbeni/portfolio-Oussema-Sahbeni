import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { injectTooltipContext, NgpTooltip } from 'ng-primitives/tooltip';

@Component({
  selector: 'app-tooltip',
  hostDirectives: [NgpTooltip],
  template: ` {{ content() }} `,
  styles: `
    :host {
      position: absolute;
      max-width: 16rem;
      border-radius: var(--radius-sm);
      background-color: rgb(var(--color-popover));
      padding: 0.5rem 0.75rem;
      border: 1px solid rgb(var(--color-border));
      font-size: 0.75rem;
      font-weight: 500;
      color: rgb(var(--color-popover-foreground));
      transform-origin: var(--ngp-tooltip-transform-origin, center);
      box-shadow: var(--shadow-md);
      z-index: 1000;
    }

    :host[data-enter] {
      animation: tooltip-show 50ms ease-in-out;
    }

    :host[data-exit] {
      animation: tooltip-hide 50ms ease-in-out;
    }

    @keyframes tooltip-show {
      0% {
        opacity: 0;
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes tooltip-hide {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(0.9);
      }
    }
  `,
})
export class TooltipComponent {
  private readonly platform = inject(PLATFORM_ID);

  /** Access the tooltip context where the content is stored. */
  protected readonly content = injectTooltipContext<string>();

  constructor() {
    // Ensure tooltip context is only accessed in browser
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
  }
}
