<template>
  <div class="bg-white">
    <main class="isolate">
      <!-- Hero section -->
      <div class="overflow-hidden relative isolate -z-10 bg-[#203A80] pt-40 pb-32" id="hero-wrapper">
          <NolusContainer>
            <div>
                <video @loadeddata="isVideoLoaded = true" @play="onVideoPlay" :class="{ invisible: !isVideoLoaded, visible: isVideoLoaded }" muted autoplay playsinline class="absolute -right-[250px] -top-16 -z-10 mx-auto" data-timing="7" data-wait="240" style="width: 1000px"  aria-hidden="true" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, }" :delay="100" :poster='videoPoster'>
                  <source :src="animatedLogo" type="video/mp4">
                </video>
              <img v-if="!isVideoLoaded" :src="videoPoster" alt="Video loading..." class="absolute -right-[250px] -top-16 -z-10 mx-auto" style="width: 1000px" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, }" :delay="100" />
            </div>
            <!-- <div>
              <img :src="logoTunnel" alt="" class="absolute h-full -right-[350px]" />
              <img :src="logoTunnelBalls" alt="" class="absolute h-full right-[200px]" />
            </div> -->
            <!-- <component :is="dots" class="absolute -right-[325px] -top-12 w-3/5" /> -->
            <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div class="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1 class="text-5xl font-bold tracking-tight text-white leading-tight" v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="100">Nolus Protocol offers a Web3 financial suite with an innovative Lease solution to advance DeFi</h1>
                <div class="flex gap-x-8">
                  <p class="basis-1/2 relative mt-6 text-lg leading-8 text-white sm:max-w-md lg:max-w-lg" v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="200">A semi-permissioned blockchain connecting lenders and borrowers in DeFi. Borrowers secure up to 150% financing with DeFi Lease, accessing leveraged assets via whitelisted strategies.</p>
                <p class="basis-1/2 relative mt-6 text-lg leading-8 text-white sm:max-w-md lg:max-w-lg" v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="300">Nolus reimagines leasing, mirroring traditional models to reduce DeFi's over-collateralization. This enhances capital efficiency and improves borrower terms.</p>
                </div>
              </div>
            </div>
          </NolusContainer> 
      </div>        

      <!-- Vision, mission and values -->
      <NolusContainer>
        <div class="mx-auto py-24 max-w-2xl lg:mx-0 lg:max-w-none">
          <div class="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
              <div class="grid grid-cols-3 gap-x-10 gap-y-8">
                <div v-for="(item, index) in visionMisionAndValues" :key="index">
                  <component :is="item.icon" class="h-24 w-24"></component>
                  <h2 class="text-3xl mt-8 font-bold tracking-tight text-neutral-900 sm:text-2xl mb-3">{{ item.name }}</h2>
                  <p class="text-md leading-7 text-neutral-800">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
      </NolusContainer>

      <!-- Team section -->
      <div class="bg-neutral-100 py-24">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div class="basis-2/5 shrink-0 mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">Our team</h2>
          </div>
          <div class="basis-3/5 shrink-0">
            <!-- Core contributors -->
            <ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <li v-for="person in core_contributors" :key="person.name" class="group flex items-center py-4 px-4 rounded-2xl hover:bg-white hover:shadow-xl transition-all">
                <img class="mr-5 h-32 w-32 rounded-full grayscale brightness-110 group-hover:grayscale-0" :src="person.imageUrl" alt="" />
                <div>
                  <h3 class="text-base font-semibold leading-7 tracking-tight text-neutral-900">{{ person.name }}</h3>
                  <p class="text-sm leading-6 text-neutral-600">{{ person.role }}</p>
                  <!-- <ul role="list" class="flex gap-x-2 mt-2">
                    <li>
                      <a :href="person.xUrl" class="text-neutral-400 fill-neutral-500 hover:fill-neutral-900 p-3 block bg-neutral-50 rounded-full transition-all hover:fill-blue-600 hover:bg-blue-100">
                        <span class="sr-only">X</span>
                        <component :is="xIcon" class="h-6 w-6 "></component>
                      </a>
                    </li>
                    <li>
                      <a :href="person.discordUrl" class="text-neutral-400 fill-neutral-500 p-3 block bg-neutral-50 rounded-full transition-all hover:fill-blue-600 hover:bg-blue-100">
                        <span class="sr-only">Discord</span>
                        <component :is="discordIcon" class="h-6 w-6 "></component>
                      </a>
                    </li>
                  </ul> -->
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
            <div class="mx-auto grid max-w-lg grid-cols-4 justify-center items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
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

<script setup>
import { ref } from 'vue';
import NolusContainer from '@/components/NolusContainer.vue';

// Icons and illustrations
import xIcon from '@/assets/icons/x.svg';
import discordIcon from '@/assets/icons/discord.svg';
import dots from '@/assets/images/dots.svg';
import icon1 from  '@/assets/images/icon1.svg';
import logoTunnel from '@/assets/images/about/logo-tunnel.png';
import logoTunnelBalls from '@/assets/images/about/logo-tunnel-balls.png';
import animatedLogo from '@/assets/videos/animated-logo.mp4';
import videoPoster from '@/assets/videos/animated-logo.jpg';

// Logo dependencies

const isVideoLoaded = ref(false);

// Define vision, mission and values
const visionMisionAndValues = [
  {
    icon: icon1,
    name: 'Vision',
    description:
      'We believe in a future where everyone will have the means to efficiently manage their wealth in decentralized, permissionless financial systems that create equal opportunities for prosperity',
  },
  {
    icon: icon1,
    name: 'Mission',
    description:
      'At Nolus, we are committed to propelling the adoption of decentralized financial systems. Our approach centers on crafting user-centric solutions, harnessing the potential of DeFi.',
    href: '#',
  },
  {
    icon: icon1,
    name: 'Values',
    description:
      'Nolus commits to bring mainstream adoption of that notion by creating novel user experience-driven solutions harnessing the power of DeFi',
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
    name: 'Bilyana Christova',
    role: 'Business Development',
    imageUrl: '/assets/images/about/team/bilyana_christova.jpg',
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
    role: 'Marketing & Community',
    imageUrl: '/assets/images/about/team/krum_christov.jpg',
    xUrl: '',
    discordUrl: ''
  },
]

// Define other contributors
const other_contributors = [
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
    role: 'Quality Assurance Engineer'
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
    role: 'Data Science'
  },
  {
    name: 'Felicity',
    role: 'Community'
  },
]
</script>