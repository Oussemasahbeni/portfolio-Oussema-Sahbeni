import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-experience',
  imports: [CommonModule, TranslocoModule],
  templateUrl: './experience.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  private translocoService = inject(TranslocoService);

  experience = signal([
    {
      title: 'Software Developer',
      date: 'Jan 2024 - Present',
      company: 'Inspark, Ariana, Tunisia',
      current: true,
      gotBulletPoints: true,
      description: [
        'Maintaining enterprise-grade Angular/Spring Boot apps with Keycloak SSO and modular component architecture',
        'Refactored core services into reusable modules using domain-driven design, increasing maintainability by 30%',
        'Integrated RabbitMQ and WebSocket for real-time messaging; deployed and monitored apps via AWS and Azure',
      ],
      skills: [
        'angular',
        'spring boot',
        'keycloak',
        'rabbitmq',
        'websockets',
        'aws',
        'azure',
        'ddd',
        'docker',
        'git',
        'postgresql',
      ],
    },
    {
      title: 'Internship Trainee',
      date: 'Jan 2023 - Feb 2023',
      company: "Centre National de l'Informatique, Tunisia",
      current: false,
      gotBulletPoints: true,
      description: [
        'Developed internal task management platform adopted by 3 departments; improved tracking efficiency by 50%',
        'Configured role-based access via Spring Security; optimized PostgreSQL queries to reduce API latency by 35%',
      ],
      skills: [
        'spring boot',
        'spring security',
        'postgresql',
        'angular',
        'mysql',
      ],
    },
  ]);

  constructor() {
    // Update experience data when language changes
    this.translocoService.langChanges$.subscribe(() => {
      this.updateExperienceData();
    });

    // Initial load
    this.updateExperienceData();
  }

  private updateExperienceData() {
    const experiencesData = this.translocoService.translate(
      'home.experience.experiences'
    );
    if (experiencesData && Array.isArray(experiencesData)) {
      this.experience.set(
        experiencesData.map((exp: any, index: number) => ({
          ...this.experience()[index],
          title: exp.title,
          date: exp.date,
          company: exp.company,
          description: exp.description,
        }))
      );
    }
  }
}
