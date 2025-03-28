<template>
  <div :class="`${type} markdown-alert`">
    <p class="markdown-alert-title"><component :is="icon" />{{ label }}</p>
    <p>
      <slot />
    </p>
  </div>
</template>

<script setup lang="ts">
import {
  InfoIcon,
  LightBulbIcon,
  MessageSquareWarningIcon, OctogonAlertIcon,
  TriangleAlertIcon
} from "@src/assets";

const props = defineProps({
  type: {
    type: String as () => "note" | "tip" | "info" | "warning" | "danger",
    required: true
  },
  title: {
    type: String,
    required: false
  }
});

const defaults = {
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

const label = props.title ?? defaults[props.type].label;
const icon = defaults[props.type].icon;
</script>
