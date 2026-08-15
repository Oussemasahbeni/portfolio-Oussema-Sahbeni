import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideMail } from '@ng-icons/lucide';
import { radixGithubLogo, radixLinkedinLogo } from '@ng-icons/radix-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { GITHUB_LINK, LINKEDIN_LINK } from '../../../core/constants';

interface SocialLink {
  label: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-hero',
  imports: [HlmButtonImports, NgIcon],
  providers: [
    provideIcons({
      lucideArrowRight,
      lucideMail,
      radixGithubLogo,
      radixLinkedinLogo,
    }),
  ],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  host: {
    class: 'block relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8',
  },
})
export class Hero {
  protected readonly socials: SocialLink[] = [
    { label: 'GitHub', icon: 'radixGithubLogo', link: GITHUB_LINK },
    { label: 'LinkedIn', icon: 'radixLinkedinLogo', link: LINKEDIN_LINK },
  ];

  // Rotated purely in CSS (see hero.css). Keep the count in sync with the
  // keyframe steps there if you add or remove a role.
  protected readonly roles = [
    'Software Engineer',
    'Open-source Contributor',
    'Full-stack Developer',
    'Football Enthusiast',
    'Gym Rat',
  ];
}
