import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://themidnightmechanics.com',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});

