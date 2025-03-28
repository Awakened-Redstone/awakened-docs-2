<template>
  <a
    :href="`https://modrinth.com/${type}/${slug}#download`"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
defineProps({
  slug: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "mod"
  }
});
</script>

<style scoped></style>
