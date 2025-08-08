import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-experience',
  imports: [CommonModule, TranslocoModule],
  templateUrl: './experience.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  experience = signal([
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
      description: ['home.experience.cniDescription'],
      skills: ['angular', 'git', 'github', 'bootstrap', 'php', 'mySql'],
    },
    {
      title: 'home.experience.introductoryInternship',
      date: 'Jan 2022 - Feb 2022',
      company: 'UIB Tunis',
      description: ['home.experience.uibDescription'],
    },
  ]);
}
