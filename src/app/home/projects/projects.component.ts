import { NgOptimizedImage, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  responsiveOptions: any[] | undefined;
  projects: any[] = [
    {
      name: 'Workout Buddy',
      type: 'home.projects.webApplication',
      description: 'home.projects.workoutBuddy.description',
      techs: ['mongodb', 'express', 'react', 'nodejs', 'tailwindcss'],
      github: 'https://github.com/Oussemasahbeni/Workout-Tracker-mern-project',
      report:
        'https://www.linkedin.com/in/oussema-sahbeni/overlay/projects/1867084073/multiple-media-viewer/?profileId=ACoAADaHwFsB8ZAUWeC4HIGti4flwdD8WRI-Jm4&treasuryMediaId=163555452816',
      image: 'assets/workout buddy/homepage.webp',
    },
    {
      name: 'Inspark forge',
      type: 'home.projects.webApplication',
      description: 'home.projects.insparkForge.description',
      techs: ['angularjs', 'spring', 'postgresql', 'tailwindcss'],
      report:
        'https://drive.google.com/file/d/11M4QYL9bKtrXlIcmcPHD2YGZmGSP6L_q/view?usp=drive_link',
      image: 'assets/insparkForge/filter-job-offers.webp',
    },
    {
      name: 'Simon-Game      ',
      type: 'home.projects.webApplication',
      description: 'home.projects.simonGame.description',
      techs: ['javascript', 'css3', 'html5'],
      github: 'https://github.com/Oussemasahbeni/Simon-Game-Challenge',
      image: 'assets/simongame/start.webp',
    },
    {
      name: 'Products Manager ',
      type: 'home.projects.webApplication',
      description: 'home.projects.productsManager.description',
      techs: ['angularjs', 'spring', 'mysql', 'tailwindcss'],
      github: 'https://github.com/Oussemasahbeni/restApiFront',
      image: 'assets/product manager/landing.webp',
    },
  ];

  ngOnInit() {
    this.responsiveOptions = [
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
    ];
  }

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      '#card',
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '#card',
          start: 'top 75%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      '#projects',
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 75%',
          once: true,
        },
      }
    );
  }
}
