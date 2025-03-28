import _docsData from "@/docs.json";
import { defineConfig, ensureStartingSlash } from "@/.vitepress/utils";
import type { DocsData } from "@/.vitepress/types";
import type { DocsConfig, Nav, NavItem } from "./theme/DocsTheme";
import { alertsPlugin } from "./theme/plugin/alerts";

import * as glob from "glob";
import * as fs from "node:fs";
import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";
import matter from "gray-matter";
import { fileURLToPath, URL } from "node:url";
import type { UserConfig } from "vitepress"
import type { DefaultTheme } from "vitepress/theme"

const docsData: DocsData = _docsData;

// https://vitepress.dev/reference/site-config
// noinspection JSUnusedGlobalSymbols
export default defineConfig<DocsConfig>({
  title: "Awakened Docs",
  description: "The documentation for Awakened Redstone's projects",

  rewrites: {
    "versions/:path*": ":path*"
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    docsNav: getNav(),

    sidebar: getSidebar(),

    search: {
      options: {
        // Removes versioned pages from search.
        _render(src, env, md) {
          if (env.frontmatter?.search === false) return "";
          if (env.relativePath.startsWith("versions/")) return "";
          return md.render(src, env);
        }
      },
      provider: "local"
    },

    socialLinks: [{ icon: "github", link: "https://github.com/Awakened-Redstone/awakened-docs-2" }]
  },

  cleanUrls: true,

  vite: {
    resolve: {
      alias: [
        {
          find: "@",
          //@ts-ignore
          replacement: fileURLToPath(new URL("../../", import.meta.url))
        },
        {
          find: "@src",
          //@ts-ignore
          replacement: fileURLToPath(new URL("../../src/", import.meta.url))
        },
        {
          find: "@docs",
          //@ts-ignore
          replacement: fileURLToPath(new URL("../../docs/", import.meta.url))
        },
        {
          find: "@component",
          //@ts-ignore
          replacement: fileURLToPath(new URL("../../src/component/", import.meta.url))
        },
        {
          find: "@assets/extraRaw",
          //@ts-ignore
          replacement: fileURLToPath(new URL("../../src/assets/extraRaw", import.meta.url))
        },
        {
          find: "@assets/raw",
          //@ts-ignore
          replacement: fileURLToPath(new URL("../../src/assets/raw", import.meta.url))
        },
        {
          find: "@assets",
          //@ts-ignore
          replacement: fileURLToPath(new URL("../../src/assets", import.meta.url))
        },
        {
          find: /^.*\/VPNavBarMenu\.vue$/,
          replacement: fileURLToPath(
            //@ts-ignore
            new URL("./theme/component/VPNavBarMenu.vue", import.meta.url)
          )
        },
        {
          find: /^.*\/VPNavScreenMenu\.vue$/,
          replacement: fileURLToPath(
            //@ts-ignore
            new URL("./theme/component/VPNavScreenMenu.vue", import.meta.url)
          )
        }
      ]
    },

    plugins: [
      tailwindcss(),
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false
                }
              }
            }
          ]
        }
      })
    ]
  },

  markdown: {
    gfmAlerts: false,
    config: (md) => {
      md.use(alertsPlugin);
    }
  }
} satisfies UserConfig<DocsConfig>);

// Utility functions
function _getSidebar(
  path: string,
  basePath: string = ensureStartingSlash(path)
): DefaultTheme.SidebarItem[] {
  path = ensureStartingSlash(path);
  basePath = ensureStartingSlash(basePath);
  const ignore = path === basePath ? [] : ["index.md"];
  const globOptions: glob.GlobOptionsWithFileTypesFalse = {
    cwd: `docs${path}`,
    dotRelative: false,
    absolute: false,
    ignore
  };
  const documents = glob.sync("*.md", globOptions);
  const dirs = glob.sync("*/", globOptions);
  const relativePath =
    path === basePath ? "" : ensureStartingSlash(path.slice(basePath.length + 1));

  const items: DefaultTheme.SidebarItem[] = documents.map((value) => {
    const file: string = ensureStartingSlash(value);
    const matterData = matter.read(`./docs/${path}/${value}`);

    const title = matterData.data.title ?? value;
    const index = matterData.data.sidebar_position ?? 0;

    return {
      text: title,
      link: `${relativePath}${file}`,
      index
    };
  });

  if (dirs.length > 0) {
    for (const dir of dirs) {
      let title: string = undefined;
      let index = 0;
      let link = undefined;

      if (fs.existsSync(`./docs/${path}/${dir}/index.md`)) {
        const indexMatter = matter.read(`./docs/${path}/${dir}/index.md`);
        if (indexMatter.content.length > 0) {
          link = `/${dir}`;
        }
        index = indexMatter.data.sidebar_position ?? 0;
        title = indexMatter.data.title ?? dir;
      }

      items.push({
        text: title,
        items: _getSidebar(`${path}/${dir}`, path),
        collapsed: true,
        link,
        //@ts-expect-error Custom data
        index
      });
    }
  }

  return items.sort((a: DefaultTheme.SidebarItem, b: DefaultTheme.SidebarItem) => a["index"] - b["index"]);
}

function getSidebar() {
  const sidebar: DefaultTheme.SidebarMulti = {};

  for (const docsId in docsData) {
    const docs = docsData[docsId];

    for (const versionId in docs.versions) {
      let versionPath = ensureStartingSlash(versionId);
      let pathSuffix = "/versions";
      if (versionId === "latest" || versionId === docs.versions.latest) {
        versionPath = "";
        pathSuffix = "";
      }

      const docsUrlPath = ensureStartingSlash(docs.path + versionPath);
      const docsFilePath = pathSuffix + docsUrlPath;

      const items = _getSidebar(docsFilePath)

      sidebar[docsUrlPath] = {
        base: docsUrlPath,
        items: items.length > 1 ? items : []
      };
    }
  }

  return sidebar;
}

function getNav(): Nav {
  const global: NavItem[] = [];

  for (const docsDataKey in docsData) {
    const docs = docsData[docsDataKey];
    global.push({
      text: docs.name,
      link: docs.path
    });
  }

  const nav = {
    "/": global
  };

  function add(path: string, items: NavItem[]) {
    nav[path] = [...global, ...items];
  }

  for (const docsDataKey in docsData) {
    const docs = docsData[docsDataKey];
    if (Object.keys(docs.versions).length <= 2) continue;
    const path = ensureStartingSlash(docs.path);
    /*const items: DefaultTheme.NavItemWithLink[] = [];

    for (let versionId in docs.versions) {
      if (versionId === "latest" || versionId === docs.versions.latest) continue;
      const versionName = docs.versions[versionId];
      items.push({
        text: versionName,
        link: `${path}/${versionId}`
      });
    }*/

    add(path, [
      docs.versions
      /*{
        text: docs.versions[docs.versions.latest],
        items: items
      }*/
    ]);
  }

  return nav;
}
