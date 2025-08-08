import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { NgpButton } from 'ng-primitives/button';

@Component({
  selector: 'app-hero',
  imports: [TranslocoModule, NgpButton],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}
