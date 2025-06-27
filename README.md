# docs-2

A place for all my documentations

This project requires [bun](https://bun.sh/) to develop and deploy  
It also has patches and modifications on top of [VitePress](https://vitepress.dev/)

All docs must have an entry on `docs.json`  
It is used to generate the side bar and top nav bar.  
A doc must have a unique id as it's key and it's name, path (relative to docs) and initial versions provided.  
`versions` should be updated using the script.  

## Setup:

```bash
bun install
```

## Running:

### Dev

```bash
bun run dev
```
The default port is `3000`

### Build

```bash
bun run build
```
The output will be at `docs/.vitepress/dist`

## Creating a new version
```bash
bun ./.vitepress/newVersion.ts
```

## Updating robots.txt
```bash
bun ./.vitepress/genRobotsTxt.ts
```

## Updating robots.txt
```bash
bun ./.vitepress/genRobotsTxt.ts
```

## Updating icons .ts files
```bash
bun ./.vitepress/generateIconsFile.ts
```

## Making tailwind work with new pages
```bash
bun ./.vitepress/createOverlyLargeCssFile.ts
```

