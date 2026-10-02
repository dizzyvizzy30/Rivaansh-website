// Content Collections (one markdown file per item).
// - conditions: src/content/conditions/<slug>.md → /pages/ent/<slug>.html
// - blog (Health Tips): src/content/blog/<slug>.md → /pages/blog/<slug>.html
// Medical pages start as `draft: true` and are only published after the doctor reviews them
// (drafts are visible in `npm run dev` and Netlify deploy previews, never in production).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const review = {
  /** Set when the doctor has approved the page; shown as "Reviewed by … · Last reviewed …". */
  reviewedBy: z.string().optional(),
  reviewedDate: z.coerce.date().optional(),
  draft: z.boolean().default(true),
  /** Override the URL segment (keeps legacy URLs such as blog2 working). */
  slug: z.string().optional(),
};

const conditions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/conditions' }),
  schema: z.object({
    title: z.string(),
    /** Gujarati / Hindi names people search for, e.g. "ચક્કર · chakkar aana". */
    localNames: z.string().optional(),
    /** 2–3 line plain-language summary ("In short"); also the meta description. */
    summary: z.string(),
    area: z.enum(['ear', 'nose', 'throat', 'head-neck']),
    children: z.boolean().default(false),
    /** Procedures described on this page; each `anchor` must match a heading id in the body. */
    procedures: z.array(z.object({ name: z.string(), anchor: z.string() })).default([]),
    relatedTips: z.array(z.string()).default([]),
    order: z.number().default(100),
    ...review,
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One or two sentences: used on the Health Tips list and as the meta description. */
      description: z.string(),
      publishDate: z.coerce.date().optional(),
      order: z.number().default(100),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Condition slugs this tip links to (and that link back). */
      relatedConditions: z.array(z.string()).default([]),
      ...review,
    }),
});

export const collections = { conditions, blog };
