// Content Collections. Blog posts live in src/content/blog/*.md.
// The file name becomes the URL (/pages/blog/<file-name>.html) unless frontmatter sets `slug`.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One or two sentences: used on the blog list and as the meta description. */
      description: z.string(),
      /** Publication date (YYYY-MM-DD). Newest posts are listed first. */
      publishDate: z.coerce.date().optional(),
      /** Tie-breaker for undated posts (lower = earlier in the list). */
      order: z.number().default(100),
      /** Cover photo, relative to the post file, e.g. ../../assets/images/blog/tinnitus.jpg */
      cover: image().optional(),
      coverAlt: z.string().optional(),
      author: z.string().optional(),
      draft: z.boolean().default(false),
      /** Override the URL segment (keeps legacy URLs such as blog1 working). */
      slug: z.string().optional(),
    }),
});

export const collections = { blog };
