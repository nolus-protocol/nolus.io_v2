<template>
  <iframe
    class="h-full max-h-full w-full max-w-full bg-white"
    :style="{ height: videoDimensions.height + 'px' }"
    src="https://www.youtube.com/embed/k7QWPR0052g?si=bSgbKCpzBHSTLbXK"
    :title="$t('modal_videoTitle')"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    ref="iframeElement"
  >
  </iframe>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";

const iframeElement = ref<HTMLElement | null>(null);
let videoDimensions = reactive({ width: 0, height: 0 });

onMounted(() => {
  if(iframeElement.value){
    videoDimensions.width = iframeElement.value.offsetWidth;
    videoDimensions.height = videoDimensions.width / 1.78;
  }
});
</script>
