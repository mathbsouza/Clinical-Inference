import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

function generatePostId(entry: string) {
  return entry.replace(/\/index\.(md|mdx)$/, "").replace(/\.(md|mdx)$/, "");
}

const posts = defineCollection({
  loader: glob({
    base: "./src/content/posts",
    pattern: "**/*.{md,mdx}",
    generateId: ({ entry }) => generatePostId(entry)
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
    author: z.string().default("Matheus"),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    published: z.boolean().default(true),
    excerpt: z.string().optional(),
    importedFrom: z.string().url().optional()
  })
});

export const collections = { posts };
