<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="show"
        ref="modal"
        class="fixed bottom-0 left-0 right-0 top-0 z-[999999999] flex items-start justify-center bg-neutral-600/80 backdrop-blur-sm items-center"
        @keydown.esc="onModalClose"
        @click="onModalClose"
      >
        <button
          class="fixed right-5 top-5 z-[5] rounded-full border bg-white p-2 transition-all hover:bg-neutral-100"
          @click="onModalClose"
        >
          <XMarkIcon class="z-[5] inline-block h-8 w-8" />
        </button>
        <div
          class="mt-0 lg:mt-12 h-full w-full max-w-3xl overflow-hidden bg-white md:rounded-xl lg:h-[85vh] mb-0 lg:mb-12"
          :class="variant === 'video' && 'flex items-center justify-center lg:h-auto h-auto lg:mt-[0px] bg-transparent'"
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 100 } }"
          :leave="{ opacity: 0, y: 100, transition: { duration: 100 } }"
        >
          <div
            class="scroll relative h-full w-full overflow-y-auto break-all p-8 lg:p-12 shadow-xl"
            :class="[width, variant === 'video' && 'p-0 flex items-center p-[0px]']"
            @click.stop
          >
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script lang="ts" setup>
import { onMounted, nextTick, onUnmounted, provide, watch, defineProps, ref, watchEffect } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const modal = ref<HTMLElement | null>(null);
let previousActiveElement: HTMLElement | null,
  focusableElements: NodeListOf<HTMLElement> | undefined,
  firstFocusableElement: HTMLElement | undefined,
  lastFocusableElement: HTMLElement | undefined;

const emit = defineEmits(["close-modal"]);
const props = defineProps({
  show: Boolean,
  variant: String,
  width: {
    type: String,
    default: "max-w-3xl"
  }
});

const onModalClose = () => {
  emit("close-modal");
};

const escapeClicked = (event: KeyboardEvent) => {
  if (event.key == "Escape") {
    onModalClose();
  }
};

watchEffect(() => {
  if (props.show) {
    previousActiveElement = document.activeElement as HTMLElement;
    nextTick(() => {
      focusableElements = modal.value?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusableElement = focusableElements?.[0];
      lastFocusableElement = focusableElements?.[focusableElements.length - 1];
      firstFocusableElement?.focus();
    });
  } else if (previousActiveElement) {
    nextTick(() => {
      previousActiveElement?.focus();
    });
  }
});

const trapFocus = (event: KeyboardEvent) => {
  if (props.show && event.key === "Tab") {
    if (event.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement?.focus();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement?.focus();
      }
    }
  }
};

onMounted(() => {
  document.addEventListener("keyup", escapeClicked);
  document.addEventListener("keydown", trapFocus);
});

watch(
  () => props.show,
  (newValue) => {
    document.body.style.overflowY = newValue ? "hidden" : "";
  }
);

onUnmounted(() => {
  document.removeEventListener("keyup", escapeClicked);
  document.removeEventListener("keydown", trapFocus);
});

provide("onModalClose", onModalClose);
defineExpose({ onModalClose });
</script>

<style lang="scss">
.scroll::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f5f5f5;
}

/* Track */
.scroll::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

/* Handle */
.scroll::-webkit-scrollbar-thumb {
  background-color: #c1cad7;
  border: solid 1px white;
  border-radius: 4px;
}

/* Handle on hover */
.scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
