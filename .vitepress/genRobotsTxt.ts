import * as fs from "node:fs";
import type { DocsData } from "./types.ts";
import _docs from "../docs.json"

const baseFile = fs.readFileSync("./.vitepress/robots.txt")

let string = "";

const docs: DocsData = _docs;

for (const [_, value] of Object.entries(docs)) {
  for (const version in value.versions) {
    if (version === "latest" || version === value.versions.latest) continue;

    string += `\nDisallow: /${value.path}/${version}/*`
  }
}

console.log("Updating robots.txt");
if (string.length > 0) {
  console.log("Blocking crawlers on versioned docs");
  fs.writeFileSync("./docs/assets/robots.txt", baseFile + `
# Block all crawlers for versioned docs
User-agent: *${string}
`)
} else {
  console.log("No versioned docs found");
  fs.writeFileSync("./docs/assets/robots.txt", baseFile);
}
