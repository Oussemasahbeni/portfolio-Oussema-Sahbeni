import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-contact',
  imports: [TranslocoModule],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private clipboard = inject(Clipboard);

  private toastService = inject(HotToastService);
  private _translocoService = inject(TranslocoService);

  copyText() {
    const text = this._translocoService.translate('contact.email.address');
    this.clipboard.copy(text);
    this.toastService.success(this._translocoService.translate('emailCopied'));
  }
}
