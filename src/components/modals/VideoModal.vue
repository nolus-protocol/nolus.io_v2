<template>
  <iframe class="w-full h-full max-w-full max-h-full" 
          :style="{ height: videoDimensions.height + 'px' }"
          src="https://www.youtube.com/embed/k7QWPR0052g?si=bSgbKCpzBHSTLbXK" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen 
          ref="iframeElement">
  </iframe>
  
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';

const iframeElement = ref(null);
let videoDimensions = reactive({width: 0, height: 0});

onMounted(() => {
  videoDimensions.width = iframeElement.value.offsetWidth;
  videoDimensions.height = videoDimensions.width / 1.78;
});
</script>