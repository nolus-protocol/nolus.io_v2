<template>
  <Teleport to="body">
    <Transition
      name="fade"
    >
      <div
        v-if="show"
        ref="modal"
        class="fixed bottom-0 left-0 right-0 top-0 z-[999999999] flex justify-center items-start bg-neutral-600/80 backdrop-blur-sm"
        style="-webkit-overflow-scrolling: touch;"
        @keydown.esc="onModalClose"
        @click="onModalClose"
        >
        <button
          class="bg-white fixed right-5 top-5 z-[5] rounded-full p-2 border hover:bg-neutral-100 transition-all"
          @click="onModalClose"
        >
          <XMarkIcon class="inline-block w-8 h-8 z-[5]" />
        </button>
        <div 
          class="overflow-scroll h-full py-12 w-full"
          :class="variant==='video' && 'flex justify-center items-center'" 
          v-motion 
          :initial="{ opacity: 0, y: 100 }" 
          :enter="{ opacity: 1, y: 0, scale: 1, transition: {duration: 400}}"
          :leave="{ opacity: 0, y: 100, scale: 0, transition: {duration: 400}}"
          >
          <div class="mx-auto flex w-full  flex-col justify-start items-center md:rounded-xl overflow-clip bg-white shadow-xl relative" :class="[ width, variant !== 'video' && 'p-12' ]" @click.stop>
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
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script lang="ts" setup>
import { onMounted, nextTick, onUnmounted, provide, watch, defineProps, ref, watchEffect } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const modal = ref(null);
let previousActiveElement, focusableElements, firstFocusableElement, lastFocusableElement;

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
    previousActiveElement = document.activeElement;
    nextTick(() => {
      focusableElements = modal.value.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusableElement = focusableElements[0];
      lastFocusableElement = focusableElements[focusableElements.length - 1];
      firstFocusableElement.focus();
    });
  } else if (previousActiveElement) {
    nextTick(() => {
      previousActiveElement.focus();
    });
  }
});

const trapFocus = (event) => {
  if (props.show && event.key === 'Tab') {
    if (event.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    }
  }
};

onMounted(() => {
  document.addEventListener("keyup", escapeClicked);
  document.addEventListener('keydown', trapFocus);
});

watch(
  () => props.show,
  (newValue) => {
    document.body.style.overflowY = newValue ? "hidden" : "";
  }
);

onUnmounted(() => {
  document.removeEventListener("keyup", escapeClicked);
  document.removeEventListener('keydown', trapFocus);
});

provide("onModalClose", onModalClose);
defineExpose({ onModalClose })
</script>