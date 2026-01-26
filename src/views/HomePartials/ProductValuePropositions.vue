<template>
  <div
    class="relative bg-neutral-100 py-16 pt-0 lg:py-24 lg:pt-16"
    @mouseover="stopInterval"
    @mouseleave="startInterval"
  >
    <NolusContainer class=" ">
      <div class="mb-8">
        <p
          class="text-base font-medium leading-7 text-blue-600"
          aria-hidden="true"
        >
          {{ $t('home_productLabel') }}
        </p>
        <h2
          class="mt-2 text-3xl font-bold tracking-tight text-neutral-900 lg:text-5xl"
          aria-hidden="true"
        >
        {{ $t('home_productHeading') }}
        </h2>
      </div>
      <div class="relative z-10 overflow-hidden rounded-2xl bg-white shadow-xl">
        <div class="flex w-full flex-col justify-stretch lg:flex-row">
          <div
            class="shrink-0 border-b border-neutral-200/50 bg-neutral-50 py-3 lg:border-b-0 lg:border-r lg:px-8 lg:py-12"
          >
            <ul
              role="tablist"
              aria-label="Product features"
              class="text-neutral-80 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 p-4 md:static md:w-auto md:justify-start md:gap-y-3 lg:flex-col lg:items-stretch"
            >
              <li
                v-for="(tab, index) in tabs"
                :key="index"
                role="presentation"
              >
                <button
                  role="tab"
                  :id="`tab-${index}`"
                  :aria-selected="activeTab === index"
                  :aria-controls="`tabpanel-${index}`"
                  :tabindex="activeTab === index ? 0 : -1"
                  class="flex w-full cursor-pointer items-center rounded-full px-2 py-2 text-base font-medium transition-all hover:bg-neutral-200/40 md:px-4 md:py-2 md:text-xl"
                  :class="{ 'active bg-white text-blue-600 shadow-xl hover:bg-white': activeTab === index }"
                  @click="setActiveTab(index)"
                  @mouseover="stopInterval"
                  @mouseout="startInterval"
                  @keydown.arrow-right.prevent="setActiveTab((index + 1) % tabs.length)"
                  @keydown.arrow-left.prevent="setActiveTab((index - 1 + tabs.length) % tabs.length)"
                  @keydown.home.prevent="setActiveTab(0)"
                  @keydown.end.prevent="setActiveTab(tabs.length - 1)"
                >
                  <component
                    :is="tab.tabIcon"
                    fill="#ffcc00"
                    class="icon inline-block w-7 md:w-9"
                    aria-hidden="true"
                  />
                  <span class="ml-2">{{ tab.tabName }}</span>
                </button>
              </li>
            </ul>
          </div>
          <div class="flex items-center px-8 py-8 md:px-16 md:py-10">
            <div
              ref="tabsContainer"
              class="duration-400 overflow-hidden transition-all"
            >
              <div
                v-for="(tab, index) in tabs"
                :key="index"
                role="tabpanel"
                :id="`tabpanel-${index}`"
                :aria-labelledby="`tab-${index}`"
                :hidden="activeTab !== index"
              >
                <div
                  v-if="activeTab === index"
                  class="flex flex-col items-center transition-all md:flex-row"
                >
                  <div
                    class="md:w-1/2"
                    v-motion
                    :initial="{ opacity: 0 }"
                    :enter="{ opacity: 1, scale: 1, transition: { duration: 600 } }"
                    :leave="{ opacity: 0 }"
                  >
                    <h2
                      class="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl"
                      aria-hidden="true"
                    >
                      {{ tab.heading }}
                    </h2>
                    <p class="mt-6 text-lg leading-8 text-neutral-600">{{ tab.content }}</p>
                  </div>
                  <div class="relative w-8/12 md:ml-auto md:w-2/5 lg:w-6/12">
                    <img
                      ref="imgRef"
                      :src="tab.tabImage"
                      alt=""
                      :loading="index === 0 ? 'eager' : 'lazy'"
                      class="h-auto w-full animate-float"
                      :class="{ 'opacity-0 transition-opacity duration-200': !imageLoaded[index], 'opacity-100': imageLoaded[index] }"
                      aria-hidden="true"
                      @load="onImageLoad(index)"
                      v-motion
                      :initial="{ opacity: 0 }"
                      :enter="{ opacity: 1, scale: 1, transition: { duration: 600 } }"
                      :leave="{ opacity: 0 }"
                    />
                    <div 
                      v-if="!imageLoaded[index]"
                      class="absolute inset-0 animate-pulse rounded-lg bg-neutral-200"
                      aria-hidden="true"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NolusContainer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, onBeforeUnmount, nextTick } from "vue";
