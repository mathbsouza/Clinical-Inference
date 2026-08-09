import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { PostSummary } from "../lib/posts";

type Props = {
  posts: PostSummary[];
};

export default function PostExplorer({ posts }: Props) {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesQuery = normalizedQuery
        ? [post.title, post.subtitle, post.excerpt, post.author, post.tags.join(" ")]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery)
        : true;

      return matchesQuery;
    });
  }, [posts, query]);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="grid gap-4 border-b border-[#2a2119] py-6 md:grid-cols-[1fr_auto] md:items-center">
        <label className="relative block">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#ff7a1a]"
          />
          <span className="sr-only">Search posts</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts"
            className="h-12 w-full rounded-full border border-[#2a2119] bg-[#0d0d0d] pl-11 pr-4 text-sm text-[#f8f4ef] outline-none transition placeholder:text-[#6f6861] focus:border-[#ff7a1a]"
          />
        </label>

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#2a2119] px-4 text-sm font-medium text-[#a7a19a] transition hover:border-[#ff7a1a] hover:text-[#f8f4ef]"
          >
            <X aria-hidden="true" className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      <div className="divide-y divide-[#2a2119]">
        {filteredPosts.map((post) => (
          <article key={post.slug} className="grid gap-5 py-7 md:grid-cols-[1fr_14rem] md:items-center">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#a7a19a]">
                <span>{post.author}</span>
                <span aria-hidden="true" className="text-[#ff7a1a]">
                  /
                </span>
                <time dateTime={post.date}>{post.formattedDate}</time>
                <span aria-hidden="true" className="text-[#ff7a1a]">
                  /
                </span>
                <span>{post.readingTime} min read</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold leading-tight text-[#fffaf4] sm:text-3xl">
                  <a
                    href={post.url}
                    className="decoration-[#ff7a1a]/40 underline-offset-8 transition hover:text-[#ffb36f] hover:underline"
                  >
                    {post.title}
                  </a>
                </h2>
                {post.subtitle && <p className="max-w-2xl text-[#c5bdb5]">{post.subtitle}</p>}
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[#a7a19a]">{post.excerpt}</p>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#2a2119] bg-[#15120f] px-3 py-1 text-xs font-medium text-[#ffb36f]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <a href={post.url} className="block overflow-hidden rounded-lg border border-[#2a2119] bg-[#0d0d0d]">
              <img
                src={post.cover}
                alt=""
                className="aspect-[16/9] h-full w-full object-cover opacity-90 transition duration-500 hover:scale-[1.03] hover:opacity-100"
                loading="lazy"
              />
            </a>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="py-16 text-center text-sm text-[#a7a19a]">No posts match this search.</div>
      )}
    </section>
  );
}
