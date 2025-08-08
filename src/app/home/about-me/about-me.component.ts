import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { GithubApiService } from '../../service/github-api.service';
@Component({
  selector: 'app-about-me',
  imports: [NgOptimizedImage, TranslocoModule],
  templateUrl: './about-me.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeComponent implements OnInit {
  private gitApi = inject(GithubApiService);

  publicRepos = signal(0);
  followers = signal(0);

  ngOnInit(): void {
    this.gitApi.getInfo().subscribe((data: any) => {
      this.followers.set(data.followers);

      this.publicRepos.set(data.public_repos);
    });
  }
}
