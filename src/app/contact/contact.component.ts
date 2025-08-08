import { Clipboard } from '@angular/cdk/clipboard';
import { Component, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { HotToastService } from '@ngxpert/hot-toast';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-contact',
  imports: [TranslocoModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  private clipboard = inject(Clipboard);

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
