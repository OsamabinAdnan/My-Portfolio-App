import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from './client';

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export function resolveImageUrl(sanityImage?: any, fallbackUrl?: string): string | null {
  if (sanityImage && (sanityImage.asset || sanityImage._ref || sanityImage._type === 'image')) {
    try {
      return urlFor(sanityImage).auto('format').fit('max').url();
    } catch {
      // Return fallback if builder fails
    }
  }
  return fallbackUrl || null;
}
