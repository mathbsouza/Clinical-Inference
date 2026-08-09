import { getCollection, type CollectionEntry } from "astro:content";

export type PostEntry = CollectionEntry<"posts">;

export type PostSummary = {
  slug: string;
  url: string;
  title: string;
  subtitle?: string;
  date: string;
  formattedDate: string;
  author: string;
  cover: string;
  tags: string[];
  excerpt: string;
  readingTime: number;
};

export async function getPublishedPosts() {
  const posts = await getCollection("posts");

  return posts
    .filter((post) => post.data.published)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}

export function getReadingTime(body = "") {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function getExcerpt(post: PostEntry, maxLength = 180) {
  if (post.data.excerpt) {
    return post.data.excerpt;
  }

  const compact = (post.body ?? "")
    .replace(/---[\s\S]*?---/, "")
    .replace(/[#*_>`~\[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (compact.length <= maxLength) {
    return compact;
  }

  return `${compact.slice(0, maxLength).trim()}...`;
}

export function toPostSummary(post: PostEntry, cover: string, url: string): PostSummary {
  return {
    slug: post.id,
    url,
    title: post.data.title,
    subtitle: post.data.subtitle,
    date: post.data.date.toISOString(),
    formattedDate: formatDate(post.data.date),
    author: post.data.author,
    cover,
    tags: post.data.tags,
    excerpt: getExcerpt(post),
    readingTime: getReadingTime(post.body)
  };
}
