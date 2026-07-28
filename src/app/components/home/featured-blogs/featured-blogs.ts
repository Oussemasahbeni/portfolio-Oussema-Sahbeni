import { injectContentFiles } from '@analogjs/content';
import { Component } from '@angular/core';
import { ContentMetadata } from '../../../models/content-metadata';
import { FeaturedBlogPreview } from './featured-blog-preview';

@Component({
  selector: 'app-featured-blogs',
  imports: [FeaturedBlogPreview],
  template: ` <div class="space-y-4 text-center">
      <div class="mb-10">
        <div class="text-muted-foreground flex items-center gap-3 text-xs tracking-widest uppercase">
          <span>Featured Posts</span>
          <span class="bg-border h-px flex-1"></span>
        </div>
      </div>
    </div>

    <div class="mt-6 grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
      @for (article of articles; track article.slug) {
        <app-featured-blog-preview [article]="article.attributes" />
      }
    </div>`,
})
export class FeaturedBlogs {
  public articles = injectContentFiles<ContentMetadata>()
    .reverse()
    .filter((_, i) => i < 3);
}
