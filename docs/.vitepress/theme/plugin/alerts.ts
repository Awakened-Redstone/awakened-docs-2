/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

import type MarkdownIt from "markdown-it";
import container from "markdown-it-container";
import type { RenderRule } from "markdown-it/lib/renderer.mjs";
import type Token from "markdown-it/lib/token.mjs";
import { MarkdownEnv } from "vitepress";
import { extractTitle, getAdaptiveThemeMarker, type Options } from "./preWrapper";
import {
  InfoIcon,
  LightBulbIcon,
  MessageSquareWarningIcon,
  TriangleAlertIcon,
  OctogonAlertIcon
  //@ts-expect-error
} from "@assets/raw";

export const defaults: ContainerOptionsGroup = {
  note: {
    label: "NOTE",
    icon: InfoIcon
  },
  tip: {
    label: "TIP",
    icon: LightBulbIcon
  },
  info: {
    label: "INFO",
    icon: MessageSquareWarningIcon
  },
  warning: {
    label: "WARNING",
    icon: TriangleAlertIcon
  },
  danger: {
    label: "DANGER",
    icon: OctogonAlertIcon
  },
  details: {
    label: "Details",
    icon: ""
  }
};

export const alertsPlugin = (
  md: MarkdownIt,
  options: Options,
  containerOptions?: ContainerOptionsGroup
) => {
  md.use(...createContainer("note", containerOptions?.note, md))
    .use(...createContainer("tip", containerOptions?.tip, md))
    .use(...createContainer("info", containerOptions?.info, md))
    .use(...createContainer("warning", containerOptions?.warning, md))
    .use(...createContainer("danger", containerOptions?.danger, md))
    .use(...createContainer("details", containerOptions?.details, md))
    // explicitly escape Vue syntax
    .use(container, "v-pre", {
      render: (tokens: Token[], idx: number) =>
        tokens[idx].nesting === 1 ? `<div v-pre>\n` : `</div>\n`
    })
    .use(container, "raw", {
      render: (tokens: Token[], idx: number) =>
        tokens[idx].nesting === 1 ? `<div class="vp-raw">\n` : `</div>\n`
    })
    .use(...createCodeGroup(options, md));
};

type ContainerArgs = [typeof container, string, { render: RenderRule }];

function createContainer(
  klass: string,
  options: ContainerOptions = defaults[klass],
  md: MarkdownIt
): ContainerArgs {
  const defaultOptions: ContainerOptions = defaults[klass];
  const label = options.label || defaultOptions.label;
  const icon = options.icon || defaultOptions.icon;
  return [
    container,
    klass,
    {
      render(tokens, idx, _options, env: MarkdownEnv & { references?: any }) {
        const token = tokens[idx];
        const info = token.info.trim().slice(klass.length).trim();
        const attrs = md.renderer.renderAttrs(token);
        if (token.nesting === 1) {
          let title = md.renderInline(info || label, {
            references: env.references
          });

          if (klass === "details") {
            return `<details class="${klass} custom-block"${attrs}><summary>${title}</summary>\n`;
          }

          return `<div class="${klass} markdown-alert"${attrs}><p class="markdown-alert-title">${icon}${title}</p>\n`;
        } else return klass === "details" ? `</details>\n` : `</div>\n`;
      }
    }
  ];
}

function createCodeGroup(options: Options, md: MarkdownIt): ContainerArgs {
  return [
    container,
    "code-group",
    {
      render(tokens, idx) {
        if (tokens[idx].nesting === 1) {
          let tabs = "";
          let checked = "checked";

          for (
            let i = idx + 1;
            !(tokens[i].nesting === -1 && tokens[i].type === "container_code-group_close");
            ++i
          ) {
            const isHtml = tokens[i].type === "html_block";

            if ((tokens[i].type === "fence" && tokens[i].tag === "code") || isHtml) {
              const title = extractTitle(isHtml ? tokens[i].content : tokens[i].info, isHtml);

              if (title) {
                tabs += `<input type="radio" name="group-${idx}" id="tab-${i}" ${checked}><label data-title="${md.utils.escapeHtml(title)}" for="tab-${i}">${title}</label>`;

                if (checked && !isHtml) tokens[i].info += " active";
                checked = "";
              }
            }
          }

          return `<div class="vp-code-group${getAdaptiveThemeMarker(options)}"><div class="tabs">${tabs}</div><div class="blocks">\n`;
        }
        return `</div></div>\n`;
      }
    }
  ];
}

export interface ContainerOptionsGroup {
  note: ContainerOptions;
  tip: ContainerOptions;
  info: ContainerOptions;
  warning: ContainerOptions;
  danger: ContainerOptions;
  details: ContainerOptions;
}

export interface ContainerOptions {
  label?: string;
  icon?: string;
}
