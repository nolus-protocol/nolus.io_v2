<template>
  <div @mouseenter="play">
    <div
      ref="animationRef"
      class="h-[128px] w-[128px]"
    ></div>
    <h3 class="mb-3 mt-8 text-3xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
      {{ name }}
    </h3>
    <p class="text-md leading-7 text-neutral-800">
      {{ description }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import Lottie, { type AnimationItem } from "lottie-web";

let animation: AnimationItem | null = null;
let isCompleted = true;
const animationRef = ref();

const props = defineProps({
  name: {
    type: String
  },
  description: {
    type: String
  },
  icon: {
    type: String
  },
  href: {
    type: String
  }
});

onMounted(() => {
  animation = Lottie.loadAnimation({
    container: animationRef.value,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: props.icon
  });
  animation.addEventListener("complete", finished);
});

onUnmounted(() => {
  animation?.removeEventListener("complete", finished);
});

function play() {
  if (isCompleted) {
    animation!.goToAndPlay(0);
    isCompleted = false;
  }
}

function finished() {
  isCompleted = true;
}
</script>
<style lang="scss"></style>
