const NEWSLETTER_USERNAME = "clinicalinference";

export const SITE = {
  name: "Clinical Inference",
  description:
    "Essays on evidence-based medicine, philosophy, and clinical practice.",
  author: "Matheus",
  rssPath: "/rss.xml",
  newsletter: {
    provider: "Buttondown",
    username: NEWSLETTER_USERNAME,
    action: `https://buttondown.com/api/emails/embed-subscribe/${NEWSLETTER_USERNAME}`,
    tag: "clinical-inference-site"
  },
  defaultImage: "/images/brand/og-image.png"
};

export function withBase(path: string) {
  if (!path || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return `${normalizedBase}${normalizedPath}`;
}
