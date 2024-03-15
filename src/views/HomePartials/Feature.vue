<template>
  <div @mouseenter="play" @mouseleave="stop">
    <div ref="animationRef" class=" w-[100px] h-[100px]"></div>
    <h3
      class="text-3xl mt-8 font-bold tracking-tight text-neutral-900 sm:text-2xl mb-3"
    >
      {{ name }}
    </h3>
    <p class="text-md leading-7 text-neutral-800">
      {{ description }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Lottie, { type AnimationItem } from "lottie-web";

let animation: AnimationItem | null = null;
const animationRef = ref();

const props = defineProps({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
  },
  href: {
    type: String,
  },
});

onMounted(() => {
  animation = Lottie.loadAnimation({
    container: animationRef.value,
    renderer: "svg",
    loop: true,
    autoplay: false,
    path: props.icon,
  });
});

function play() {
  animation!.play();
}

function stop() {
  animation!.stop();
}
</script>
<style lang="scss">
</style>
