// @ts-check
import { defineConfig } from 'astro/config';
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

/**
 * Production safety net: unconfirmed content is marked PLACEHOLDER (or left as "___") in the source and must
 * never reach the live site. Drafts builds (SHOW_DRAFTS=true: dev, deploy previews) are exempt.
 * @returns {import('astro').AstroIntegration}
 */
function noPlaceholdersInProduction() {
  return {
    name: 'no-placeholders-in-production',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        if (process.env.SHOW_DRAFTS === 'true') return;
        const root = fileURLToPath(dir);
        const files = (await readdir(root, { recursive: true })).filter((f) => String(f).endsWith(".html"));
        const offenders = [];
        for (const file of files) {
          const html = await readFile(join(root, file), 'utf8');
          if (/PLACEHOLDER|_{3,}/.test(html)) offenders.push(file);
        }
        if (offenders.length) {
          throw new Error(`Placeholder text found in the production build: ${offenders.join(', ')}`);
        }
        logger.info(`Checked ${files.length} pages: no placeholder text.`);
      },
    },
  };
}

export default defineConfig({
  // Production domain used for canonical URLs and structured data.
  site: 'https://rivaanshent.com',

  // Emit /pages/about-us.html (not /pages/about-us/index.html) so every existing URL keeps working.
  build: { format: 'file' },

  integrations: [noPlaceholdersInProduction()],
});
