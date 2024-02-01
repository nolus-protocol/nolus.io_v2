<template>
  <div class="bg-white">


    <main class="isolate">
      <!-- Hero section -->
      <div class="overflow-hidden relative isolate -z-10 bg-[#0D377F] pt-40 pb-32">
          <NolusContainer>
            <!-- <img :src="aboutHeader" alt="" class="absolute w-[700px] -right-12" /> -->
            <component :is="dots" class="absolute -right-[325px] -top-12 w-3/5" />
            <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div class="w-full max-w-xl lg:shrink-0 xl:max-w-3xl">
                <h1 class="text-5xl font-bold tracking-tight text-white leading-tight" v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="100">Nolus Protocol offers a Web3 financial suite with an innovative Lease solution to advance DeFi</h1>
                <div class="flex gap-x-12">
                  <p class="basis-1/2 relative mt-6 text-lg leading-8 text-white sm:max-w-md lg:max-w-lg" v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="200">A semi-permissioned blockchain connecting lenders and borrowers in DeFi. Borrowers secure up to 150% financing with DeFi Lease, accessing leveraged assets via whitelisted strategies.</p>
                <p class="basis-1/2 relative mt-6 text-lg leading-8 text-white sm:max-w-md lg:max-w-lg" v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="300">Nolus reimagines leasing, mirroring traditional models to reduce DeFi's over-collateralization. This enhances capital efficiency and improves borrower terms.</p>
                </div>
              </div>
            </div>
          </NolusContainer> 
      </div>        

      <NolusContainer>
        <div class="mx-auto py-24 max-w-2xl lg:mx-0 lg:max-w-none">
          <div class="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
              <div class="grid grid-cols-3 gap-x-10 gap-y-8">
                <div>
                  <component :is="icon1" class="h-24 w-24"></component>
                  <h2 class="text-3xl mt-8 font-bold tracking-tight text-neutral-900 sm:text-2xl mb-3">Vision</h2>
                  <p class="text-md leading-7 text-neutral-800">We believe in a future where everyone will have the means to efficiently manage their wealth in decentralized, permissionless financial systems that create equal opportunities for prosperity</p>
                </div>
                <div>
                  <component :is="icon1" class="h-24 w-24"></component>
                  <h2 class="text-3xl mt-8 font-bold tracking-tight text-neutral-900 sm:text-2xl mb-3">Mission</h2>
                  <p class="text-md leading-7 text-neutral-800">At Nolus, we are committed to propelling the adoption of decentralized financial systems. Our approach centers on crafting user-centric solutions, harnessing the potential of DeFi.</p>
                </div>
                <div>
                  <component :is="icon1" class="h-24 w-24"></component>
                  <h2 class="text-3xl mt-8 font-bold tracking-tight text-neutral-900 sm:text-2xl mb-3">Values</h2>
                  <p class="text-md leading-7 text-neutral-800">Nolus commits to bring mainstream adoption of that notion by creating novel user experience-driven solutions harnessing the power of DeFi</p>
                </div>
              </div>
            </div>
          </div>
      </NolusContainer>

      <!-- <NolusContainer>
        <div class="bg-white pt-32">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              <div v-for="stat in stats" :key="stat.id" class="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt class="text-base leading-7 text-neutral-600">{{ stat.description }}</dt>
                <dd class="order-first text-3xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">{{ stat.value }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </NolusContainer> -->

      <!-- Team section -->
      <div class="bg-neutral-100 py-24">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div class="basis-2/5 shrink-0 mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">Our team</h2>
          </div>
          <div class="basis-3/5 shrink-0">
            <ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <li v-for="person in people" :key="person.name" class="group flex items-center py-4 px-4 rounded-2xl hover:bg-white transition-all">
                <img class="mr-5 h-32 w-32 rounded-full grayscale brightness-110 group-hover:grayscale-0 shadow-xl" :src="person.imageUrl" alt="" />
                <div>
                  <h3 class="text-base font-semibold leading-7 tracking-tight text-neutral-900">{{ person.name }}</h3>
                  <p class="text-sm leading-6 text-neutral-600">{{ person.role }}</p>
                  <ul role="list" class="mt-6 flex gap-x-6">
                    <li>
                      <a :href="person.xUrl" class="text-neutral-400 hover:text-neutral-500">
                        <span class="sr-only">X</span>
                        <component :is="xIcon" class="h-5 w-5 fill-neutral-500"></component>
                      </a>
                    </li>
                    <li>
                      <a :href="person.linkedinUrl" class="">
                        <span class="sr-only">LinkedIn</span>
                        <component :is="linkedinIcon" class="h-5 w-5 fill-neutral-500"></component>
                      </a>
                    </li>
                    <li>
                      <a :href="person.discordUrl" class="text-neutral-400 hover:text-neutral-500">
                        <span class="sr-only">Discord</span>
                        <component :is="discordIcon" class="h-5 w-5 fill-neutral-500"></component>
                      </a>
                    </li>
                  </ul>
                  </div>
              </li>
            </ul>
            <ul role="list" class="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              <li v-for="person in people_more" :key="person.name" class="">
                <h3 class="mt-6 text-base font-semibold leading-7 tracking-tight text-neutral-900">{{ person.name }}</h3>
                <p class="text-sm leading-6 text-neutral-600">{{ person.role }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Logo cloud -->
      <div class="relative isolate -z-10 py-32 bg-neutral-900 overflow-hidden">
          <div class="absolute -bottom-64 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
            <div class="relative aspect-[1/1] w-[36.125rem] bg-gradient-to-r from-neutral-600 to-neutral-950 opacity-50" style="clip-path: circle(50%);"></div>
          </div>
          <div class="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
            <div class="relative aspect-[1/1] w-[36.125rem] bg-gradient-to-r from-neutral-800 to-neutral-600 opacity-50" style="clip-path: circle(50%);"></div>
          </div>
          <NolusContainer>
            <div class="mx-auto grid max-w-lg grid-cols-4 justify-center items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <img class="mx-auto w-4/5" src="/assets/images/about/partners/cogitent_ventures.png" alt="Cogitent Ventures"  />
              <img class="mx-auto w-4/5" src="/assets/images/about/partners/cointelegraph.svg" alt="CoinTelegraph" />
              <img class="mx-auto w-4/5" src="/assets/images/about/partners/dorahacks.svg" alt="DoraHacks" />
              <img class="mx-auto w-4/5" src="/assets/images/about/partners/tokenmetrics.svg" alt="TokenMetrics" />
              <img class="mx-auto w-4/5" src="/assets/images/about/partners/kahuna.svg" alt="Kahuna" />
              <img class="mx-auto w-4/5" src="/assets/images/about/partners/everstake.svg" alt="Everstake" />
              <img class="mx-auto w-4/5" src="/assets/images/about/partners/block_builders.svg" alt="BlockBuilders" />
              <img class="mx-auto w-4/5" src="/assets/images/about/partners/gt_capital.svg" alt="GT Capital" />
              <img class="mx-auto w-4/5" src="/assets/images/about/partners/01node.svg" alt="01Node" />
              <img class="mx-auto w-4/5" src="/assets/images/about/partners/autonomy_capital.svg" alt="Autonomy Capital" />
            </div>
          </NolusContainer>
      </div>

      
    </main>
  </div>
</template>

<script setup>
import { defineComponent, h, ref } from 'vue'
import NolusContainer from '@/components/NolusContainer.vue';
import xIcon from '@/assets/icons/x.svg';
import linkedinIcon from '@/assets/icons/linkedin.svg';
import discordIcon from '@/assets/icons/discord.svg';
import aboutHeader from '@/assets/images/about/about-header.png';
import dots from '@/assets/images/dots.svg';
import icon1 from  '@/assets/images/icon1.svg';
import KamenTrendafilov from '@/assets/images/about/team/kamen_trendafilov.jpg';
import GanchoManev from '@/assets/images/about/team/gancho_manev.jpg';
import IvanKostov from '@/assets/images/about/team/ivan_kostov.jpg';
import MetodiManov from '@/assets/images/about/team/metodi_manov.jpg';
import SimonChadwick from '@/assets/images/about/team/simon_chadwick.jpg';
import BilyanaChristova from '@/assets/images/about/team/bilyana_christova.jpg';
import NenaAlba from '@/assets/images/about/team/nena_alba.jpg';
import KrumChristov from '@/assets/images/about/team/krum_christov.jpg';

const stats = [
  { id: 1, subtitle: 'Total value', description: 'Value locked across 15 assets distributed over 2 networks', value: '$1,170,869' },
  { id: 2, subtitle: 'APR Lease', description: 'Fixed interest for the entire term of a Lease Position', value: '14.00%' },
  { id: 3, subtitle: 'APR Yield', description: 'Real yield interest returns on lent stablecoins', value: '6.24%' },
]
const people = [
  {
    name: 'Kamen Trendafilov',
    role: 'Finance',
    imageUrl: KamenTrendafilov,
  },
  {
    name: 'Gancho Manev',
    role: 'Tech Lead',
    imageUrl: GanchoManev,
  },
  {
    name: 'Ivan Kostov',
    role: 'Product Development',
    imageUrl: IvanKostov,
  },
  {
    name: 'Metodi Manov',
    role: 'Product Development',
    imageUrl: MetodiManov,
  },
  {
    name: 'Simon Chadwick',
    role: 'Investor Relations',
    imageUrl: SimonChadwick
  },
  {
    name: 'Bilyana Christova',
    role: 'Business Development',
    imageUrl: BilyanaChristova
  },
  {
    name: 'Nena Alba',
    role: 'Growth',
    imageUrl: NenaAlba
  },
  {
    name: 'Ves Zahariev',
    role: 'Social & Marketing',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Krum Christov',
    role: 'Marketing & Community',
    imageUrl: KrumChristov
  },
]
const people_more = [
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

const mobileMenuOpen = ref(false)
</script>