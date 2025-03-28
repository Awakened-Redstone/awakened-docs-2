import * as glob from "glob";
import * as fs from "node:fs";

console.log("Finding files...");
const files = glob.sync("**/*.{md,vue}", {
  dot: true,
  ignore: [
    ".idea/**/*",
    ".vscode/**/*",
    ".vitepress/**/*",
    "node_modules/**/*",
    "docs/.vitepress/cache/**/*",
    "docs/assets/**/*",
    "*" //Ignore all files on the root folder
  ]
});

let content = "";

console.log("Building CSS file...");
for (const file of files) {
  content += `@source "../../../${file}";\n`;
}

console.log("Writing CSS file...");
fs.writeFileSync("docs/.vitepress/theme/tailwind.generated.css", content);

console.log("Done!");
