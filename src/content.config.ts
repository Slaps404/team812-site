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

const packet = defineCollection({
  loader: file('src/data/packet.yaml'),
  schema: z.object({
    season: z.number(),
    kicker: z.string(),
    team: z.string(),
    number: z.string(),
    school: z.string(),
    location: z.string(),
    email: z.string(),
    site: z.string().url(),
    instagram: z.string(),
    github: z.string().url(),
    donate_url: z.string().url(),
    donate_label: z.string(),
    irs_letter_url: z.string().url(),
    legal_name: z.string(),
    ein: z.string(),
    cover_line: z.string(),
    cover_season: z.string(),
    description: z.string(),
    pitch: z.string(),
    shortfall: z.string(),
    ask: z.string(),
    about_headline: z.string(),
    about_body: z.string(),
    first_headline: z.string(),
    first_body: z.string(),
    first_points: z.array(z.string()),
    season_year: z.number(),
    robot: z.string(),
    game: z.string(),
    record: z.string(),
    season_body: z.string(),
    season_events: z.array(z.object({ label: z.string(), result: z.string() })),
    awards: z.array(z.object({ year: z.string(), name: z.string() })),
    extra_stats: z.array(z.object({ value: z.string(), label: z.string() })),
    give_headline: z.string(),
    give_body: z.string(),
    invoice_note: z.string(),
    inkind_note: z.string(),
    stacking_note: z.string(),
  }),
});

export const collections = { stats, tiers, funds, reasons, sponsors, roster, mentors, packet };
