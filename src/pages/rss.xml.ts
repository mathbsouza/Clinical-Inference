import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPublishedPosts, getExcerpt } from "../lib/posts";
import { SITE, withBase } from "../lib/site";

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  const siteUrl = new URL(withBase("/"), context.site).toString();

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      description: getExcerpt(post),
      pubDate: post.data.date,
      link: new URL(withBase(`/posts/${post.id}/`), context.site).toString()
    })),
    customData: "<language>en-us</language>"
  });
}
