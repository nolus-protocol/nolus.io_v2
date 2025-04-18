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
        Build for You
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

const tabs = [
  {
    tabName: 'Effortless',
    tabIcon: EffortlessIcon,
    heading: 'User-First Experience',
    content: "Designed for a smooth and engaging journey, Nolus provides best-in-class onboarding and integrated guides, helping you get started easily and quickly refresh your knowledge whenever needed",
    tabImage: EfortlessImage
  },
  {
    tabName: 'Compatible',
    tabIcon: CompatibleIcon,
    heading: 'Broad Wallet Support',
    content:
      "Connect seamlessly with a wide range of non-custodial wallets through supported extensions or mobile apps, ensuring a smooth, secure, and flexible user experience",
    tabImage: CompatibleImage
  },
  {
    tabName: 'Personalized',
    tabIcon: PersonalizedIcon,
    heading: 'AI-Infused Data Insights',
    content: 'Meet Kai, your AI companion within Nolus, powered by advanced LLM technology to deliver tailored insights and real-time alerts—keeping you informed and ready to act at all times',
    tabImage: PersonalizedImage
  },
  {
    tabName: 'Flexible',
    tabIcon: FlexibleIcon,
    heading: 'Simplified Network Fees',
    content: "Enjoy the flexibility to seamlessly pay network fees with virtually any supported asset, making transactions more convenient and inclusive while directly benefiting NLS stakers",
    tabImage: FlexibleImage
  },
  {
    tabName: 'Cross-Chain',
    tabIcon: CrosschainIcon,
    heading: 'Secure Trustless Interoparability',
    content: 'Transact securely across chains, powered by the trust-minimized Inter Blockchain Communication standard, ensuring near-instant processing without centralized intermediaries',
    tabImage: CrosschainImage
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
