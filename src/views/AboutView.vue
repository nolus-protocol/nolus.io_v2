<template>
  <div class="bg-white">
    <main class="isolate">
      <!-- Hero section -->
      <div
        class="relative isolate -z-10 overflow-hidden bg-about-banner py-40"
        ref="heroWrapper"
      >
        <NolusContainer class="flex items-center">
          <div class="gap-x-14 md:max-w-[50%] lg:flex lg:max-w-2xl lg:max-w-none lg:items-center">
            <div class="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1
                class="text-3xl font-bold leading-tight tracking-tight text-white md:text-3xl lg:text-5xl"
                v-motion
                :initial="{ opacity: 0, y: 10 }"
                :enter="{ opacity: 1, y: 0, scale: 1 }"
                :delay="100"
              >
                Reshaping<br />Money Markets
              </h1>
              <div class="flex flex-col gap-x-8 lg:flex-row">
                <p
                  class="relative mt-6 basis-1/2 text-lg leading-8 text-white sm:max-w-md lg:max-w-lg"
                  v-motion
                  :initial="{ opacity: 0, y: 10 }"
                  :enter="{ opacity: 1, y: 0, scale: 1 }"
                  :delay="200"
                >
                  Nolus bridges lenders and borrowers in the DeFi money market. With lease, borrowers secure up to 150%
                  financing and retain access to leveraged assets via whitelisted strategies
                </p>
                <p
                  class="relative mt-6 basis-1/2 text-lg leading-8 text-white sm:max-w-md lg:max-w-lg"
                  v-motion
                  :initial="{ opacity: 0, y: 10 }"
                  :enter="{ opacity: 1, y: 0, scale: 1 }"
                  :delay="300"
                >
                  Inspired by traditional finance, Nolus' lease reduces high over-collateralization standards, enhancing
                  capital efficiency, and improving loan terms for borrowers
                </p>
              </div>
            </div>
          </div>
          <div
            class="hidden md:block"
            aria-hidden="true"
          >
            <div class="absolute top-4 -z-10 mx-auto w-9/12 sm:-right-8 lg:-right-20 lg:-top-20">
              <video
                class="h-auto w-full"
                @loadeddata="isVideoLoaded = true"
                muted
                autoplay
                playsinline
                data-timing="7"
                data-wait="240"
                loop
              >
                <source
                  :src="videoSrc"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </NolusContainer>
      </div>

      <!-- Vision, mission and values -->
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

      <!-- Team section -->
      <div class="bg-neutral-100 py-24">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl shrink-0 basis-2/5 lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">Core Contributors</h2>
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
                  alt=""
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
      </div>

      <!-- Logo cloud -->
      <div class="relative isolate -z-10 overflow-hidden bg-blue-800 py-16">
        <NolusContainer>
          <div
            class="mx-auto grid max-w-lg grid-cols-2 items-center justify-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-4 sm:gap-x-10 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-6"
          >
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/cogitent_ventures.png"
              alt="Cogitent Ventures"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/cointelegraph.svg?url"
              alt="CoinTelegraph"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/dorahacks.svg?url"
              alt="DoraHacks"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/tokenmetrics.svg?url"
              alt="TokenMetrics"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/kahuna.svg?url"
              alt="Kahuna"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/everstake.svg?url"
              alt="Everstake"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/block_builders.svg?url"
              alt="BlockBuilders"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/gt_capital.svg?url"
              alt="GT Capital"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/01node.svg?url"
              alt="01Node"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/autonomy_capital.svg?url"
              alt="Autonomy Capital"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/nacion_crypto.svg?url"
              alt="NAcion Crypto"
            />
            <img
              class="mx-auto w-4/5"
              src="@/assets/images/about/partners/p-ops_team.png"
              alt="P-OPS Team"
            />
          </div>
        </NolusContainer>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
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
import contributors7 from "@/assets/images/about/team/nena_alba.jpg";
import contributors8 from "@/assets/images/about/team/ves_zahariev.jpg";
import contributors9 from "@/assets/images/about/team/krum_christov.jpg";

// Logo dependencies
const isVideoLoaded = ref(false);
let heroWrapper = ref(null);

// Define vision, mission and values
const visionMisionAndValues = [
  {
    icon: icon2,
    name: "Mission",
    description:
      "Nolus is dedicated to effectively addressing inefficiencies in lending markets through innovative, convenient, and sustainable solutions. Leveraging the power of blockchain technology, Nolus is at the forefront of pioneering in decentralized finance"
  },
  {
    icon: icon1,
    name: "Vision",
    description:
      "We envision a future where all assets are tokenized on-chain, offering people efficiency in managing their funds. At Nolus, we gaze into the future which is why we designed all protocol offerings to be seamless, secure and instant",
    href: "#"
  },
  {
    icon: icon3,
    name: "Values",
    description:
      "Nolus is founded on the principles of transparency, efficiency, and inclusivity, which are reflected in our open-source technology, governance-guided decision-making, and dedicated efforts to create a truly global service, providing wealth creation opportunities accessible to all"
  }
];

// Define core contributors
const core_contributors = [
  {
    name: "Kamen Trendafilov",
    role: "Finance",
    imageUrl: contributors1,
    xUrl: "",
    discordUrl: ""
  },
  {
    name: "Gancho Manev",
    role: "Tech Lead",
    imageUrl: contributors2,
    xUrl: "",
    discordUrl: ""
  },
  {
    name: "Ivan Kostov",
    role: "Product Development",
    imageUrl: contributors3,
    xUrl: "",
    discordUrl: ""
  },
  {
    name: "Bilyana Christova",
    role: "Business Development",
    imageUrl: contributors4,
    xUrl: "",
    discordUrl: ""
  },
  {
    name: "Metodi Manov",
    role: "Product Development",
    imageUrl: contributors5,
    xUrl: "",
    discordUrl: ""
  },
  {
    name: "Simon Chadwick",
    role: "Investor Relations",
    imageUrl: contributors6,
    xUrl: "",
    discordUrl: ""
  },
  {
    name: "Nena Alba",
    role: "Growth",
    imageUrl: contributors7,
    xUrl: "",
    discordUrl: ""
  },
  {
    name: "Ves Zahariev",
    role: "Social & Marketing",
    imageUrl: contributors8,
    xUrl: "",
    discordUrl: ""
  },
  {
    name: "Krum Christov",
    role: "Community & Marketing",
    imageUrl: contributors9,
    xUrl: "",
    discordUrl: ""
  }
];

// Define other contributors
const other_contributors = [
  {
    name: "Boyan Kostov",
    role: "Product Design"
  },
  {
    name: "Kiril Mihaylov",
    role: "Rust Engineer"
  },
  {
    name: "Denislav Ivanov",
    role: "Go Engineer"
  },
  {
    name: "Ivan Ivanov",
    role: "Go Engineer"
  },
  {
    name: "Desislava Paunova",
    role: "QA Engineer"
  },
  {
    name: "Alexander Makedonski",
    role: "Web3 Engineer"
  },
  {
    name: "Lyubomir Blagov",
    role: "Web3 Engineer"
  },
  {
    name: "Alexander Efremov",
    role: "Data Scientist"
  }
];
</script>
