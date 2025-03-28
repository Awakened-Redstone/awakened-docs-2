import * as glob from "glob";
import * as fs from "node:fs";

console.log("Finding files...");
const icons = glob.sync("**/*.svg", {
  cwd: "src/assets",
  withFileTypes: true
});

const imports = {
  component: "",
  raw: "",
  extraRaw: ""
};
let exports = "";

console.log("Building contents...");
for (const icon of icons) {
  const path = icon.relative();
  const name = toPascalCase(icon.name.slice(0, icon.name.length - 4));
  imports.component += `import _${name}Icon from "./${path}?component";\n`;
  imports.raw += `import _${name}Icon from "./${path}?raw";\n`;

  imports.extraRaw += `const _${name}Icon = '${String(fs.readFileSync(icon.fullpath())).replaceAll("\n", "")}'\n`
  exports += `export const ${name}Icon = _${name}Icon;\n`;
}

const component = `${imports.component}\n${exports}`;
const raw = `${imports.raw}\n${exports}`;
const extraRaw = `${imports.extraRaw}\n${exports}`;

console.log("Writing to index.ts...");
fs.writeFileSync("src/assets/index.ts", component);
console.log("Writing to raw.ts...");
fs.writeFileSync("src/assets/raw.ts", raw);
console.log("Writing to extraRaw.ts...");
fs.writeFileSync("src/assets/extraRaw.ts", extraRaw);

console.log("Complete!");

function toPascalCase(text: string) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function clearAndUpper(text: string) {
  return text.replace(/-/, "").toUpperCase();
}
