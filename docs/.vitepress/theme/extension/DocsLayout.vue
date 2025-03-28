<template>
  <Layout>
    <template #doc-before>
      <div v-if="data.version !== 'latest'" class="vp-doc">
        <div class="danger markdown-alert">
          <p class="markdown-alert-title">
            <OctogonAlertIcon />
            OUTDATED VERSION
          </p>
          <p>
            You are viewing the documentation for an older {{ data.docs.name }} version
            <br />
            <a :href="'/' + data.docs.path + data.path">Click here to go to the latest version</a>
          </p>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { useRoute } from "vitepress";
import { OctogonAlertIcon } from "@src/assets";
import _docsData from "@/docs.json";
import type { DocsData } from "@/.vitepress/types";
import { computed } from "vue";

const semver =
  "(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?";
const docsData: DocsData = _docsData;

const { Layout } = DefaultTheme;

const route = useRoute();

const data = computed(() => {
  for (const docs in docsData) {
    const regex = new RegExp(String.raw`^(/?${docsData[docs].path})(/${semver})?(.*)$`);

    const match = route.path.match(regex);
    if (match && match.length > 0) {
      return {
        docs: docsData[docs],
        version: (match[2] ?? "/latest").slice(1),
        latest: docsData[docs].versions.latest,
        path: match[8]
      };
    }
  }

  return {};
});
</script>

<style scoped></style>
