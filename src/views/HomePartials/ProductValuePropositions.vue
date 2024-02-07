<template>
  <div class="relative bg-neutral-100 py-24 sm:py-32 border">
    <NolusContainer class="relative z-10">
        <div class="flex justify-stretch gap-x-12 w-full">
          <ul class="basis-48 shrink-0 flex flex-col gap-y-3 text-neutral-800">
            <li v-for="(tab, index) in tabs" :key="index" class="text-xl font-medium px-4 py-2 rounded-full cursor-pointer hover:bg-neutral-200/40 transition-all" :class="{ 'active bg-white shadow-xl text-blue-600 hover:bg-white': activeTab === index }" @click="setActiveTab(index)" @mouseover="stopInterval" @mouseout="startInterval">
              <component :is="tab.tabIcon" fill="#ffcc00" alt="" class="inline-block icon w-9" aria-hidden="true" /> {{ tab.tabName }}
            </li>
          </ul>
          <div class="w-full relative" ref="tabsContainer">
            <div v-for="(tab, index) in tabs" :key="index" class="absolute w-full">
                <div v-if="activeTab === index">
                  <div class="w-3/5" v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0, scale: 1, transition: {duration: 400} }" :leave="{ opacity: 0, y: 100 }">
                    <h2 class="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl" aria-hidden="true">{{ tab.heading }}</h2>
                    <p class="mt-6 text-lg leading-8 text-neutral-600">{{ tab.content }}</p>
                    <Button :link="tab.buttonLink" class="mt-5">Get the Nolus dApp</Button>
                  </div>
                  <img :src="tab.tabImage" alt="" class="absolute w-2/4 h-auto -z-10 -right-16 -top-10" aria-hidden="true" v-motion :initial="{ opacity: 0}" :enter="{ opacity: 1, scale: 1, transition: {duration: 600} }" :leave="{ opacity: 0}" />
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
import { ref, onMounted, onUnmounted, onBeforeUnmount, nextTick } from 'vue';
import Button from '@/components/Button.vue'
import NolusContainer from '@/components/NolusContainer.vue'
import LeaseIcon from '@/assets/icons/lease.svg'
import SwapIcon from '@/assets/icons/swap.svg'
import EarnIcon from '@/assets/icons/earn.svg'
import DelegateIcon from '@/assets/icons/delegate.svg'
import GovernIcon from '@/assets/icons/govern.svg'
import LeaseImage from '../../assets/images/product-value-propositions/lease.jpg'

const tabs = [
  {
    tabName: 'Lease',
    tabIcon: LeaseIcon,
    heading: 'Unlocking the Full Potential of Your Assets',
    content: 'Lease up to an impressive 150% on your initial investments and gain exclusive access to the leveraged assets via whitelisted strategies.',
    tabImage: LeaseImage,
    buttonLink: '#',
  },
  {
    tabName: 'Earn',
    tabIcon: EarnIcon,
    heading: 'Earn real yield on your idle assets by lending them through Nolus',
    content: 'Experience profitable cash-based returns without the risk of impermanent loss. Enjoy the flexibility of easy top-ups and withdrawals',
    tabImage: LeaseImage,
    buttonLink: '#',
  },
  {
    tabName: 'Swap',
    tabIcon: SwapIcon,
    heading: 'On the fly cross-chain swaps',
    content: 'Quick and efficient cross-chain swaps without the hassle and complexity of bridging across chains. Experience instant, seamless trading with the freedom to exchange various assets effortlessly',
    tabImage: LeaseImage,
    buttonLink: '#',
  },
  {
    tabName: 'Delegate',
    tabIcon: DelegateIcon,
    heading: 'Effortless NLS Delegation with One Click',
    content: 'No need for extensive research to find the best validator for staking your NLS. Let Nolus handle it and simply reap the rewards of active participation in the Nolus blockchain.',
    tabImage: LeaseImage,
    buttonLink: '#',
  },
  {
    tabName: 'Govern',
    tabIcon: GovernIcon,
    heading: 'Shape the Future of Nolus Protocol',
    content: 'Play a crucial role in the evolution of the Nolus Protocol by casting your vote and influencing its future development. Your engagement is vital, enabling you to directly contribute to shaping the trajectory of the Nolus Protocol',
    tabImage: LeaseImage,
    buttonLink: '#',
  },
]

let activeTab = ref(0); // Initialize activeTab to 0
let tabsContainer = ref(null);
let intervalId, observer;

const setActiveTab = (index) => {
  console.log('neshto'+index)
  activeTab.value = index;
}

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
  tabsContainer.value.style.height = `${tabsContainer.value.scrollHeight}px`;

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