<template>
  <div class="relative bg-neutral-100 py-16 pt-0 lg:py-24 lg:pt-16" @mouseover="stopInterval" @mouseleave="startInterval">
    <NolusContainer class=" ">
      <div class="mb-8">
          <p class="text-base font-medium leading-7 text-blue-600" aria-hidden="true">Some subtitle</p>
          <h2 class="mt-2 text-3xl font-bold tracking-tight text-neutral-900 lg:text-5xl" aria-hidden="true">Our product</h2>
      </div>
      <div class="bg-white overflow-hidden rounded-2xl shadow-xl relative z-10">
        <div class="flex flex-col lg:flex-row justify-stretch w-full">
          <div class="shrink-0 border-b border-neutral-200/50 lg:border-b-0 lg:border-r bg-neutral-50 py-3 lg:py-12 lg:px-8">
            <ul class="p-4 items-center justify-center md:justify-start md:static md:w-auto lg:items-stretch flex gap-x-2 lg:flex-col flex-wrap gap-y-2 md:gap-y-3 text-neutral-80 ">
              <li v-for="(tab, index) in tabs" :key="index" class="text-base md:text-xl font-medium px-2 md:px-4 py-2 md:py-2 rounded-full cursor-pointer hover:bg-neutral-200/40 transition-all" :class="{ 'active bg-white shadow-xl text-blue-600 hover:bg-white': activeTab === index }" @click="setActiveTab(index)" @mouseover="stopInterval" @mouseout="startInterval">
                <button><component :is="tab.tabIcon" fill="#ffcc00" alt="" class="inline-block icon w-7 md:w-9" aria-hidden="true" /> {{ tab.tabName }}</button>
              </li>
            </ul>
          </div>
          <div class="px-8 py-8 md:px-16 md:py-10 flex items-center">
            <div ref="tabsContainer" class="transition-all duration-400 overflow-hidden">
              <div v-for="(tab, index) in tabs" :key="index">
                <div v-if="activeTab === index" class="flex flex-col md:flex-row items-center transition-all">
                    <div class="md:w-1/2" v-motion :initial="{ opacity: 0}" :enter="{ opacity: 1, scale: 1, transition: {duration: 600} }" :leave="{ opacity: 0}">
                      <h2 class="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl" aria-hidden="true">{{ tab.heading }}</h2>
                      <p class="mt-6 text-lg leading-8 text-neutral-600">{{ tab.content }}</p>
                    </div>
                    <img ref="imgRef" :src="tab.tabImage" alt="" class="w-8/12 md:w-2/5 lg:w-6/12 md:ml-auto" aria-hidden="true" v-motion :initial="{ opacity: 0}" :enter="{ opacity: 1, scale: 1, transition: {duration: 600} }" :leave="{ opacity: 0}" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </NolusContainer>
  </div>
</template>

<style scoped>
.icon {
  @apply fill-neutral-700;
}
.active .icon {
  @apply fill-blue-600;
}
</style>
<script setup>
import { ref, onMounted, onUnmounted, onBeforeUnmount, nextTick, reactive } from 'vue';
import Button from '@/components/Button.vue'
import NolusContainer from '@/components/NolusContainer.vue'
import SquareArrowTopRightIcon from '@/assets/icons/square-arrow-top-right-2.svg';
import LeaseIcon from '@/assets/icons/lease.svg'
import SwapIcon from '@/assets/icons/swap.svg'
import EarnIcon from '@/assets/icons/earn.svg'
import DelegateIcon from '@/assets/icons/delegate.svg'
import GovernIcon from '@/assets/icons/govern.svg'
import LeaseImage from '../../assets/images/product-value-propositions/lease.webp'
import EarnImage from '../../assets/images/product-value-propositions/earn.webp'
import SwapImage from '../../assets/images/product-value-propositions/swap.webp'
import DelegateImage from '../../assets/images/product-value-propositions/delegate.webp'
import GovernImage from '../../assets/images/product-value-propositions/govern.webp'

const tabs = [
  {
    tabName: 'Lease',
    tabIcon: LeaseIcon,
    heading: 'Maximize Your Assets Potential',
    content: 'Secure up to 150% leverage and gain exclusive access to leveraged assets through whitelisted strategies',
    tabImage: LeaseImage
  },
  {
    tabName: 'Earn',
    tabIcon: EarnIcon,
    heading: 'Earn #RealYield on Your Idle Assets',
    content: 'Lend your idle assets for sustainable high-yield returns that vary between 8-12% APY, no matter the market conditions',
    tabImage: EarnImage
  },
  {
    tabName: 'Swap',
    tabIcon: SwapIcon,
    heading: 'Seamless Cross-Chain Swaps',
    content: 'Effortlessly exchange various assets without the hassle and complexity of bridging across chains',
    tabImage: SwapImage
  },
  {
    tabName: 'Delegate',
    tabIcon: DelegateIcon,
    heading: 'One-Click NLS Token Delegation',
    content: 'Skip the research, trust Nolus to select the best validator, and easily enjoy the rewards of participating in the Nolus blockchain',
    tabImage: DelegateImage
  },
  {
    tabName: 'Govern',
    tabIcon: GovernIcon,
    heading: 'Help Shape the Future of Nolus',
    content: 'Cast your vote and exert your influence to guide the future development and trajectory of the Protocol',
    tabImage: GovernImage
  },
]

let activeTab = ref(0); // Initialize activeTab to 0
let previousTabHeight = ref(0); // Initialize the height of the previously selected tab
let tabsContainer = ref(null);
let imgRef = ref(null);
let intervalId, observer;
let loading = ref(false);

const updateHeight = (activeTabElement) => {
  tabsContainer.value.style.height = `${activeTabElement.scrollHeight}px`;
  previousTabHeight.value = activeTabElement.scrollHeight;
};

const initHeightUpdate = (index) => {
  const activeTabElement = tabsContainer.value.children[index];
  const img = new Image();
  img.src = tabs[index].tabImage;
  img.onload = () => updateHeight(activeTabElement);
  img.complete && updateHeight(activeTabElement);
};

const setActiveTab = async (index) => {
  loading.value = true; // Start loading
  activeTab.value = index;

  await nextTick(); // Wait for the DOM to update
  initHeightUpdate(index); // Initialize tab height update
};

// Start timer to cycle through tabs automatically
const startInterval = () => {
  intervalId = setInterval(() => {
    activeTab.value = (activeTab.value + 1) % tabs.length;
  }, 5000);
};

// Stop the timer
const stopInterval = () => {
  clearInterval(intervalId);
};

onMounted(async () => {
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

  observer.observe(tabsContainer.value);
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