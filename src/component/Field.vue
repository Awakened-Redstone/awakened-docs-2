<template>
  <div class="!space-y-2">
    <label :class="`text${errorClass}`">{{ label }}</label>
    <slot :value="value" :updateValue="updateValue">
      <input
        :value="value"
        @input="updateValue(($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
      />
    </slot>
    <p class="text no-margin error" v-if="errors.length > 0">{{ errors[0] }}</p>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { computed } from "vue";

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

const errorClass = computed(() => {
  return errors.value.length > 0 ? " error" : ""
})
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
  @apply text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70
}

.error {
  @apply text-vp-danger-2
}
</style>
