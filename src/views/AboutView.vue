<template>
  <div class="bg-white">
    <main class="isolate">
      <!-- Hero section -->
      <div class="overflow-hidden relative isolate -z-10 bg-blue-800 py-40" ref="heroWrapper">
          <NolusContainer class="flex items-center">
            <div class="md:max-w-[50%] lg:max-w-2xl gap-x-14 lg:flex lg:max-w-none lg:items-center">
              <div class="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1 class="text-3xl md:text-3xl lg:text-5xl font-bold tracking-tight text-white leading-tight" v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="100">Enriching DeFi for a Better Web3 World</h1>
                <div class="flex flex-col lg:flex-row gap-x-8">
                  <p class="basis-1/2 relative mt-6 text-lg leading-8 text-white sm:max-w-md lg:max-w-lg" v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="200">Nolus bridges lenders and borrowers in the DeFi money market. With Lease, borrowers secure up to 150% financing and retain access to leveraged assets via whitelisted strategies</p>
                   <p class="basis-1/2 relative mt-6 text-lg leading-8 text-white sm:max-w-md lg:max-w-lg" v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="300">Inspired by traditional finance, Nolus' lease reduces high over-collateralization standards, enhancing capital efficiency, and improving loan terms for borrowers</p>
                </div>
              </div>
            </div>
            <div class="hidden md:block" aria-hidden="true">
              <div class="absolute w-9/12 sm:-right-8 lg:-right-20 top-4   lg:-top-20 -z-10 mx-auto">
                <video ref="videoRef" @loadeddata="isVideoLoaded = true" @play="onVideoPlay" muted autoplay playsinline class="h-[1px] w-[1px]" data-timing="7" data-wait="240" style="width: 840px" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, }" :delay="100">
                </video>
                <canvas ref="canvasRef" :class="{ invisible: !isVideoLoaded, visible: isVideoLoaded }" class="w-full h-full"></canvas>
              </div>
            </div>
          </NolusContainer>
      </div>

      <!-- Vision, mission and values -->
      <NolusContainer>
        <div class="mx-auto py-16 max-w-2xl lg:mx-0 lg:max-w-none">
            <div class="mt-6 flex flex-col md:flex-row gap-x-10 gap-y-8">
              <div v-for="(item, index) in visionMisionAndValues" :key="index" class="md:basis-1/3">
                <component :is="item.icon" class="h-24 w-24"></component>
                <h2 class="text-3xl mt-8 font-bold tracking-tight text-neutral-900 sm:text-2xl mb-3">{{ item.name }}</h2>
                <p class="text-md leading-7 text-neutral-800">{{ item.description }}</p>
              </div>
            </div>
          </div>
      </NolusContainer>

      <!-- Team section -->
      <div class="bg-neutral-100 py-24">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">

          <div class="basis-2/5 shrink-0 mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">Core Contributors</h2>
          </div>
          <div class="basis-3/5 shrink-0">
            <!-- Core contributors -->
            <ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <li v-for="person in core_contributors" :key="person.name" class="group flex items-center py-4 px-4 rounded-2xl hover:bg-white hover:shadow-xl transition-all">
                <img class="mr-5 h-32 w-32 rounded-full grayscale brightness-110 group-hover:grayscale-0" :src="person.imageUrl" alt="" />
                <div>
                  <h3 class="text-base font-semibold leading-7 tracking-tight text-neutral-900">{{ person.name }}</h3>
                  <p class="text-sm leading-6 text-neutral-600">{{ person.role }}</p>
                  </div>
              </li>
            </ul>
            <!-- Other contributors -->
            <ul role="list" class="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              <li v-for="person in other_contributors" :key="person.name" class="">
                <h3 class="mt-6 text-base font-semibold leading-7 tracking-tight text-neutral-900">{{ person.name }}</h3>
                <p class="text-sm leading-6 text-neutral-600">{{ person.role }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Logo cloud -->
      <div class="relative isolate -z-10 py-16 bg-blue-800 overflow-hidden">
          <NolusContainer>
            <div class="mx-auto grid max-w-lg grid-cols-2 justify-center items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none">
                <img class="mx-auto w-4/5" src="/assets/images/about/partners/cogitent_ventures.png" alt="Cogitent Ventures" />
                <img class="mx-auto w-4/5" src="/assets/images/about/partners/cointelegraph.svg" alt="CoinTelegraph" />
                <img class="mx-auto w-4/5" src="/assets/images/about/partners/dorahacks.svg" alt="DoraHacks" />
                <img class="mx-auto w-4/5" src="/assets/images/about/partners/tokenmetrics.svg" alt="TokenMetrics" />
                <img class="mx-auto w-4/5" src="/assets/images/about/partners/kahuna.svg" alt="Kahuna" />
                <img class="mx-auto w-4/5" src="/assets/images/about/partners/everstake.svg" alt="Everstake" />
                <img class="mx-auto w-4/5" src="/assets/images/about/partners/block_builders.svg" alt="BlockBuilders" />
                <img class="mx-auto w-4/5" src="/assets/images/about/partners/gt_capital.svg" alt="GT Capital" />
                <img class="mx-auto w-4/5" src="/assets/images/about/partners/01node.svg" alt="01Node" />
                <img class="mx-auto w-4/5" src="/assets/images/about/partners/autonomy_capital.svg" alt="Autonomy Capital" />
                <img class="mx-auto w-4/5" src="/assets/images/about/partners/nacion_crypto.svg" alt="NAcion Crypto" />
                <img class="mx-auto w-4/5" src="/assets/images/about/partners/p-ops_team.png" alt="P-OPS Team" />
            </div>
          </NolusContainer>
      </div>


    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import NolusContainer from '@/components/NolusContainer.vue';
// Icons
import animatedLogo from '@/assets/videos/about-header.mp4';
import videoPoster from '@/assets/videos/header.jpg';
// Illustrations
import icon1 from  '@/assets/images/about/icon1.svg';
import icon2 from  '@/assets/images/about/icon2.svg';
import icon3 from  '@/assets/images/about/icon3.svg';

// Logo dependencies
const videoRef = ref(null);
const canvasRef = ref(null);
const isVideoLoaded = ref(false);
let heroWrapper = ref(null);
let intervalId: number | null | undefined = null;

// Define vision, mission and values
const visionMisionAndValues = [
  {
    icon: icon2,
    name: 'Mission',
    description:
      'Nolus is dedicated to effectively addressing inefficiencies in lending markets through innovative, convenient, and sustainable solutions. Leveraging the power of blockchain technology, Nolus is at the forefront of pioneering in decentralized finance',
  },
  {
    icon: icon1,
    name: 'Vision',
    description:
      'We envision a future where all assets are tokenized on-chain, offering people efficiency in managing their funds. At Nolus, we gaze into the future which is why we designed all protocol offerings to be seamless, secure and instant',
    href: '#',
  },
  {
    icon: icon3,
    name: 'Values',
    description:
      'Nolus is founded on the principles of transparency, efficiency, and inclusivity, which are reflected in our open-source technology, governance-guided decision-making, and dedicated efforts to create a truly global service, providing wealth creation opportunities accessible to all',
  }
]

// Define core contributors
const core_contributors = [
  {
    name: 'Kamen Trendafilov',
    role: 'Finance',
    imageUrl: '/assets/images/about/team/kamen_trendafilov.jpg',
    xUrl: '',
    discordUrl: ''
  },
  {
    name: 'Gancho Manev',
    role: 'Tech Lead',
    imageUrl: '/assets/images/about/team/gancho_manev.jpg',
    xUrl: '',
    discordUrl: ''
  },
  {
    name: 'Ivan Kostov',
    role: 'Product Development',
    imageUrl: '/assets/images/about/team/ivan_kostov.jpg',
    xUrl: '',
    discordUrl: ''
  },
  {
    name: 'Bilyana Christova',
    role: 'Business Development',
    imageUrl: '/assets/images/about/team/bilyana_christova.jpg',
    xUrl: '',
    discordUrl: ''
  },
  {
    name: 'Metodi Manov',
    role: 'Product Development',
    imageUrl: '/assets/images/about/team/metodi_manov.jpg',
    xUrl: '',
    discordUrl: ''
  },
  {
    name: 'Simon Chadwick',
    role: 'Investor Relations',
    imageUrl: '/assets/images/about/team/simon_chadwick.jpg',
    xUrl: '',
    discordUrl: ''
  },
  {
    name: 'Nena Alba',
    role: 'Growth',
    imageUrl: '/assets/images/about/team/nena_alba.jpg',
    xUrl: '',
    discordUrl: ''
  },
  {
    name: 'Ves Zahariev',
    role: 'Social & Marketing',
    imageUrl: '/assets/images/about/team/ves_zahariev.jpg',
    xUrl: '',
    discordUrl: ''
  },
  {
    name: 'Krum Christov',
    role: 'Community & Marketing',
    imageUrl: '/assets/images/about/team/krum_christov.jpg',
    xUrl: '',
    discordUrl: ''
  },
]

// Define other contributors
const other_contributors = [
  {
    name: 'Boyan Kostov',
    role: 'Product Design'
  },
  {
    name: 'Kiril Mihaylov',
    role: 'Rust Engineer'
  },
  {
    name: 'Denislav Ivanov',
    role: 'Go Engineer'
  },
  {
    name: 'Ivan Ivanov',
    role: 'Go Engineer'
  },
  {
    name: 'Desislava Paunova',
    role: 'QA Engineer'
  },
  {
    name: 'Alexander Makedonski',
    role: 'Web3 Engineer'
  },
  {
    name: 'Lyubomir Blagov',
    role: 'Web3 Engineer'
  },
  {
    name: 'Alexander Efremov',
    role: 'Data Scientist'
  },
]

onMounted(() => {
  if (window.matchMedia("(min-width: 768px)").matches) {
    const source = document.createElement('source');
    source.src = animatedLogo;
    source.type = "video/mp4";
    videoRef.value.appendChild(source);

    let video = videoRef.value;
    let canvas = canvasRef.value;
    let context = canvas.getContext('2d', { willReadFrequently: true });

    video.addEventListener('loadeddata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    });

    video.addEventListener('play', () => {
      intervalId = setInterval(() => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        let pixelData = context.getImageData(10, 10, 1, 1).data;
        let color = `${pixelData[0]},${pixelData[1]},${pixelData[2]}`;
        if (heroWrapper.value) {
          heroWrapper.value.style.backgroundColor = `rgb(${color})`;
        }
      }, 30); // Capture every second
    });
  }
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  if (videoRef.value) {
    videoRef.value.removeEventListener('loadeddata');
    videoRef.value.removeEventListener('play');
  }
});
</script>
