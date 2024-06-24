import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgOptimizedImage, TranslocoModule],
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
        'assets/workout buddy/login.jpg',
        'assets/workout buddy/signup.jpg',
        'assets/workout buddy/homepage.jpg',
        'assets/workout buddy/bmi.jpg',
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
        'assets/insparkForge/company-profile.png',
        'assets/insparkForge/delete-job-offer.png',
        'assets/insparkForge/desiredSkills.png',
        'assets/insparkForge/filter-job-offers.png',
        'assets/insparkForge/job-offer-details for company.png',
        'assets/insparkForge/list.png',
        'assets/insparkForge/profile.png',
        'assets/insparkForge/stat-company.png',
        'assets/insparkForge/stat-talent.png',
      ],
    },
    {
      name: 'Simon-Game      ',
      type: 'home.projects.webApplication',
      description: 'home.projects.simonGame.description',
      techs: ['javascript', 'css3', 'html5'],
      github: 'https://github.com/Oussemasahbeni/Simon-Game-Challenge',
      image: [
        'assets/simongame/end.jpg',
        'assets/simongame/howto.jpg',
        'assets/simongame/start.jpg',
      ],
    },
    {
      name: 'Products Manager ',
      type: 'home.projects.webApplication',
      description: 'home.projects.productsManager.description',
      techs: ['angularjs', 'spring', 'mysql', 'tailwindcss'],
      github: 'https://github.com/Oussemasahbeni/restApiFront',
      image: [
        'assets/product manager/categories.jpg',
        'assets/product manager/landing.jpg',
        'assets/product manager/login.jpg',
        'assets/product manager/manage.jpg',
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
