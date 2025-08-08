import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-projects',
  imports: [TranslocoModule],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  responsiveOptions = signal<any[]>([
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ]);
  projects = signal([
    {
      name: 'Workout Buddy',
      type: 'home.projects.webApplication',
      description: 'home.projects.workoutBuddy.description',
      techs: ['mongodb', 'express', 'react', 'nodejs', 'tailwindcss'],
      github: 'https://github.com/Oussemasahbeni/Workout-Tracker-mern-project',
      report:
        'https://www.linkedin.com/in/oussema-sahbeni/overlay/projects/1867084073/multiple-media-viewer/?profileId=ACoAADaHwFsB8ZAUWeC4HIGti4flwdD8WRI-Jm4&treasuryMediaId=163555452816',
      image: '/workout buddy/homepage.webp',
    },
    {
      name: 'Inspark forge',
      type: 'home.projects.webApplication',
      description: 'home.projects.insparkForge.description',
      techs: ['angularjs', 'spring', 'postgresql', 'tailwindcss'],
      report:
        'https://drive.google.com/file/d/11M4QYL9bKtrXlIcmcPHD2YGZmGSP6L_q/view?usp=drive_link',
      image: '/insparkForge/filter-job-offers.webp',
    },
    {
      name: 'Simon-Game      ',
      type: 'home.projects.webApplication',
      description: 'home.projects.simonGame.description',
      techs: ['javascript', 'css3', 'html5'],
      github: 'https://github.com/Oussemasahbeni/Simon-Game-Challenge',
      image: '/simongame/start.webp',
    },
    {
      name: 'Products Manager ',
      type: 'home.projects.webApplication',
      description: 'home.projects.productsManager.description',
      techs: ['angularjs', 'spring', 'mysql', 'tailwindcss'],
      github: 'https://github.com/Oussemasahbeni/restApiFront',
      image: '/product manager/landing.webp',
    },
  ]);
}
