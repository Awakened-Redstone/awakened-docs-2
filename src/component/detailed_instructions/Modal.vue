<template>
  <div v-if="open">
    <div
      :class="{
        shown: visible
      }"
      class="modal-overlay"
      @click="() => (closeOnClickOutside && closable ? hide() : {})"
    />
    <div class="modal-container experimental-styles-within" :class="{ shown: visible }">
      <div class="modal-body flex flex-col justify-center rounded-2xl">
        <div class="z-[1] h-full w-full overflow-y-auto p-3 align-middle">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//import { XIcon } from '@modrinth/assets'
import { ref } from "vue";
//import ButtonStyled from '../base/ButtonStyled.vue'

const props = withDefaults(
  defineProps<{
    closable?: boolean;
    danger?: boolean;
    closeOnEsc?: boolean;
    closeOnClickOutside?: boolean;
    warnOnClose?: boolean;
    header?: string;
    onHide?: () => void;
    onShow?: () => void;
  }>(),
  {
    type: true,
    closable: true,
    danger: false,
    closeOnClickOutside: true,
    closeOnEsc: true,
    warnOnClose: false,
    header: undefined,
    onHide: () => {},
    onShow: () => {}
  }
);

const open = ref(false);
const visible = ref(false);

// make modal opening not shift page when there's a vertical scrollbar
function addBodyPadding() {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (scrollBarWidth > 0) {
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  } else {
    document.body.style.paddingRight = "";
  }
}

function show() {
  props.onShow();
  open.value = true;

  addBodyPadding();
  document.body.style.overflow = "hidden";
  window.addEventListener("keydown", handleKeyDown);
  setTimeout(() => {
    visible.value = true;
  }, 50);
}

function hide() {
  props.onHide();
  visible.value = false;
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  window.removeEventListener("keydown", handleKeyDown);
  setTimeout(() => {
    open.value = false;
  }, 300);
}

defineExpose({
  show,
  hide
});

function handleKeyDown(event: KeyboardEvent) {
  if (props.closeOnEsc && event.key === "Escape") {
    hide();
  }
}
</script>

<!--suppress CssUnresolvedCustomProperty -->
<style scoped>
.modal-overlay {
  position: fixed;
  inset: -5rem;
  z-index: 30;
  opacity: 0;
  transition: all 0.2s ease-out;
  background: color-mix(in srgb, var(--vp-sidebar-bg-color), transparent 20%);

  @media (prefers-reduced-motion) {
    transition: none !important;
  }

  &.shown {
    opacity: 1;
    visibility: visible;
    backdrop-filter: blur(5px);
  }

  &.noblur {
    backdrop-filter: none;
    filter: none;
  }
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 31;
  visibility: hidden;
  pointer-events: none;
  transform: translate(
    calc((-50vw + var(--_mouse-x, 50vw) * 1px) / 16),
    calc((-50vh + var(--_mouse-y, 50vh) * 1px) / 16)
  );
  transition: all 0.2s ease-out;

  &.shown {
    visibility: visible;
    transform: translate(0, 0);

    > .modal-body {
      opacity: 1;
      visibility: visible;
      scale: 1;
    }
  }

  > .modal-body {
    position: fixed;
    max-height: calc(100% - 2 * var(--gap-lg));
    max-width: min(var(--_max-width, 60rem), calc(100% - 2 * var(--gap-lg)));
    overflow-y: auto;
    overflow-x: hidden;
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    pointer-events: auto;

    visibility: hidden;
    opacity: 0;
    transition: all 0.2s ease-in-out;

    @media (prefers-reduced-motion) {
      transition: none !important;
    }

    @media screen and (max-width: 650px) {
      width: calc(100% - 2 * var(--gap-lg));
    }
  }
}
</style>
