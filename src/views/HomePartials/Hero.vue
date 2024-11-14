<template>
  <div class="bg-home-banner relative isolate overflow-hidden">
    <div class="relative mx-auto max-w-7xl px-6 py-32 pb-24 lg:px-8 lg:pt-28">
      <div
        class="-z-5 absolute bottom-0 left-0 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          class="relative aspect-[1/1] w-[66.125rem] bg-gradient-to-r from-white to-white opacity-100"
          style="clip-path: ellipse(50% 25% at center 100%)"
        ></div>
      </div>

      <div class="relative md:max-w-xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
        <h1
          class="max-w-64 text-4xl font-bold tracking-tighter text-neutral-900 sm:max-w-lg sm:text-7xl md:mt-10 lg:max-w-none"
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="100"
        >
          Leverage Done Right
        </h1>

        <p
          class="mt-6 max-w-64 text-base text-neutral-600 sm:max-w-lg sm:leading-8 md:text-xl lg:max-w-none"
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="300"
        >
          Access 2.5x leverage with fixed interest and minimized margin call risk
        </p>

        <div
          class="mt-10 flex flex-col items-center gap-x-3 gap-y-4 md:flex-row"
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="400"
        >
          <Button
            class="w-full md:w-auto"
            size="lg"
            variant="primary"
            link="https://app.nolus.io/"
            :icon="SquareArrowTopRightIcon"
          >
            Launch App
          </Button>
          <Button
            class="w-full md:w-auto"
            size="lg"
            variant="secondary"
            :icon="PlayCircleIcon"
            @click="showVideoDialog = true"
          >
            Watch Explainer
          </Button>
        </div>
      </div>
      <div
        class="absolute -right-48 left-0 top-20 -z-10 mx-auto my-12 w-full sm:-right-56 md:left-auto md:top-10 md:scale-100 lg:-right-72 lg:mt-0"
        aria-hidden="true"
      >
        <video
          @loadeddata="isVideoLoaded = true"
          class="h-auto w-full"
          muted
          autoplay
          playsinline
          data-timing="7"
          data-wait="240"
          loop
          :poster="videoPoster"
        >
          <source
            :src="videoSrc"
            type="video/mp4"
          />
        </video>
        <img
          v-if="!isVideoLoaded"
          :src="videoPoster"
          alt="Video loading..."
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1 }"
          :delay="100"
        />
      </div>
      <div class="max-w-4xl md:pt-16">
        <dl class="mt-16 flex flex-col gap-y-10 rounded-xl md:my-0 md:flex-row">
          <div
            v-for="(stat, index) in stats"
            :key="index"
          >
            <div
              class="flex w-full max-w-xs flex-col gap-y-3 md:mx-auto md:pr-8"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0 }"
              :delay="stat.id * 100"
            >
              <dt class="order-first font-medium leading-3 text-blue-600">
                {{ stat.subtitle }}
              </dt>
              <dd class="text-3xl font-bold tracking-tight text-neutral-900">
                {{ stat.value }}
              </dd>
              <dt class="text-base leading-6 text-neutral-600">
                {{ stat.description }}
              </dt>
            </div>
          </div>
        </dl>
      </div>
      <Modal
        :show="showVideoDialog"
        :variant="'video'"
        @close-modal="showVideoDialog = false"
      >
        <VideoModal />
      </Modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { ETL_API, PROTOCOLS, Stats } from "@/config";

import SquareArrowTopRightIcon from "@/assets/icons/square-arrow-top-right-2.svg";
import PlayCircleIcon from "@/assets/icons/play-circle.svg";
import Button from "@/components/Button.vue";
import videoPoster from "@/assets/videos/header.jpg";
import Modal from "@/components/modals/templates/Modal.vue";
import VideoModal from "@/components/modals/VideoModal.vue";
import videoSrc from "@/assets/videos/header.mp4";

const stats = ref([
  {
    id: 1,
    key: Stats.tx_volume,
    subtitle: "Tx Volume",
    description: "Transactional value channeled through Nolus",
    value: "$--.--M+"
  },
  {
    id: 2,
    key: Stats.tvl,
    subtitle: "Value Locked",
    description: "Liquidity locked across 28 assets distributed on 3 chains",
    value: "$--.--"
  },
  {
    id: 3,
    key: Stats.earn,
    subtitle: "Earn",
    description: "Annual percentage yield on lent assets, sustained sustainably",
    value: "--.--%"
  }
]);

const showVideoDialog = ref(false);
const isVideoLoaded = ref(false);

onBeforeMount(() => {
  fetchData();
});

async function fetchData() {
  try {
    const [total_tx_value, tvl, earnApr] = await Promise.all([
      fetch(`${ETL_API}/api/total-tx-value`)
        .then((r) => r.json())
        .catch(() => ({ total_tx_value: 0 })),
      fetch(`${ETL_API}/api/total-value-locked`)
        .then((r) => r.json())
        .catch(() => ({ total_value_locked: 0 })),
      fetchEarnApr().catch(() => 0)
    ]);
    for (const s of stats.value) {
      switch (s.key) {
        case Stats.tx_volume: {
          if (total_tx_value.total_tx_value == 0) {
            s.value = "$--.--M+";
          } else {
            s.value = `$${Number(total_tx_value.total_tx_value).toLocaleString("en-EN", {
              maximumFractionDigits: 0
            })}`;
          }
          break;
        }
        case Stats.tvl: {
          if (tvl.total_value_locked == 0) {
            s.value = "$--.--";
          } else {
            s.value = `$${Number(tvl.total_value_locked).toLocaleString("en-EN", {
              maximumFractionDigits: 0
            })}`;
          }
          break;
        }
        case Stats.earn: {
          if (earnApr == 0) {
            s.value = "--.--%";
          } else {
            s.value = `${Number(earnApr).toLocaleString("en-EN", {
              maximumFractionDigits: 2
            })}%`;
          }
          break;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function fetchEarnApr() {
  const promises = [];
  for (const p of PROTOCOLS) {
    promises.push(fetch(`${ETL_API}/api/earn-apr?protocol=${p}`).then((r) => r.json()));
  }
  const res = await Promise.all(promises);
  let totalEarnApr = 0;
  for (const apr of res) {
    totalEarnApr += Number(apr.earn_apr);
  }
  return totalEarnApr / PROTOCOLS.length;
}
</script>
