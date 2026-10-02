// Blog listing helpers — /pages/blog.html
// Owner input: owner-content/10-blog/
import { getCollection, type CollectionEntry } from 'astro:content';

export const blogPage = { title: 'Our Blog' };

export type BlogPost = CollectionEntry<'blog'>;

/** Published posts, newest first; undated posts follow in `order`. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => {
    const dateA = a.data.publishDate?.getTime() ?? -Infinity;
    const dateB = b.data.publishDate?.getTime() ?? -Infinity;
    if (dateA !== dateB) return dateB - dateA;
    return a.data.order - b.data.order;
  });
}
