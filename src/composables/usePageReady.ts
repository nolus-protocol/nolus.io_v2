import { ref } from 'vue';

// Shared state for page readiness (color sampling complete)
// Start as true for pages without video (like Governance)
const pageReady = ref(true);
let hasVideo = false;

export function usePageReady() {
  const initVideoPage = () => {
    // Mark that this page has a video, so it should wait for color sampling
    if (!hasVideo) {
      hasVideo = true;
      pageReady.value = false;
    }
  };

  const setPageReady = () => {
    pageReady.value = true;
    // Add 'ready' class to #app for CSS transition
    const app = document.getElementById('app');
    if (app) {
      app.classList.add('ready');
    }
  };

  const resetPageReady = () => {
    hasVideo = false;
    pageReady.value = true;
  };

  return {
    pageReady,
    setPageReady,
    initVideoPage,
    resetPageReady
  };
}
