import { Component, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clipboard } from '@angular/cdk/clipboard';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
    selector: 'app-contact',
    imports: [TranslocoModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(private clipboard: Clipboard) {}

  private toastService = inject(HotToastService);
  private _translocoService = inject(TranslocoService);

  showToast() {
    this.toastService.success(this._translocoService.translate('emailCopied'));
  }
  copyText() {
    const text = 'oussemasahbeni300@gmail.com';
    this.clipboard.copy(text);
    this.showToast();
  }

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      '#getintouch',
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '#getintouch',
          start: 'top 75%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      '#text',
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '#text',
          start: 'top 75%',
          once: true,
        },
      }
    );
  }
}
