import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
    selector: 'app-footer',
    imports: [TranslocoModule],
    templateUrl: './footer.component.html'
})
export class FooterComponent {
  date = new Date().getFullYear();
}
