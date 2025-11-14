import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-projects',
  imports: [TranslocoModule],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  private translocoService = inject(TranslocoService);

  projects = signal([
    {
      name: 'Sabeel Platform',
      type: 'Reintegration Platform',
      description:
        'Reintegration platform for ex-prisoners, offering tailored resources and opportunities. Directed end-to-end development assisting 500+ ex-prisoners, improved job placement and training access by 40%.',
      techs: ['angular', 'spring', 'postgresql', 'keycloak', 'docker', 'aws'],
      website: null,
      highlights: [
        'Assisted 500+ ex-prisoners with reintegration',
        'Improved job placement access by 40%',
        'End-to-end platform development',
        'Tailored resources and opportunities',
      ],
    },
    {
      name: 'One Saha Platform',
      type: 'Public Health Platform',
      description:
        'Community-driven platform for public health data aggregation and engagement. Constructed backend with 10+ modular services, automated aggregation of 150+ monthly news entries using ML classification.',
      techs: ['spring', 'postgresql', 'python', 'docker', 'prometheus'],
      website: 'https://onesaha.org/home',
      highlights: [
        '10+  modular services using domain-oriented design principles',
        'Automated ML-powered news classification',
        '150+ monthly entries processed',
        'Community-driven health engagement',
      ],
    },
    {
      name: 'Inspark Forge',
      type: 'AI-Powered Talent Matching',
      description:
        'AI-powered talent-matching platform for Tunisia. Designed scalable microservices architecture using Spring Boot and DDD, integrated OpenAI GPT-4o for intelligent skill evaluation.',
      techs: ['angular', 'spring', 'postgresql', 'openai', 'rabbitmq'],
      website: 'https://talent.inspark.tn/',
      highlights: [
        'OpenAI GPT-4o integration for skill evaluation',
        'Scalable microservices with DDD',
        'AI-powered talent matching',
        'Tailored for Tunisian job market',
      ],
    },
    {
      name: 'Ministry of Agriculture Official Website',
      type: 'Government Web Platform',
      description:
        'Official website of the Ministry of Agriculture of Tunisia. Provides comprehensive access to information, services, and news related to agriculture, fisheries, and rural development. Features secure authentication, advanced search capabilities, and rate limiting for optimal performance.',
      techs: [
        'angular',
        'spring',
        'tailwindcss',
        'keycloak',
        'elasticsearch',
        'resilience4j',
      ],
      website: 'https://staging-agri.agrinet.tn/home',
      highlights: [
        'Government-grade security implementation',
        'Elasticsearch-powered advanced search',
        'Rate limiting with Resilience4j',
        'Keycloak identity management',
      ],
    },
    {
      name: 'Konnect Spring Boot Starter',
      type: 'Open Source Library',
      description:
        'A robust Spring Boot starter for integrating with the Konnect Payment Gateway. Handles low-level HTTP communication, authentication, and error handling with production-grade features like auto-configuration, webhook handling, and resilience patterns.',
      techs: ['spring', 'maven', 'resilience4j', 'junit', 'java'],
      website: 'https://github.com/Oussemasahbeni/konnect-spring-boot-starter',
      highlights: [
        'Auto-configuration for Spring Boot',
        'Secure webhook handling',
        'Payment verification utilities',
        'Built-in rate limiting & retries',
        'Published to Maven Central',
      ],
    },
    {
      name: 'Keycloak Custom Theme with Keycloakify',
      type: 'Authentication UI Customization',
      description:
        'Custom Keycloak login theme built with Keycloakify and Tailwind CSS. Modernizes the default Keycloak interface with responsive design, dark mode support, and customized email templates for enhanced user experience.',
      techs: ['react', 'typescript', 'tailwindcss', 'keycloakify', 'keycloak'],
      website:
        'https://github.com/Oussemasahbeni/keycloak-react-custom-theme-keycloakify',
      highlights: [
        'Modern React-based login interface',
        'Responsive design with Tailwind CSS',
        'Dark mode support',
        'Custom email templates',
        'Keycloakify integration',
      ],
    },
  ]);

  constructor() {
    // Update projects data when language changes
    this.translocoService.langChanges$.subscribe(() => {
      this.updateProjectsData();
    });

    // Initial load
    this.updateProjectsData();
  }

  private updateProjectsData() {
    const projectsData = this.translocoService.translate(
      'home.projects.projectsList'
    );
    if (projectsData && Array.isArray(projectsData)) {
      const currentProjects = this.projects();
      this.projects.set(
        projectsData.map((project: any, index: number) => {
          const originalProject = currentProjects[index];
          return {
            ...originalProject,
            name: project.name,
            type: project.type,
            description: project.description,
            highlights: project.highlights,
            // Explicitly preserve important properties
            website: originalProject.website,
            techs: originalProject.techs,
          };
        })
      );
    }
  }
}
