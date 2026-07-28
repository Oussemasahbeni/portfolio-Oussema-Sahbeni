import { ViewportScroller } from '@angular/common';
import { Component, DOCUMENT, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { play } from 'cuelume';

@Component({
  selector: 'app-back-to-top',
  imports: [HlmButtonImports, NgIcon],
  providers: [provideIcons({ lucideArrowUp })],
  template: `@if (isVisible()) {
    <button
      type="button"
      hlmBtn
      class="fixed right-6 bottom-6 z-50"
      title="Back to top"
      size="icon"
      aria-label="Scroll back to top"
      (click)="scrollToTop()"
    >
      <ng-icon name="lucideArrowUp" />
    </button>
  } `,
  encapsulation: ViewEncapsulation.None,
  host: {
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class BackToTop {
  // -----------------------------------------------------------------------------------------------------
  // @ Dependencies
  // -----------------------------------------------------------------------------------------------------
  private readonly document = inject(DOCUMENT);
  private readonly viewportScroller = inject(ViewportScroller);

  // -----------------------------------------------------------------------------------------------------
  // @ Inputs
  // -----------------------------------------------------------------------------------------------------
  public readonly showAfter = input(300); // Pixels scrolled before showing
  public readonly scrollToPosition = input(0); // Position to scroll to
  public readonly animationDuration = input(500); // Animation duration in ms

  // -----------------------------------------------------------------------------------------------------
  // @ Signals and State
  // -----------------------------------------------------------------------------------------------------
  protected readonly isVisible = signal(false);

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  onWindowScroll(): void {
    const scrollPosition = this.document.documentElement.scrollTop || this.document.body.scrollTop;
    this.isVisible.set(scrollPosition > this.showAfter());
  }

  scrollToTop(): void {
    play('sparkle');
    this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });
  }
}
