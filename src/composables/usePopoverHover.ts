import { ref } from 'vue';

// Shared state to track which popover is currently active
const activePopoverId = ref<string | null>(null);
let closeTimeout: ReturnType<typeof setTimeout> | null = null;

const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;

export function usePopoverHover(popoverId: string) {
  const buttonRef = ref<{ el: HTMLButtonElement; $el: HTMLButtonElement } | null>(null);

  const onMouseEnter = () => {
    if (!isDesktop()) return;
    
    // Clear any pending close timeout
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }
    
    // Set this popover as active
    activePopoverId.value = popoverId;
    
    const btn = buttonRef.value?.$el || buttonRef.value?.el;
    if (btn && !btn.getAttribute('aria-expanded')?.includes('true')) {
      btn.click();
    }
  };

  const onMouseLeave = (close: () => void) => {
    if (!isDesktop()) return;
    
    closeTimeout = setTimeout(() => {
      // Only close if this popover is still the active one
      // (prevents closing when moving to another popover)
      if (activePopoverId.value === popoverId) {
        activePopoverId.value = null;
        close();
      }
    }, 100);
  };

  return {
    buttonRef,
    onMouseEnter,
    onMouseLeave
  };
}
