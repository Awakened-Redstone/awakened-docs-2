<script lang="ts" setup>
import VPNavScreenMenuLink from "vitepress/dist/client/theme-default/components/VPNavScreenMenuLink.vue";
import VPNavScreenMenuGroup from "vitepress/dist/client/theme-default/components/VPNavScreenMenuGroup.vue";

import { useNav } from "../util/nav";

const nav = useNav();
</script>

<template>
  <nav v-if="nav.length" class="VPNavScreenMenu">
    <template v-for="item in nav" :key="JSON.stringify(item)">
      <VPNavScreenMenuLink v-if="'link' in item" :item="item" />
      <component
        :is="item.component"
        v-else-if="'component' in item"
        v-bind="item.props"
        screen-menu
      />
      <VPNavScreenMenuGroup v-else :text="item.text || ''" :items="item.items" />
    </template>
  </nav>
</template>
