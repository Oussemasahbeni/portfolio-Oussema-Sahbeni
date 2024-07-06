import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  projects: any[] = [
    {
      name: 'Workout Buddy',
      type: 'home.projects.webApplication',
      description: 'home.projects.workoutBuddy.description',
      techs: ['mongodb', 'express', 'react', 'nodejs', 'tailwindcss'],
      github: 'https://github.com/Oussemasahbeni/Workout-Tracker-mern-project',
      report:
        'https://www.linkedin.com/in/oussema-sahbeni/overlay/projects/1867084073/multiple-media-viewer/?profileId=ACoAADaHwFsB8ZAUWeC4HIGti4flwdD8WRI-Jm4&treasuryMediaId=163555452816',
      image: [
        'assets/workout buddy/login.webp',
        'assets/workout buddy/signup.webp',
        'assets/workout buddy/homepage.webp',
        'assets/workout buddy/bmi.webp',
      ],
    },
    {
      name: 'Inspark forge',
      type: 'home.projects.webApplication',
      description: 'home.projects.insparkForge.description',
      techs: ['angularjs', 'spring', 'postgresql', 'tailwindcss'],
      report:
        'https://drive.google.com/file/d/11M4QYL9bKtrXlIcmcPHD2YGZmGSP6L_q/view?usp=drive_link',
      image: [
        'assets/insparkForge/company-profile.webp',
        'assets/insparkForge/delete-job-offer.webp',
        'assets/insparkForge/desiredSkills.webp',
        'assets/insparkForge/filter-job-offers.webp',
        'assets/insparkForge/job-offer-details for company.webp',
        'assets/insparkForge/list.webp',
        'assets/insparkForge/profile.webp',
        'assets/insparkForge/stat-company.webp',
        'assets/insparkForge/stat-talent.webp',
      ],
    },
    {
      name: 'Simon-Game      ',
      type: 'home.projects.webApplication',
      description: 'home.projects.simonGame.description',
      techs: ['javascript', 'css3', 'html5'],
      github: 'https://github.com/Oussemasahbeni/Simon-Game-Challenge',
      image: [
        'assets/simongame/end.webp',
        'assets/simongame/howto.webp',
        'assets/simongame/start.webp',
      ],
    },
    {
      name: 'Products Manager ',
      type: 'home.projects.webApplication',
      description: 'home.projects.productsManager.description',
      techs: ['angularjs', 'spring', 'mysql', 'tailwindcss'],
      github: 'https://github.com/Oussemasahbeni/restApiFront',
      image: [
        'assets/product manager/categories.webp',
        'assets/product manager/landing.webp',
        'assets/product manager/login.webp',
        'assets/product manager/manage.webp',
      ],
    },
  ];

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
