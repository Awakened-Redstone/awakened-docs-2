import { UserConfig, defineConfig as _defineConfig } from "vitepress";

export function ensureStartingSlash(path) {
  return path.startsWith("/") ? path : `/${path}`;
}

export function defineConfig<T>(config: UserConfig<T>) {
  return _defineConfig(config);
}
