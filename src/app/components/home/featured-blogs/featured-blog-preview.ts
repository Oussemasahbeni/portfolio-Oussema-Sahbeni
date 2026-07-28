import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { ContentMetadata } from '../../../models/content-metadata';

@Component({
  selector: 'app-featured-blog-preview',
  standalone: true,
  imports: [RouterLink, HlmCardImports, HlmBadgeImports, DatePipe, NgIcon],
  host: {
    class: 'block h-full',
  },
  providers: [provideIcons({ lucideArrowRight })],
  template: `
    @if (article(); as article) {
      <a
        hlmCard
        class="flex h-full flex-col transition-all duration-300 hover:-translate-y-1"
        [routerLink]="['/blog', article.slug]"
      >
        <div hlmCardHeader>
          <div class="mb-2 flex items-start justify-between">
            <span class="text-muted-foreground text-xs">
              {{ article.date | date: 'mediumDate' }}
            </span>
            <ng-icon name="lucideArrowRight" />
          </div>

          <h3 hlmCardTitle class="text-xl leading-tight">
            {{ article.title }}
          </h3>
        </div>

        <div hlmCardContent class="flex-1">
          <p class="text-muted-foreground line-clamp-3 leading-relaxed">
            {{ article.description }}
          </p>
        </div>

        <div hlmCardFooter class="pt-2">
          <div class="flex flex-wrap gap-2">
            @for (tag of article.tags; track tag) {
              <span hlmBadge variant="outline" class="group-hover:bg-primary/5">
                {{ tag }}
              </span>
            }
          </div>
        </div>
      </a>
    }
  `,
})
export class FeaturedBlogPreview {
  public readonly article = input.required<ContentMetadata>();
}
