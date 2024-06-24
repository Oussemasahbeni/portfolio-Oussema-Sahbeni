import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent {
  experience: any[] = [];

  ngOnInit(): void {
    this.experience = [
      {
        title: 'home.experience.endOfStudiesInternship',
        date: 'Jan 2024 - Juin 2024',
        company: 'Inspark',
        current: false,
        gotBulletPoints: true,
        description: [
          'home.experience.insparkForgeDescription.line1',
          'home.experience.insparkForgeDescription.line2',
          'home.experience.insparkForgeDescription.line3',
          'home.experience.insparkForgeDescription.line4',
          'home.experience.insparkForgeDescription.line5',
          'home.experience.insparkForgeDescription.line6',
          'home.experience.insparkForgeDescription.line7',
          'home.experience.insparkForgeDescription.line8',
          'home.experience.insparkForgeDescription.line9',
          'home.experience.insparkForgeDescription.line10',
        ],
        skills: [
          'angular',
          'git',
          'github',
          'tailwind css',
          'spring boot',
          'postgresql',
          'keycloak',
          'rabbitmq',
          'websockets',
          'nx',
          'azure',
          'ddd',
          'openai',
          'latex',
          'nlp',
          'generative ai',
          'micro services',
          'scrum',
          'flyway',
          'docker',
          'swagger',
          'bitbucket',
        ],
      },
      {
        title: 'home.experience.professionalInternship',
        date: 'Jan 2023 - Feb 2023',
        company: 'CNI Tunis',
        description: 'Developed a full-stack web app to streamline project management tasks',
        skills: ['angular', 'git', 'github', 'bootstrap', 'php', 'mySql'],
      },
      {
        title: 'home.experience.introductoryInternship',
        date: 'Jan 2022 - Feb 2022',
        company: 'UIB Tunis',
        description: 'Extensively observed financial transactions and account management.',
      },
    ];
  }

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      '#experience-title',
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '#experience-title',
          start: 'top 75%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      '#icon',
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '#icon',
          start: 'top 75%',
          once: true,
        },
      }
    );
  }
}