<script lang="ts" setup>
import VPNavBarMenuLink from "vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue";
import VPNavBarMenuGroup from "vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue";

import { useNav } from "../util/nav";

const nav = useNav();
</script>

<template>
  <nav v-if="nav.length" aria-labelledby="main-nav-aria-label" class="VPNavBarMenu">
    <span id="main-nav-aria-label" class="visually-hidden"> Main Navigation </span>
    <template v-for="item in nav" :key="JSON.stringify(item)">
      <VPNavBarMenuLink v-if="'link' in item" :item="item" />
      <component :is="item.component" v-else-if="'component' in item" v-bind="item.props" />
      <VPNavBarMenuGroup v-else :item="item" />
    </template>
  </nav>
</template>

<style scoped>
.VPNavBarMenu {
  display: none;
}

@media (min-width: 768px) {
  .VPNavBarMenu {
    display: flex;
  }
}
</style>
