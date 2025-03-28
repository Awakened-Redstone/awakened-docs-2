<template v-slot="slot">
  <div
    v-html="markdown"
    v-if="!error"
    :class="{
      'markdown-content': true,
      'is-loading': isLoading,
      'has-error': !!error
    }"
  />
<!--  <div v-else-if="isLoading">
    Loading
  </div>-->
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
import { ref, useSlots, watchEffect } from "vue";

const slots = useSlots();
const markdown = ref("");
const isLoading = ref(true);
const error = ref<Error | null>(null);

async function renderMarkdown() {
  // Reset state
  isLoading.value = true;
  error.value = null;

  try {
    // Get slot content
    const nodes = slots.default?.();
    if (!nodes || nodes.length === 0) {
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

    // Setup syntax highlighting
    const [highlightFn] = await highlight(
      { light: "github-light", dark: "github-dark" },
      {},
      console
    );

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
    markdown.value = await md.renderAsync(content);
  } catch (exception) {
    error.value = exception instanceof Error ? exception : new Error("Unknown markdown rendering error");
    markdown.value = "";
  } finally {
    isLoading.value = false;
  }
}

// Initial render and re-render on slot changes
watchEffect(renderMarkdown);
</script>

<style scoped></style>
