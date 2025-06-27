<template>
  <h1 class="pb-4">Generate config with an entry</h1>
  <div class="bg-vp-bg-soft border-border mb-4 rounded-md border p-4">
    <Field type="text" label="If user has" name="roles">
      <template #default="{ value, updateValue }">
        <input :value="value" @input="updateValue(($event.target as HTMLInputElement).value)" placeholder="@Twitch subs, 875942046153564638"/>
        <p class="text no-margin">Insert the role name or ID, separated by commas</p>
      </template>
    </Field>
    <Field label="Then" name="type" class="mt-4">
      <DropdownSelect
        name="type"
        v-model="actionType"
        class="!mt-0"
        :options="types"
        :display-name="(chosen: ActionType) => chosen?.name"
        :field="(chosen: ActionType) => chosen.value"
      />
    </Field>
    <div>
      <!-- Extra fields -->
      <div v-if="actionType.value === 'autowhitelist:execute_command'" class="ml-4 mt-2">
        <Field label="When adding player run" name="on_add" class="mb-2">
          <template #default="{ value, updateValue }">
            <input :value="value" @input="updateValue(($event.target as HTMLInputElement).value)" placeholder='tellraw @a {text: "Welcome {player} to the server!", color: "green"}'/>
            <p class="text warning no-margin" v-if="value.startsWith('/')">Commands do not need the <code>/</code> prefix. The game will be looking for <code>{{"/" + value}}</code></p>
          </template>
        </Field>
        <Field label="When adding player run" name="on_remove">
          <template #default="{ value, updateValue }">
            <input :value="value" @input="updateValue(($event.target as HTMLInputElement).value)" placeholder="scoreboard player reset points {player}"/>
            <p class="text warning no-margin" v-if="value.startsWith('/')">Commands do not need the <code>/</code> prefix. The game will be looking for <code>{{"/" + value}}</code></p>
          </template>
        </Field>
      </div>
      <div v-if="actionType.value === 'autowhitelist:luckperms/permission'" class="ml-4 mt-2">
        <Field label="Give the player the permission" name="permission" class="mb-2" placeholder="worldedit.navigation.thru.tool" />
      </div>
      <div v-if="actionType.value === 'autowhitelist:luckperms/group'" class="ml-4 mt-2">
        <Field label="Add the player to the group" name="group" class="mb-2" placeholder="twitch_tier_1" />
      </div>
    </div>
  </div>

  <Markdown ref="markdownRef" @markdown-updated="scrollMarkdown" class="limit-height">{{ output }}</Markdown>
</template>

<script setup lang="ts">
import { data } from './sample-config.data.ts'
import DropdownSelect from "@component/DropdownSelect.vue";
import Field from "@component/Field.vue";
import Markdown from "@component/Markdown.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import { computed, ref, useTemplateRef, watch } from "vue";
import type { Ref } from "vue";

const formSchema = z.object({
  roles: z.string().regex(/^((, ?)?(\d+|@[^\n,]+))+$/, {
    message: "A role must be an ID or a name prefixed with @"
  }),
  type: z
    .string()
    .regex(/^([_\-a-z0-9.]+:)?[_\-a-z0-9.\/]+$/, {
      message: "Invalid identifier"
    })
    .min(2),
  on_add: z.string(),
  on_remove: z.string(),
  permission: z.string().nonempty({ message: "The permission can not be empty" }),
  group: z.string().nonempty({ message: "The group can not be empty" })
});

type ActionType = { name: string; value: string, extra?: string[] };

const types: ActionType[] = [
  {
    name: "Just whitelist",
    value: "autowhitelist:whitelist"
  },
  {
    name: "Execute command",
    value: "autowhitelist:execute_command",
    extra: ["on_add", "on_remove"]
  },
  {
    name: "Give Luckperms permission",
    value: "autowhitelist:luckperms/permission",
    extra: ["permission"]
  },
  {
    name: "Give Luckperms group",
    value: "autowhitelist:luckperms/group",
    extra: ["group"]
  }
];

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    roles: ""
  }
});

const actionType: Ref<ActionType> = ref(types[0]);
let positioned = false;
const markdown = useTemplateRef('markdownRef');

function scrollMarkdown() {
  //if (positioned) return;

  const pre: HTMLPreElement = markdown.value?.$el.children[0].children[2];
  const focusElements = pre.getElementsByClassName("has-focus");
  if (focusElements.length > 0) {
    positioned = true;
    const element = focusElements[0] as HTMLElement
    const code = pre.children[0]
    const arr: Element[] = [];
    for (let i = 0; i < code.children.length; i++) {
      arr.push(code.children[i]);
    }

    const index = arr.findIndex(value => value === element)

    const comment = code.children[index - 2] as HTMLElement;

    pre.scrollTo({
      top: comment.offsetTop - comment.offsetHeight / 3,
      behavior: "smooth"
    });
  }
}

watch(actionType, () => {
  form.validate();
});

const output: any = computed(() => {
  const values: { [extra: string]: string } = { ...form.values };

  const output: any = {
    roles: !!values.roles ? values.roles.split(/, ?/) : [],
    type: values.type
  };

  if ((actionType.value.extra ?? []).length > 0) {
    output["execute"] = {};
  }

  for (const extra of actionType.value.extra ?? []) {
    output["execute"][extra] = values[extra] ?? "";
  }

  const stringified = JSON.stringify(output, undefined, 2);
  const lines = stringified.split("\n")
  let entriesJsonString = "";
  lines.forEach((line, index) => {
    entriesJsonString += line + " //[!code focus]";
    if (index < lines.length - 1) {
      entriesJsonString += "\n    ";
    }
  })

  return (
    "```json\n" +
    format(data[0], entriesJsonString) +
    "\n```"
  );
});

function format(str: string, ...args: string[]) {
  return str.replace(/%s/g, () => args.shift() || "");
}
</script>

<style scoped>
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);
@import "@/docs/.vitepress/theme/tailwind.css";

@layer theme, base, components, utilities;

@custom-variant dark (&:where(.dark, .dark *));

input {
  @apply bg-bg-alt w-full rounded-md px-3 py-2 text-sm;
}

.text {
  @apply text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70;
}

p.text {
  color: var(--vp-c-text-2);

  &.warning {
    color: var(--vp-c-warning-1);
  }
}

.warning {
  color: var(--vp-c-warning-1);
}
</style>
<style>
.limit-height > div > pre {
  max-height: 24rem;
}
</style>
