import { useData } from "vitepress";
import type { DefaultTheme } from "vitepress/theme";
import { ensureStartingSlash } from "vitepress/dist/client/theme-default/support/utils";
import { computed, ref, watch } from "vue";
import type { DefaultNavItem, DocsConfig, Nav, NavItem } from "../DocsTheme";

function buildNav(nav: NavItem[], basePath: string, currentPath: string): DefaultNavItem[] {
  const newNav: DefaultNavItem[] = [];
  for (const navElement of nav) {
    if ("latest" in navElement) {
      const items: DefaultTheme.NavItemWithLink[] = [];

      let docPath = currentPath.slice(basePath.length);
      let currentVersion = navElement.latest;
      for (const versionId in navElement) {
        const pathWithVersion: string = currentPath.slice(basePath.length).slice(1);
        if (pathWithVersion.startsWith(versionId)) {
          currentVersion = versionId;
          docPath = docPath.slice(versionId.length + 1);
        }
      }

      for (const versionId in navElement) {
        if (versionId === "latest") continue;

        const versionName = navElement[versionId];
        const versionPath = `${basePath}/${navElement.latest == versionId ? "" : versionId + "/"}${docPath}`;

        items.push({
          text: versionName,
          link: versionPath
        });
      }

      //console.log(currentVersion);
      newNav.push({
        text: currentVersion,
        items
      });
    } else {
      newNav.push(navElement);
    }
  }

  return newNav;
}

function getNav(_nav: Nav | undefined, path: string): DefaultNavItem[] {
  if (Array.isArray(_nav)) return buildNav(_nav, "", path);
  if (_nav == null) return [];

  path = ensureStartingSlash(path);

  const dir = Object.keys(_nav)
    .sort((a, b) => {
      return b.split("/").length - a.split("/").length;
    })
    .find((dir) => {
      // make sure the multi nav key starts with slash too
      return path.startsWith(ensureStartingSlash(dir));
    });

  const nav = dir ? _nav[dir] : [];
  return buildNav(Array.isArray(nav) ? nav : [nav], dir, path);
}

export function useNav() {
  const { theme, page } = useData<DocsConfig>();
  const _nav = computed(() => {
    const navConfig = theme.value.docsNav;
    const relativePath = page.value.relativePath;
    return navConfig ? getNav(navConfig, relativePath) : [];
  });

  const nav = ref(_nav.value);

  watch(_nav, (next, prev) => {
    if (JSON.stringify(next) !== JSON.stringify(prev)) {
      nav.value = _nav.value;
    }
  });

  return nav;
}
