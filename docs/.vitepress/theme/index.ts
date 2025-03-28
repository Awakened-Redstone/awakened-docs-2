// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import DocsLayout from "./extension/DocsLayout.vue";
import "./style.css";
import "./tailwind-base.css";

export default {
  extends: DefaultTheme,
  Layout: DocsLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme;
