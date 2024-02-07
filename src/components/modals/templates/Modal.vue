<template>
  <Teleport to="body">
    <Transition
      name="fade"
    >
      <div
        v-if="show"
        class="fixed bottom-0 left-0 right-0 top-0 z-[999999999] flex justify-center items-start bg-neutral-600/80 backdrop-blur-sm"
        style="-webkit-overflow-scrolling: touch;"
        @keydown.esc="onModalClose"
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
          <div class="mx-auto flex w-full  flex-col justify-start items-center md:rounded-xl overflow-clip bg-white shadow-xl relative" :class="[ width, variant !== 'video' && 'py-10 px-12' ]">
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
import { onMounted, onUnmounted, provide, ref, nextTick, defineProps } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";

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

onMounted(() => {
  props.show && (document.body.style.overflowY = "hidden");
  document.addEventListener("keyup", escapeClicked);
});

onUnmounted(() => {
  document.removeEventListener("keyup", escapeClicked);
});

provide("onModalClose", onModalClose);
defineExpose({ onModalClose })
</script>