<template>
  <div class="relative bg-neutral-100 py-16 pt-0 lg:py-24 lg:pt-16" @mouseover="stopInterval" @mouseleave="startInterval">
    <NolusContainer class="relative z-10 overflow-hidden">
        <div class="flex flex-col lg:flex-row justify-stretch gap-y-12 gap-x-12 w-full">
          <div class="lg:basis-56 shrink-0 border-b border-neutral-200/50 lg:border-b-0 pb-2">
            <ul class="p-4 items-center justify-center md:justify-start md:static md:w-auto lg:items-stretch flex gap-x-2 lg:flex-col flex-wrap gap-y-2 md:gap-y-3 text-neutral-80">
              <li v-for="(tab, index) in tabs" :key="index" class=" text-base md:text-xl font-medium px-2 md:px-4 py-2 md:py-2 rounded-xl md:rounded-full cursor-pointer hover:bg-neutral-200/40 transition-all" :class="{ 'active bg-white shadow-xl text-blue-600 hover:bg-white': activeTab === index }" @click="setActiveTab(index)" @mouseover="stopInterval" @mouseout="startInterval">
                <button><component :is="tab.tabIcon" fill="#ffcc00" alt="" class="inline-block icon w-7 md:w-9" aria-hidden="true" /> {{ tab.tabName }}</button>
              </li>
            </ul>
          </div>
          <div class="w-full relative transition-all" ref="tabsContainer">
            <div v-for="(tab, index) in tabs" :key="index" class="absolute w-full">
              <div v-if="activeTab === index">
                <div class="md:w-3/5" v-motion :initial="{ opacity: 0}" :enter="{ opacity: 1, scale: 1, transition: {duration: 600} }" :leave="{ opacity: 0}">
                  <h2 class="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl" aria-hidden="true">{{ tab.heading }}</h2>
                  <p class="mt-6 text-lg leading-8 text-neutral-600">{{ tab.content }}</p>
                  <Button :link="tab.buttonLink" class="mt-5">Get the Nolus dApp</Button>
                </div>
                <img ref="imgRef" :src="tab.tabImage" alt="" class="block mt-8 sm:mt-0 md:absolute md:w-2/5 w-10/12 mx-auto md:mb-0 -z-10 -right-8 top-0" aria-hidden="true" v-motion :initial="{ opacity: 0}" :enter="{ opacity: 1, scale: 1, transition: {duration: 600} }" :leave="{ opacity: 0}" />
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
    tabImage: LeaseImage,
    buttonLink: '#',
  },
  {
    tabName: 'Earn',
    tabIcon: EarnIcon,
    heading: 'Earn #RealYield on Your Idle Assets',
    content: 'Lend your idle assets for sustainable high-yield returns that vary between 8-12% APY, no matter the market conditions',
    tabImage: EarnImage,
    buttonLink: '#',
  },
  {
    tabName: 'Swap',
    tabIcon: SwapIcon,
    heading: 'Seamless Cross-Chain Swaps',
    content: 'Effortlessly exchange various assets without the hassle and complexity of bridging across chains',
    tabImage: SwapImage,
    buttonLink: '#',
  },
  {
    tabName: 'Delegate',
    tabIcon: DelegateIcon,
    heading: 'One-Click NLS Token Delegation',
    content: 'Skip the research, trust Nolus to select the best validator, and easily enjoy the rewards of participating in the Nolus blockchain',
    tabImage: DelegateImage,
    buttonLink: '#',
  },
  {
    tabName: 'Govern',
    tabIcon: GovernIcon,
    heading: 'Help Shape the Future of Nolus',
    content: 'Cast your vote and exert your influence to guide the future development and trajectory of the Protocol',
    tabImage: GovernImage,
    buttonLink: '#',
  },
]

let activeTab = ref(0); // Initialize activeTab to 0
let tabsContainer = ref(null);
let imgRef = ref(null);
let intervalId, observer;

const setActiveTab = async (index) => {
  activeTab.value = index;

  await nextTick(); // Wait for the DOM to update

  const activeTabElement = tabsContainer.value.children[index];
  const img = activeTabElement.querySelector('img');

  img.onload = () => {
    tabsContainer.value.style.height = `${activeTabElement.scrollHeight}px`;
  };

  if (img.complete) {
    tabsContainer.value.style.height = `${activeTabElement.scrollHeight}px`;
  }
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

  const activeTabElement = tabsContainer.value.children[activeTab.value];
  const img = activeTabElement.querySelector('img');

  img.onload = () => {
    tabsContainer.value.style.height = `${activeTabElement.scrollHeight}px`;
  };

  if (img.complete) {
    tabsContainer.value.style.height = `${activeTabElement.scrollHeight}px`;
  }

  // Create a new Intersection Observer
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // startInterval();
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