<template>
  <div class="bg-white">
    <main class="isolate">
      <!-- Hero section -->
      <section
        class="relative isolate -z-10 overflow-hidden bg-about-banner py-40"
        aria-labelledby="about-hero-heading"
      >
        <NolusContainer class="flex items-center">
          <div class="gap-x-14 md:max-w-[50%] lg:flex lg:max-w-none lg:items-center">
            <div class="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1
                id="about-hero-heading"
                class="text-3xl font-bold leading-tight tracking-tight text-white md:text-3xl lg:text-5xl"
                v-motion
                :initial="{ opacity: 0, y: 10 }"
                :enter="{ opacity: 1, y: 0, scale: 1 }"
                :delay="100"
                v-html="$t('about_heroTitle')"
              >
              </h1>
              <div class="flex flex-col gap-x-8 lg:flex-row">
                <p
                  class="relative mt-6 basis-1/2 text-lg leading-8 text-white sm:max-w-md lg:max-w-lg"
                  v-motion
                  :initial="{ opacity: 0, y: 10 }"
                  :enter="{ opacity: 1, y: 0, scale: 1 }"
                  :delay="200"
                >
                  {{ $t('about_heroDesc1') }}
                </p>
                <p
                  class="relative mt-6 basis-1/2 text-lg leading-8 text-white sm:max-w-md lg:max-w-lg"
                  v-motion
                  :initial="{ opacity: 0, y: 10 }"
                  :enter="{ opacity: 1, y: 0, scale: 1 }"
                  :delay="300"
                >
                {{ $t('about_heroDesc2') }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="hidden md:block"
            aria-hidden="true"
          >
            <div class="absolute top-4 -z-10 mx-auto w-9/12 sm:-right-8 lg:-right-20 lg:-top-20">
              <div class="relative">
                <video
                  ref="aboutVideo"
                  class="h-auto w-full"
                  muted
                  autoplay
                  playsinline
                  preload="auto"
                  loop
                >
                  <source
                    :src="videoSrc"
                    type="video/mp4"
                  />
                </video>

              </div>
            </div>
          </div>
        </NolusContainer>
      </section>

      <!-- Vision, mission and values -->
      <section aria-labelledby="mission-vision-heading">
      <NolusContainer>
        <div class="mx-auto max-w-2xl py-16 lg:mx-0 lg:max-w-none">
          <div class="mt-6 flex flex-col gap-x-10 gap-y-8 md:flex-row">
            <div
              v-for="(item, index) in visionMisionAndValues"
              :key="index"
              class="md:basis-1/3"
            >
              <Feature
                :name="item.name"
                :description="item.description"
                :icon="item.icon"
              />
            </div>
          </div>
        </div>
      </NolusContainer>
      </section>

      <!-- Team section -->
      <section class="bg-neutral-100 py-24" aria-labelledby="team-heading">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl shrink-0 basis-2/5 lg:mx-0">
            <h2 id="team-heading" class="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">{{ $t('about_coreContributorsHeading') }}</h2>
          </div>
          <div class="shrink-0 basis-3/5">
            <!-- Core contributors -->
            <ul
              role="list"
              class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            >
              <li
                v-for="person in core_contributors"
                :key="person.name"
                class="group flex items-center rounded-2xl px-4 py-4 transition-all hover:bg-white hover:shadow-xl"
              >
                <img
                  class="mr-5 h-32 w-32 rounded-full brightness-110 grayscale group-hover:grayscale-0"
                  :src="person.imageUrl"
                  :alt="person.name"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3 class="text-base font-semibold leading-7 tracking-tight text-neutral-900">{{ person.name }}</h3>
                  <p class="text-sm leading-6 text-neutral-600">{{ person.role }}</p>
                </div>
              </li>
            </ul>
            <!-- Other contributors -->
            <ul
              role="list"
              class="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
            >
              <li
                v-for="person in other_contributors"
                :key="person.name"
                class=""
              >
                <h3 class="mt-6 text-base font-semibold leading-7 tracking-tight text-neutral-900">
                  {{ person.name }}
                </h3>
                <p class="text-sm leading-6 text-neutral-600">{{ person.role }}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Logo cloud -->
      <section class="relative isolate -z-10 overflow-hidden bg-blue-800 py-16" aria-label="Partners and backers">
        <NolusContainer>
          <div
            class="mx-auto grid max-w-lg grid-cols-2 items-center justify-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-4 sm:gap-x-10 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-6"
          >
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/cogitent_ventures.png"
              :alt="$t('about_partnerCogitentVentures')"
              loading="lazy"
              decoding="async"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/cointelegraph.svg?url"
              :alt="$t('about_partnerCoinTelegraph')"
              loading="lazy"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/dorahacks.svg?url"
              :alt="$t('about_partnerDoraHacks')"
              loading="lazy"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/tokenmetrics.svg?url"
              :alt="$t('about_partnerTokenMetrics')"
              loading="lazy"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/interop.svg?url"
              :alt="$t('about_partnerInteropVentures')"
              loading="lazy"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/kahuna.svg?url"
              :alt="$t('about_partnerKahuna')"
              loading="lazy"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/everstake.svg?url"
              :alt="$t('about_partnerEverstake')"
              loading="lazy"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/block_builders.svg?url"
              :alt="$t('about_partnerBlockBuilders')"
              loading="lazy"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/gt_capital.svg?url"
              :alt="$t('about_partnerGTCapital')"
              loading="lazy"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/autonomy_capital.svg?url"
              :alt="$t('about_partnerAutonomyCapital')"
              loading="lazy"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/nacion_crypto.svg?url"
              :alt="$t('about_partnerNacionCrypto')"
              loading="lazy"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/p-ops_team.png"
              :alt="$t('about_partnerPOPSTeam')"
              loading="lazy"
              decoding="async"
            />
          </div>
        </NolusContainer>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import NolusContainer from "@/components/NolusContainer.vue";
import icon1 from "@/assets/lotties/mission.json?url";
import icon2 from "@/assets/lotties/vision.json?url";
import icon3 from "@/assets/lotties/values.json?url";
import Feature from "../components/Feature.vue";
import videoSrc from "@/assets/videos/about-header.mp4";
import contributors1 from "@/assets/images/about/team/kamen_trendafilov.jpg";
import contributors2 from "@/assets/images/about/team/gancho_manev.jpg";
import contributors3 from "@/assets/images/about/team/ivan_kostov.jpg";
import contributors4 from "@/assets/images/about/team/bilyana_christova.jpg";
import contributors5 from "@/assets/images/about/team/metodi_manov.jpg";
import contributors6 from "@/assets/images/about/team/simon_chadwick.jpg";
import contributors8 from "@/assets/images/about/team/ves_zahariev.jpg";
import contributors10 from "@/assets/images/about/team/tony.jpg";
import contributors11 from "@/assets/images/about/team/lily.jpg";

const { t } = useI18n({ useScope: 'global' });

const aboutVideo = ref<HTMLVideoElement | null>(null);

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
    document.documentElement.style.setProperty('--bg-banner-about', hex);
  } catch (error) {
    // Silently fail - use default CSS color
  }
};

