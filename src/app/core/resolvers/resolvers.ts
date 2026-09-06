import { injectContentFiles } from '@analogjs/content';
import { MetaTag } from '@analogjs/router';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ContentMetadata } from '../../models/content-metadata';

const BASE_URL = 'https://oussemasahbeni.com';
const DEFAULT_IMAGE = '/default-social.webp';

function toAbsoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

// LinkedIn's crawler only supports JPG/PNG/GIF for og:image, so social tags
// point at a .jpg copy that must exist next to every local .webp cover.
function toSocialImage(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return path.replace(/\.webp$/, '.jpg');
}

function injectActiveContentMetadata(
  route: ActivatedRouteSnapshot
): ContentMetadata {
  const file = injectContentFiles<ContentMetadata>().find((contentFile) => {
    return (
      contentFile.filename === `/src/content/${route.params['slug']}.md` ||
      contentFile.slug === route.params['slug']
    );
  });

  return file!.attributes;
}

export const postTitleResolver: ResolveFn<string> = (route) =>
  injectActiveContentMetadata(route).title;

export const postMetaResolver: ResolveFn<MetaTag[]> = (route) => {
  const meta = injectActiveContentMetadata(route);

  const postUrl = `${BASE_URL}/blog/${meta.slug}`;
  const imageUrl = toAbsoluteUrl(toSocialImage(meta.coverImage || DEFAULT_IMAGE));

  return [
    { name: 'description', content: meta.description },
    { name: 'author', content: 'Oussema Sahbeni' },

    // --- Open Graph (Facebook / LinkedIn) ---
    { property: 'og:title', content: meta.title },
    { property: 'og:description', content: meta.description },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: postUrl },
    { property: 'og:image', content: imageUrl },

    // --- Twitter / X ---
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: meta.title },
    { name: 'twitter:description', content: meta.description },
    { name: 'twitter:image', content: imageUrl },
  ];
};
