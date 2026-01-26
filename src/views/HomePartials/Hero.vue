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
          class="motion-hidden max-w-64 text-4xl font-bold tracking-tighter text-neutral-900 sm:max-w-lg sm:text-7xl md:mt-10 lg:max-w-none"
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="100"
        >
        {{ $t('home_heroTitle') }}
        </h1>

        <p
          class="motion-hidden mt-6 max-w-64 text-base text-neutral-600 sm:max-w-lg sm:leading-8 md:text-xl lg:max-w-none"
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="300"
        >
        {{ $t('home_heroSubtitle') }}
        </p>

        <div
          class="motion-hidden mt-10 flex flex-col items-center gap-x-3 gap-y-4 md:flex-row"
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
            {{ $t('common_launchApp') }}
          </Button>
        </div>
      </div>
      <div
        class="absolute -right-48 left-0 top-20 -z-10 mx-auto my-12 w-full sm:-right-56 md:left-auto md:top-10 md:scale-100 lg:-right-72 lg:mt-0"
        aria-hidden="true"
      >
        <video
          ref="heroVideo"
          class="h-auto w-full"
          muted
          autoplay
          playsinline
          preload="metadata"
          loop
          :poster="videoPoster"
        >
          <source
            :src="videoSrc"
            type="video/mp4"
          />
        </video>
      </div>
      <div class="max-w-4xl md:pt-16">
        <dl class="mt-16 flex flex-col gap-y-10 rounded-xl md:my-0 md:flex-row">
          <div
            v-for="(stat, index) in stats"
            :key="index"
          >
            <div
              class="motion-hidden flex w-full max-w-xs flex-col gap-y-3 md:mx-auto md:pr-8"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0 }"
              :delay="stat.id * 100"
            >
              <dt class="order-first font-medium leading-3 text-blue-600">
                {{ stat.subtitle }}
              </dt>
              <dd class="text-3xl font-bold tracking-tight text-neutral-900">
                <span v-if="!isStatsLoading">{{ stat.value }}</span>
                <span v-else class="inline-block h-7 w-32 animate-pulse rounded-md bg-neutral-200"></span>
              </dd>
              <dt class="text-base leading-6 text-neutral-600">
                {{ stat.description }}
              </dt>
            </div>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { ETL_API, PROTOCOLS, Stats } from "@/config";
import { setupVideoColorSampling } from "@/utils";
import type { TotalTxValueResponse, TotalValueLockedResponse, PoolsResponse, PoolData } from "@/types/api";

const { t } = useI18n({ useScope: "global" });

import SquareArrowTopRightIcon from "@/assets/icons/square-arrow-top-right-2.svg";
import Button from "@/components/Button.vue";
import videoPoster from "@/assets/videos/header.jpg";
import videoSrc from "@/assets/videos/header.mp4";

onMounted(() => {
  const video = heroVideo.value;
  if (video) {
    setupVideoColorSampling(video, "--bg-banner-home", videoPoster);
  }
});

const stats = ref([
  {
    id: 1,
    key: Stats.tx_volume,
    subtitle: t('home_statsVolume'),
    description: t('home_statsVolumeDesc'),
    value: "$--.--M+"
  },
  {
    id: 2,
    key: Stats.tvl,
    subtitle: t('home_statsValueLocked'),
    description: t('home_statsValueLockedDesc'),
    value: "$--.--"
  },
  {
    id: 3,
    key: Stats.earn,
    subtitle: t('home_statsEarn'),
    description: t('home_statsEarnDesc'),
    value: "--.--%"
  }
]);

const isStatsLoading = ref(true);
const heroVideo = ref<HTMLVideoElement | null>(null);

onBeforeMount(() => {
  fetchData();
});

async function fetchData() {
  try {
    isStatsLoading.value = true;
    const [txValueRes, tvlRes, earnApr] = await Promise.all([
      fetch(`${ETL_API}/api/total-tx-value`)
        .then((r) => r.json() as Promise<TotalTxValueResponse>)
        .catch((): TotalTxValueResponse => ({ total_tx_value: "0" })),
      fetch(`${ETL_API}/api/total-value-locked`)
        .then((r) => r.json() as Promise<TotalValueLockedResponse>)
        .catch((): TotalValueLockedResponse => ({ total_value_locked: "0" })),
      fetchEarnApr().catch(() => 0)
    ]);
    for (const s of stats.value) {
      switch (s.key) {
        case Stats.tx_volume: {
          const txValue = Number(txValueRes.total_tx_value);
          if (txValue === 0) {
            s.value = "$--.--M+";
          } else {
            s.value = `$${txValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
          }
          break;
        }
        case Stats.tvl: {
          const tvlValue = Number(tvlRes.total_value_locked);
          if (tvlValue === 0) {
            s.value = "$--.--";
          } else {
            s.value = `$${tvlValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
          }
          break;
        }
        case Stats.earn: {
          if (earnApr === 0) {
            s.value = "--.--%";
          } else {
            s.value = `${earnApr.toLocaleString("en-US", { maximumFractionDigits: 2 })}%`;
          }
          break;
        }
      }
    }
    isStatsLoading.value = false;
  } catch (error) {
    console.log(error);
    isStatsLoading.value = false;
  }
}

async function fetchEarnApr(): Promise<number> {
  const res: PoolsResponse = await fetch(`${ETL_API}/api/pools`).then((r) => r.json());
  const protocols = res.protocols || [];

  const filteredProtocols = protocols.filter((p: PoolData) => PROTOCOLS.includes(p.protocol));

  if (filteredProtocols.length === 0) {
    return 0;
  }

  const totalEarnApr = filteredProtocols.reduce((sum, p) => sum + Number(p.earn_apr || 0), 0);
  return totalEarnApr / filteredProtocols.length;
}
</script>
