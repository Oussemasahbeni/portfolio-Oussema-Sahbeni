import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';

@Component({
  selector: 'app-experience',
  imports: [HlmBadgeImports, NgOptimizedImage],
  templateUrl: './experience.html',
})
export class Experience {
  protected readonly experience = signal([
    {
      title: 'Software Engineer',
      date: 'Jan 2026 - Present',
      company: 'Oddo BHF, Tunis, Tunisia',
      logo: '/companies/oddobhf.png',
      current: true,
      description: [
        'Architected the entire frontend from the ground up with Angular, delivering a scalable and maintainable UI foundation',
        'Designed and implemented a micro-frontend architecture, enabling independent team delivery and modular deployments',
        'Contributed a range of new features while continuously improving application performance across the stack',
        'Optimized backend startup times using Project Leyden(Aot Cache), significantly reducing startup latency up to 53%',
      ],
      skills: [
        'Angular',
        'Micro-frontends',
        'Spring Boot',
        'Keycloak',
        'Kafka',
        'Camunda',
        'Openshift',
        'Azure DevOps',
        'DDD',
        'Kubernetes',
        'Microservices',
      ],
    },
    {
      title: 'Software Engineer',
      date: 'Jan 2024 - Dec 2025',
      company: 'Inspark, Ariana, Tunisia',
      logo: '/companies/inspark.png',
      current: false,
      description: [
        'Maintaining enterprise-grade Angular/Spring Boot apps with Keycloak SSO and modular component architecture',
        'Refactored core services into reusable modules using domain-driven design, increasing maintainability by 30%',
        'Integrated RabbitMQ and WebSocket for real-time messaging; deployed and monitored apps via AWS and Azure',
      ],
      skills: [
        'Angular',
        'Spring Boot',
        'Keycloak',
        'RabbitMQ',
        'WebSockets',
        'AWS',
        'Azure',
        'DDD',
        'Docker',
        'Git',
        'PostgreSQL',
      ],
    },
  ]);
}
