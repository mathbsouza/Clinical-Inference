// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const base = process.env.BASE_PATH ?? "/";
const site = process.env.SITE ?? "https://example.com";

export default defineConfig({
  site,
  base,
  integrations: [mdx(), react()],
  markdown: {
    shikiConfig: {
      theme: "github-dark"
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
