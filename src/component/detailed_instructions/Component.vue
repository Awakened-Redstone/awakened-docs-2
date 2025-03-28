<template>
  <button class="open-button transition-colors" @click="modal.show">
    <BookTextIcon />
    {{ title }}
  </button>
  <Modal ref="modal">
    <div class="flex h-full flex-col items-center gap-6 2xl:flex-row">
      <div class="fixed top-0 left-0 z-0 h-full w-full" @click="modal.hide" />
      <div class="relative z-[1] w-fit max-w-full shrink-0">
        <div class="close-button" @click="modal.hide">
          <XIcon />
        </div>
        <img :src="src" alt="Gif demonstrating the steps listed" class="rounded-md shadow" />
      </div>
      <div class="instructions shadow 2xl:max-h-full 2xl:content-center 2xl:overflow-x-scroll">
        <slot />
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
//@ts-expect-error Path alias
import { XIcon, BookTextIcon } from "@assets";
import Modal from "./Modal.vue";
import { ref } from "vue";

defineProps({
  src: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: "View detailed instructions",
    required: false
  }
});

const modal = ref();
</script>

<style scoped>
.open-button {
  background-color: var(--vp-c-gray-3);
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  display: flex;
  gap: 0.5rem;

  &:hover {
    background-color: var(--vp-c-gray-1);
  }
  .dark &:hover {
    background-color: color-mix(in srgb, var(--vp-c-gray-3), transparent 30%);
  }
}

.close-button {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  aspect-ratio: 1 / 1;
  width: 2rem;
  border-radius: calc(infinity * 1px);
  background-color: color-mix(in srgb, var(--vp-sidebar-bg-color), transparent 20%);
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
}

.shadow {
  box-shadow: 4px 4px 16px 5px rgba(0, 0, 0, 0.25);
}

.instructions {
  width: 100%;
  height: fit-content;
  padding: 1.5rem;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
  border-radius: var(--radius-md);
  z-index: 1;
}
</style>
