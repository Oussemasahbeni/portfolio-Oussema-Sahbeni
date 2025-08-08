import { NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { GithubApiService } from '../service/github-api.service';

@Component({
  selector: 'app-about-me',
  imports: [NgOptimizedImage, TranslocoModule],
  templateUrl: './about-me.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeComponent implements OnInit {
  private gitApi = inject(GithubApiService);
  private readonly platform = inject(PLATFORM_ID);

  publicRepos = signal(0);
  followers = signal(0);

  // Additional stats from CV
  yearsExperience = signal(2);
  usersServed = signal(1000);
  projectsCompleted = signal(4);
  languagesSpoken = signal(3);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.gitApi.getInfo().subscribe((data: any) => {
        this.followers.set(data.followers);
        this.publicRepos.set(data.public_repos);
      });
    }
  }
}
