import type { DefaultTheme } from "vitepress/theme";

export interface DocsConfig extends DefaultTheme.Config {
  docsNav?: Nav
}

export type VersionKey = `${number}.${number}.${number}`;

export type NavItemVersioning = {
  latest: string
  [version: VersionKey]: string
}

export type NavItem = DefaultTheme.NavItem | NavItemVersioning
export type DefaultNavItem = DefaultTheme.NavItem

export type Nav = NavItem[] | NavMulti
export type DefaultNav = DefaultNavItem[] | NavMulti

export interface NavMulti {
  [path: string]: NavItem[] | NavItem
}
