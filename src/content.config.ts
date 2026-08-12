import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const stats = defineCollection({
  loader: file('src/data/stats.yaml'),
  schema: z.object({
    order: z.number(),
    value: z.string(),
    suffix: z.string().default(''),
    label: z.string(),
    flagged: z.boolean().default(false),
  }),
});

const tiers = defineCollection({
  loader: file('src/data/tiers.yaml'),
  schema: z.object({
    order: z.number(),
    precede: z.string(),
    amount: z.string(),
    top: z.boolean().default(false),
    items: z.array(z.string()),
  }),
});

const funds = defineCollection({
  loader: file('src/data/funds.yaml'),
  schema: z.object({
    order: z.number(),
    label: z.string(),
    amount: z.string(),
    flagged: z.boolean().default(false),
    tag: z.string().default(''),
    total: z.boolean().default(false),
  }),
});

const reasons = defineCollection({
  loader: file('src/data/reasons.yaml'),
  schema: z.object({
    order: z.number(),
    num: z.string(),
    title: z.string(),
    body: z.string(),
  }),
});

const sponsors = defineCollection({
  loader: file('src/data/sponsors.yaml'),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    tier: z.enum(['current', 'past', 'supporter']),
    logo: z.string().optional(),
    widthClass: z.string().optional(),
    flagged: z.boolean().default(false),
    tag: z.string().default(''),
  }),
});

export const collections = { stats, tiers, funds, reasons, sponsors };