onMounted(() => {
  // Sample video color when loaded
  const video = aboutVideo.value;
  
  if (video) {
    const handleVideoReady = () => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        // Use requestAnimationFrame for smooth transition
        requestAnimationFrame(() => {
          sampleImageColor(video);
        });
      }
    };
    
    // Check if already loaded
    if (video.readyState >= 2 && video.videoWidth > 0) {
      requestAnimationFrame(() => {
        sampleImageColor(video);
      });
    } else {
      // Listen to multiple events
      video.addEventListener('loadeddata', handleVideoReady, { once: true });
      video.addEventListener('canplay', handleVideoReady, { once: true });
      video.addEventListener('loadedmetadata', handleVideoReady, { once: true });
    }
  }
});

// Define vision, mission and values
const visionMisionAndValues = computed(() => [
  {
    icon: icon1,
    name: t("about_missionTitle"),
    description: t("about_missionDesc")
  },
  {
    icon: icon2,
    name: t("about_visionTitle"),
    description: t("about_visionDesc"),
    href: "#"
  },
  {
    icon: icon3,
    name: t("about_valuesTitle"),
    description: t("about_valuesDesc")
  }
]);

// Define core contributors
const core_contributors = computed(() => [
  {
    name: "Kamen Trendafilov",
    role: t("about_roleFinance"),
    imageUrl: contributors1,
    xUrl: "",
    discordUrl: ""
  },
  {
    name: "Gancho Manev",
    role: t("about_roleTechLead"),
    imageUrl: contributors2,
    xUrl: "",
    discordUrl: ""
  },
  {
    name: "Ivan Kostov",
    role: t("about_roleProductDevelopment"),
    imageUrl: contributors3,
    xUrl: "",
    discordUrl: ""
  },
  {
    name: "Bilyana Christova",
    role: t("about_roleBusinessDevelopment"),
    imageUrl: contributors4,
    xUrl: "",
    discordUrl: ""
  },
  {
    name: "Metodi Manov",
    role: t("about_roleProductDevelopment"),
    imageUrl: contributors5,
    xUrl: "",
    discordUrl: ""
  },
  // {
  //   name: "Simon Chadwick",
  //   role: t("about_roleInvestorRelations"),
  //   imageUrl: contributors6,
  //   xUrl: "",
  //   discordUrl: ""
  // },
  {
    name: "Lilia Ilieva",
    role: t("about_roleMarketingCommunication"),
    imageUrl: contributors11,
    xUrl: "",
    discordUrl: ""
  },
  {
    name: "Ves Zahariev",
    role: t("about_roleSocialMarketing"),
    imageUrl: contributors8,
    xUrl: "",
    discordUrl: ""
  },
  {
    name: "Tony Papailias",
    role: t("about_roleCommunityLead"),
    imageUrl: contributors10,
    xUrl: "",
    discordUrl: ""
  }
]);

// Define other contributors
const other_contributors = computed(() => [
  {
    name: "Boyan Kostov",
    role: t("about_roleProductDesign")
  },
  {
    name: "Kiril Mihaylov",
    role: t("about_roleRustEngineer")
  },
  {
    name: "Denislav Ivanov",
    role: t("about_roleGoEngineer")
  },
  {
    name: "Desislava Paunova",
    role: t("about_roleQAEngineer")
  },
  {
    name: "Alexander Makedonski",
    role: t("about_roleWeb3Engineer")
  },
  {
    name: "Lyubomir Blagov",
    role: t("about_roleWeb3Engineer")
  },
  {
    name: "Alexander Efremov",
    role: t("about_roleDataScientist")
  }
]);
</script>