import NolusContainer from "@/components/NolusContainer.vue";
import { ANIMATION_TIMINGS } from "@/constants/animations";
import CompatibleIcon from "@/assets/icons/compatible.svg";
import CrosschainIcon from "@/assets/icons/cross-chain.svg";
import EffortlessIcon from "@/assets/icons/effortless.svg";
import FlexibleIcon from "@/assets/icons/flexible.svg";
import PersonalizedIcon from "@/assets/icons/personalized.svg";
import CompatibleImage from "../../assets/images/product-value-propositions/compatible.webp";
import CrosschainImage from "../../assets/images/product-value-propositions/cross-chain.webp";
import EfortlessImage from "../../assets/images/product-value-propositions/effortless.webp";
import FlexibleImage from "../../assets/images/product-value-propositions/flexible.webp";
import PersonalizedImage from "../../assets/images/product-value-propositions/personalized.webp";
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });

const tabs = [
  {
    tabName: t('home_productTabEffortless'),
    tabIcon: EffortlessIcon,
    heading: t('home_productTabEffortlessHeading'),
    content: t('home_productTabEffortlessDesc'),
    tabImage: EfortlessImage
  },
  {
    tabName: t('home_productTabCompatible'),
    tabIcon: CompatibleIcon,
    heading: t('home_productTabCompatibleHeading'),
    content: t('home_productTabCompatibleDesc'),
    tabImage: CompatibleImage
  },
  {
    tabName: t('home_productTabPersonalized'),
    tabIcon: PersonalizedIcon,
    heading: t('home_productTabPersonalizedHeading'),
    content: t('home_productTabPersonalizedDesc'),
    tabImage: PersonalizedImage
  },
  {
    tabName: t('home_productTabFlexible'),
    tabIcon: FlexibleIcon,
    heading: t('home_productTabFlexibleHeading'),
    content: t('home_productTabFlexibleDesc'),
    tabImage: FlexibleImage
  },
  {
    tabName: t('home_productTabCrossChain'),
    tabIcon: CrosschainIcon,
    heading: t('home_productTabCrossChainHeading'),
    content: t('home_productTabCrossChainDesc'),
    tabImage: CrosschainImage
  }
];

const activeTab = ref(0); // Initialize activeTab to 0
const previousTabHeight = ref(0); // Initialize the height of the previously selected tab
const tabsContainer = ref<HTMLElement | null>(null);
const imgRef = ref(null);
let intervalId: NodeJS.Timeout, observer: IntersectionObserver;
const loading = ref(false);
const imageLoaded = ref<Record<number, boolean>>({});

const onImageLoad = (index: number) => {
  imageLoaded.value[index] = true;
  // Recalculate height after image loads
  if (activeTab.value === index) {
    nextTick(() => {
      if (tabsContainer.value) {
        const activeTabElement = tabsContainer.value.children[index];
        updateHeight(activeTabElement);
      }
    });
  }
};

const updateHeight = (activeTabElement: Element) => {
  if (tabsContainer.value) {
    tabsContainer.value.style.height = `${activeTabElement.scrollHeight}px`;
    previousTabHeight.value = activeTabElement.scrollHeight;
  }
};

const initHeightUpdate = (index: number) => {
  if (tabsContainer.value) {
    const activeTabElement = tabsContainer.value.children[index];
    // If image is already loaded, update height immediately
    if (imageLoaded.value[index]) {
      updateHeight(activeTabElement);
    } else {
      // Otherwise, set a temporary height and wait for image to load
      const img = new Image();
      img.src = tabs[index].tabImage;
      img.onload = () => updateHeight(activeTabElement);
      if (img.complete) {
        imageLoaded.value[index] = true;
        updateHeight(activeTabElement);
      }
    }
  }
};

const setActiveTab = async (index: number) => {
  loading.value = true; // Start loading
  activeTab.value = index;

  await nextTick(); // Wait for the DOM to update
  initHeightUpdate(index); // Initialize tab height update
};

// Start timer to cycle through tabs automatically
const startInterval = () => {
  intervalId = setInterval(() => {
    activeTab.value = (activeTab.value + 1) % tabs.length;
  }, ANIMATION_TIMINGS.TAB_AUTO_ROTATE);
};

// Stop the timer
const stopInterval = () => {
  clearInterval(intervalId);
};

onMounted(async () => {
  // Preload all images
  tabs.forEach((tab, index) => {
    const img = new Image();
    img.src = tab.tabImage;
    img.onload = () => {
      imageLoaded.value[index] = true;
      // Update height for active tab when its image loads
      if (index === activeTab.value) {
        initHeightUpdate(index);
      }
    };
    if (img.complete) {
      imageLoaded.value[index] = true;
    }
  });

  await nextTick(); // Wait for the DOM to update
  initHeightUpdate(0); // Initialize tab height update

  // Create a new Intersection Observer
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startInterval();
      } else {
        stopInterval();
      }
    });
  });

  observer.observe(tabsContainer.value as HTMLElement);
});

onBeforeUnmount(() => {
  // Stop observing the section
  if (observer) {
    observer.disconnect();
  }

  // Stop the interval
  stopInterval();
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.icon {
  @apply fill-neutral-700;
}
.active .icon {
  @apply fill-blue-600;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-float {
  animation: float 5s ease-in-out infinite;
}
</style>
