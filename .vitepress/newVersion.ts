import {Argument, InvalidArgumentError, program} from "commander";
import prompts from "prompts";
import _docs from "../docs.json";
import semver from "semver";
import * as fs from "node:fs";
import {DocsData} from "./types";

const docsRef = _docs as DocsData;

(async () => {
  const docsIds: string[] = [];
  for (const docsKey in docsRef) {
    docsIds.push(docsKey);
  }

  program
    .addArgument(new Argument("[documentation]").choices(docsIds))
    .addArgument(new Argument("[version]").argParser(value => {
      if (semver.valid(value)) {
        return value
      } else {
        throw new InvalidArgumentError('Invalid Semver')
      }
    }));
  program.parse();

  let documentation: string = program.args[0];
  if (documentation == undefined) {
    documentation = (await prompts({
      type: "select",
      name: "docs",
      message: "What docs to version?",
      choices: docsIds.map(id => ({
        title: docsRef[id].name,
        value: id
      })),
    })).docs;
  }

  const docs = docsRef[documentation]

  let newVersion: string = program.args[1];
  if (newVersion == undefined) {
    newVersion = (await prompts({
      type: "text",
      name: "version",
      message: "What's the new version?",
      validate: value => semver.valid(value) ? true : "Not a Semver"
    })).version;
  }

  if (!semver.gt(newVersion, docs.versions.latest)) {
    console.error(`The provided version ${newVersion} is not greater than the current ${docs.versions}`)
    return
  }

  fs.cpSync(`./docs/${docs.path}`, `./docs/versions/${docs.path}/${docs.versions.latest}/`, {recursive: true})

  docs.versions.latest = newVersion
  docs.versions[newVersion] = versionName(newVersion)
  fs.writeFileSync("./docs2.json", JSON.stringify(docsRef, null, 2))
})()

function versionName(version: string) {
  const ver = semver.parse(version);
  if (ver.prerelease.length) {
    return `${ver.major}.${ver.minor}.${ver.patch} - ${capitalizeFirstLetter(ver.prerelease[0].toString())} ${ver.prerelease.slice(1).join(".")}`
  }
  return ver.version
}

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
