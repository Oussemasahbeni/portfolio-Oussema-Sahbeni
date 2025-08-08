import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  HostListener,
  inject,
  input,
  PLATFORM_ID,
} from '@angular/core';

@Directive({
  selector: '[appTooltipTrigger]',
})
export class TooltipTrigger {
  private readonly platform = inject(PLATFORM_ID);

  /** Define the content of the tooltip */
  readonly content = input.required<string>({
    alias: 'appTooltipTrigger',
  });

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    // Simple tooltip logic for browser only
    this.showTooltip(event);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    this.hideTooltip();
  }

  private showTooltip(event: MouseEvent) {
    // Create a simple tooltip element
    const tooltip = document.createElement('div');
    tooltip.textContent = this.content();
    tooltip.className = 'simple-tooltip';
    tooltip.style.cssText = `
      position: absolute;
      top: ${event.pageY - 30}px;
      left: ${event.pageX + 10}px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      z-index: 1000;
      pointer-events: none;
    `;
    tooltip.id = 'simple-tooltip';
    document.body.appendChild(tooltip);
  }

  private hideTooltip() {
    const tooltip = document.getElementById('simple-tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }
}
