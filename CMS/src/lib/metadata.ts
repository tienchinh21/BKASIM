import type { Metadata } from 'next';

import { config } from '@/config';

export function generateDefaultMetadata(title: string, description?: string): Metadata {
  return {
    title: `${title} | Dashboard | ${config.site.name}`,
    description: description || config.site.description,
    themeColor: config.site.themeColor,
  };
}
