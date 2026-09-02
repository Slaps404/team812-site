import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
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
    name: z.string(),
    image: z.string(),
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
    // Sponsor's own site. Optional, so a sponsor with no public URL still renders,
    // just as a plain logo instead of a link.
    url: z.string().url().optional(),
    logo: z.string().optional(),
    widthClass: z.string().optional(),
    flagged: z.boolean().default(false),
    tag: z.string().default(''),
  }),
});

// Roster groups on the team page. Members default to placeholders so an
// unfilled slot renders with the site's unconfirmed-data treatment instead of
// silently shipping as a real name.
const roster = defineCollection({
  loader: file('src/data/roster.yaml'),
  schema: z.object({
    order: z.number(),
    group: z.string(),
    // One line on what the subteam actually does, shown under the group name.
    summary: z.string().default(''),
    members: z
      .array(
        z.object({
          name: z.string(),
          year: z.string().default(''),
          lead: z.boolean().default(false),
          placeholder: z.boolean().default(true),
        }),
      )
      .default([]),
  }),
});

// Mentors on the mentors page. Everything here comes from the team's own
// published mentor bios; a mentor with no published bio stays `featured: false`
// and `placeholder: true`, which renders in the compact row with the site's
// unconfirmed-data treatment rather than an invented biography.
const mentors = defineCollection({
  loader: file('src/data/mentors.yaml'),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    role: z.string(),
    tenure: z.string().default(''),
    knownFor: z.array(z.string()).default([]),
    credentials: z.string().default(''),
    // A FIRST award given to this mentor by name, not to the team.
    honor: z.string().default(''),
    bio: z.string().default(''),
    featured: z.boolean().default(false),
    placeholder: z.boolean().default(true),
  }),
});

export const collections = { stats, tiers, funds, reasons, sponsors, roster, mentors };
