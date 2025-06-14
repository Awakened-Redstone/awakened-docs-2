<template>
  <div class="!space-y-2">
    <label
      :class="{
        text: true,
        error: errors.length > 0
      }"
    >
      <span v-if="errors.length > 0" class="icon">
        <OctogonAlertIcon />
      </span>
      {{ label }}
    </label>
    <slot :value="value" :updateValue="updateValue">
      <input
        :value="value"
        @input="updateValue(($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
      />
    </slot>
    <p class="text no-margin error" v-for="error in errors" :key="error">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { OctogonAlertIcon } from "@assets";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false
  }
});

const updateValue = (newValue: string) => {
  setValue(newValue);
};

const { value, setValue, errors } = useField(() => props.name, undefined, {
  validateOnMount: true,
  initialValue: ""
});
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

label {
  display: inline-block;
}

.text {
  @apply text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70;
  display: flex;
}

.icon {
  align-items: center;
  line-height: 1;

  & > svg {
    @apply h-4 w-4;
    vertical-align: text-bottom;
    margin-right: 0.25rem;
    display: inline-block;
  }
}

.error {
  @apply text-vp-danger-2;
}
</style>
