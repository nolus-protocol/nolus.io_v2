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
        {{ $t('home_heroTitle') }}
        </h1>

        <p
          class="mt-6 max-w-64 text-base text-neutral-600 sm:max-w-lg sm:leading-8 md:text-xl lg:max-w-none"
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="300"
        >
        {{ $t('home_heroSubtitle') }}
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
          preload="auto"
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

// In legacy mode, useI18n returns the global instance by default
const { t } = useI18n({ useScope: 'global' });

import SquareArrowTopRightIcon from "@/assets/icons/square-arrow-top-right-2.svg";
import Button from "@/components/Button.vue";
import videoPoster from "@/assets/videos/header.jpg";
import videoSrc from "@/assets/videos/header.mp4";

// Sample image/video color and apply to page
const sampleImageColor = (imageSource: HTMLImageElement | HTMLVideoElement) => {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    if (!ctx) return;
    
    // For video, use video dimensions; for image, use natural dimensions
    const width = imageSource instanceof HTMLVideoElement ? imageSource.videoWidth : imageSource.naturalWidth;
    const height = imageSource instanceof HTMLVideoElement ? imageSource.videoHeight : imageSource.naturalHeight;
    
    canvas.width = width;
    canvas.height = height;
    
    if (canvas.width === 0 || canvas.height === 0) return;
    
    // Draw the current frame/image
    ctx.drawImage(imageSource, 0, 0, canvas.width, canvas.height);
    
    // Sample from the center-left area (where background usually is)
    const x = Math.floor(canvas.width * 0.1);
    const y = Math.floor(canvas.height * 0.5);
    
    const imageData = ctx.getImageData(x, y, 1, 1).data;
    const hex = `#${imageData[0].toString(16).padStart(2, '0')}${imageData[1].toString(16).padStart(2, '0')}${imageData[2].toString(16).padStart(2, '0')}`;
    
    // Apply the sampled color to the CSS variable
    document.documentElement.style.setProperty('--bg-banner-home', hex);
  } catch (error) {
    // Silently fail - use default CSS color
  }
};

onMounted(() => {
  // Sample poster image color first (fast and reliable)
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    sampleImageColor(img);
  };
  img.src = videoPoster;
  
  // Optionally refine with video color once it actually plays (for perfect accuracy)
  const video = heroVideo.value;
  if (video) {
    // Only sample when video has actually played and rendered a frame
    video.addEventListener('playing', () => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        requestAnimationFrame(() => {
          sampleImageColor(video);
        });
      }
    }, { once: true });
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
    isStatsLoading.value = false;
  } catch (error) {
    console.log(error);
    isStatsLoading.value = false;
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
