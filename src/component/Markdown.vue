<template v-slot="slot">
  <div
    v-if="!error"
    :class="{
      'markdown-content': true,
      'is-loading': isLoading,
      'has-error': !!error
    }"
  >
    <div ref="markdownRef"/>
  </div>
  <div v-else-if="!!error">
    <pre>{{ error }}</pre>
  </div>
</template>

<script setup lang="ts">
import { preWrapperPlugin } from "@docs/.vitepress/theme/plugin/preWrapper";
import { highlightLinePlugin } from "@docs/.vitepress/theme/plugin/highlightLines";
import { lineNumberPlugin } from "@docs/.vitepress/theme/plugin/lineNumbers";
import { highlight } from "@docs/.vitepress/theme/plugin/highlight";
import MarkdownIt from "markdown-it-async";
import { onUnmounted, type Ref, ref, useSlots, watch, watchEffect } from "vue";
import morphdom from "morphdom";

const emit = defineEmits(['markdownUpdated'])

const slots = useSlots();
const markdown = ref("");
const markdownRef: Ref<HTMLDivElement | null> = ref(null);
const isLoading = ref(true);
const error = ref<Error | null>(null);

// Watch for markdown changes and apply them efficiently
watch(markdown, (newMarkdown) => {
  if (!markdownRef.value) return;

  if (newMarkdown) {
    // Use morphdom to efficiently update only changed parts
    morphdom(markdownRef.value, newMarkdown);
  } else {
    markdownRef.value.innerHTML = '';
  }

  emit("markdownUpdated");
});

// Setup syntax highlighting
let highlightFnSet = false;
let [highlightFn, dispose]: [(str: string, lang: string, attrs: string) => Promise<string>, () => void] = [async () => "", () => {}];

async function renderMarkdown() {
  // Reset state
  isLoading.value = true;
  error.value = null;

  try {
    // Get slot content
    const nodes = slots.default?.();
    if (!nodes || nodes.length === 0) {
      isLoading.value = false;
      markdown.value = "";
      return;
    }

    // Extract text content
    const content = nodes
      .map((child) => {
        // If the child is a text node, return its text
        if (typeof child.children === "string") {
          return child.children;
        }

        // If it's not a text node, throw an error
        throw new Error("Only text content is allowed");
      })
      .join("");

    if (!highlightFnSet) {
      highlightFnSet = true;
      [highlightFn, dispose] = await highlight(
        { light: "github-light", dark: "github-dark" },
        {},
        console
      );
    }

    // Configure Markdown renderer
    const md = MarkdownIt("default", {
      html: true,
      linkify: true,
      highlight: highlightFn
    });

    // Add plugins
    md.use(highlightLinePlugin);
    md.use(preWrapperPlugin);
    md.use(lineNumberPlugin);

    // Render markdown
    isLoading.value = false;
    markdown.value = await md.renderAsync(content);
  } catch (exception) {
    error.value = exception instanceof Error ? exception : new Error("Unknown markdown rendering error");
    isLoading.value = false;
    markdown.value = "";
  } finally {
    isLoading.value = false;
  }
}

// Initial render and re-render on slot changes
watchEffect(renderMarkdown);

onUnmounted(() => {
  console.log("unmounted");
  dispose();
})
</script>

<style scoped>
.markdown-content {
  overflow: auto;
}
</style>
