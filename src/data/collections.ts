// Published-content helpers for condition pages and Health Tips.
// Drafts (unreviewed medical content) are included only in `npm run dev` and when SHOW_DRAFTS=true
// (set for Netlify deploy previews in netlify.toml) - never in a production build.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Condition = CollectionEntry<'conditions'>;
export type Tip = CollectionEntry<'blog'>;

const buildEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};

export const showDrafts: boolean = import.meta.env.DEV || (import.meta.env.SHOW_DRAFTS ?? buildEnv.SHOW_DRAFTS) === 'true';

const visible = ({ data }: { data: { draft: boolean } }) => showDrafts || !data.draft;

export async function getConditions(): Promise<Condition[]> {
  const items = await getCollection('conditions', visible);
  return items.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

/** Health Tips, newest first; undated tips follow in `order`. */
export async function getTips(): Promise<Tip[]> {
  const items = await getCollection('blog', visible);
  return items.sort((a, b) => {
    const dateA = a.data.publishDate?.getTime() ?? -Infinity;
    const dateB = b.data.publishDate?.getTime() ?? -Infinity;
    return dateB - dateA || a.data.order - b.data.order;
  });
}

export const hasTips = async () => (await getTips()).length > 0;

export const reviewLine = (data: { reviewedBy?: string; reviewedDate?: Date }) =>
  data.reviewedBy
    ? `Reviewed by ${data.reviewedBy}${
        data.reviewedDate
          ? ` · Last reviewed ${data.reviewedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`
          : ''
      }`
    : null;
