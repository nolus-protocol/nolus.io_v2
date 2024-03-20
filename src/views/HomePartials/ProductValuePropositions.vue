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
          Nolus App
        </p>
        <h2
          class="mt-2 text-3xl font-bold tracking-tight text-neutral-900 lg:text-5xl"
          aria-hidden="true"
        >
          Unified UI
        </h2>
      </div>
      <div class="relative z-10 overflow-hidden rounded-2xl bg-white shadow-xl">
        <div class="flex w-full flex-col justify-stretch lg:flex-row">
          <div
            class="shrink-0 border-b border-neutral-200/50 bg-neutral-50 py-3 lg:border-b-0 lg:border-r lg:px-8 lg:py-12"
          >
            <ul
              class="text-neutral-80 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 p-4 md:static md:w-auto md:justify-start md:gap-y-3 lg:flex-col lg:items-stretch"
            >
              <li
                v-for="(tab, index) in tabs"
                :key="index"
                class="cursor-pointer rounded-full px-2 py-2 text-base font-medium transition-all hover:bg-neutral-200/40 md:px-4 md:py-2 md:text-xl"
                :class="{ 'active bg-white text-blue-600 shadow-xl hover:bg-white': activeTab === index }"
                @click="setActiveTab(index)"
                @mouseover="stopInterval"
                @mouseout="startInterval"
              >
                <button>
                  <component
                    :is="tab.tabIcon"
                    fill="#ffcc00"
                    alt=""
                    class="icon inline-block w-7 md:w-9"
                    aria-hidden="true"
                  />
                  {{ tab.tabName }}
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
                  <img
                    ref="imgRef"
                    :src="tab.tabImage"
                    alt=""
                    class="w-8/12 md:ml-auto md:w-2/5 lg:w-6/12"
                    aria-hidden="true"
                    v-motion
                    :initial="{ opacity: 0 }"
                    :enter="{ opacity: 1, scale: 1, transition: { duration: 600 } }"
                    :leave="{ opacity: 0 }"
                  />
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
import LeaseIcon from "@/assets/icons/lease.svg";
import EarnIcon from "@/assets/icons/earn.svg";
import DelegateIcon from "@/assets/icons/delegate.svg";
import GovernIcon from "@/assets/icons/govern.svg";
import LeaseImage from "../../assets/images/product-value-propositions/lease.webp";
import EarnImage from "../../assets/images/product-value-propositions/earn.webp";
import DelegateImage from "../../assets/images/product-value-propositions/delegate.webp";
import GovernImage from "../../assets/images/product-value-propositions/govern.webp";

const tabs = [
  {
    tabName: "Lease",
    tabIcon: LeaseIcon,
    heading: "Maximize Your Assets Potential",
    content: "Secure up to 150% leverage and gain exclusive access to leveraged assets through whitelisted strategies",
    tabImage: LeaseImage
  },
  {
    tabName: "Earn",
    tabIcon: EarnIcon,
    heading: "Earn up to 15% APY on Your Idle Assets",
    content:
      "Lend your idle assets for sustainable high-yield returns that vary between 8-15% APY, no matter the market conditions",
    tabImage: EarnImage
  },
  // {
  //   tabName: 'Swap',
  //   tabIcon: SwapIcon,
  //   heading: 'Seamless Cross-Chain Swaps',
  //   content: 'Effortlessly exchange various assets without the hassle and complexity of bridging across chains',
  //   tabImage: SwapImage
  // },
  {
    tabName: "Delegate",
    tabIcon: DelegateIcon,
    heading: "One-Click NLS Token Delegation",
    content: "Delegate your NLS tokens easily and enjoy the benefits of securing the Nolus blockchain",
    tabImage: DelegateImage
  },
  {
    tabName: "Govern",
    tabIcon: GovernIcon,
    heading: "Help Shape the Future of Nolus",
    content: "Cast your vote and take part in influencing the future development and trajectory of the protocol",
    tabImage: GovernImage
  }
];

let activeTab = ref(0); // Initialize activeTab to 0
let previousTabHeight = ref(0); // Initialize the height of the previously selected tab
let tabsContainer = ref<HTMLElement | null>(null);
let imgRef = ref(null);
let intervalId: number, observer: IntersectionObserver;
let loading = ref(false);

const updateHeight = (activeTabElement: Element) => {
  if (tabsContainer.value) {
    tabsContainer.value.style.height = `${activeTabElement.scrollHeight}px`;
    previousTabHeight.value = activeTabElement.scrollHeight;
  }
};

const initHeightUpdate = (index: number) => {
  if (tabsContainer.value) {
    const activeTabElement = tabsContainer.value.children[index];
    const img = new Image();
    img.src = tabs[index].tabImage;
    img.onload = () => updateHeight(activeTabElement);
    img.complete && updateHeight(activeTabElement);
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
  }, 10000);
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
</style>
