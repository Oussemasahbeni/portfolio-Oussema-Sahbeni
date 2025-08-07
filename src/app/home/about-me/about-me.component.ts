import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { GithubApiService } from '../../service/github-api.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
@Component({
    selector: 'app-about-me',
    imports: [NgOptimizedImage, TranslocoModule],
    templateUrl: './about-me.component.html'
})
export class AboutMeComponent implements OnInit {
  private gitApi = inject(GithubApiService);
  private cd = inject(ChangeDetectorRef);

  publicRepos: number = 0;
  followers: number = 0;

  ngOnInit(): void {
    this.gitApi.getInfo().subscribe((data: any) => {
      this.followers = data.followers;

      this.publicRepos = data.public_repos;
      // Manually mark the component to be checked for changes
      this.cd.markForCheck();
    });
  }

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      '#title',
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '#title',
          start: 'top 75%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      '#grid',
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '#grid',
          start: 'top 75%',
          once: true,
        },
      }
    );
    gsap.fromTo(
      '#github',
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '#github',
          start: 'top 75%',
          once: true,
        },
      }
    );
  }
}
