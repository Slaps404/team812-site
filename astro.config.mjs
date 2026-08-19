import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://team812.com',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
