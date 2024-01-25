<template>
  <div class="relative bg-neutral-100 py-24 sm:py-32 border">
    <NolusContainer class="relative z-10">
      <div class="grid grid-cols-2 items-center max-w-2xl lg:mx-0 lg:max-w-none">
        <div class="lg:max-w-lg">
          <p class="text-base font-medium leading-7 text-blue-600" aria-hidden="true">Deep liquidity</p>
          <h2 class="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl" aria-hidden="true">Deep Liquidity</h2>
          <p class="mt-6 text-lg leading-8 text-neutral-600">Nolus effortlessly taps into multiple liquidity hubs, bypassing the need to build its own. This enables instant asset lending or swapping on any connected DEX</p>
        </div>
        <div>
          <ul class="flex flex-wrap justify-stretch gap-x-4 gap-y-4 w-full mx-auto text-center">
              <li v-for="hub in hubs" :key="hub.id" class="flex-grow basis-32">
                <a class="py-7 px-4 flex flex-col items-center ">
                  <figure class="text-xs w-20 h-20 mx-auto mb-4 bg-white p-4 rounded-full shadow-inner shadow-sm shadow-neutral-200" aria-hidden="true">
                    <component :is="hub.image" :alt='`Logo of ${hub.shortName}`'></component>
                  </figure>
                  <h3 class="text-sm text-neutral-600 leading-3">{{ hub.shortName }}</h3>
                  <p class="text-lg leading-7 tracking-tight text-neutral-900">{{ hub.fullName }}</p>
                </a>
              </li>
            </ul>
        </div>
      </div>
    </NolusContainer>
    <svg width="100%" height="100%" class="absolute bottom-0 left-0 fill-neutral-300 [mask-image:radial-gradient(65%_75%_at_top_left,white,transparent)]">
      <defs>
        <pattern id="dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="2.5"></circle>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)"></rect>
    </svg>
  </div>
</template>

<script setup>
import NolusContainer from '@/components/NolusContainer.vue';
import osmosisImage from '../../assets/images/hubs/osmosis.svg';
import astroportImage from '../../assets/images/hubs/astroport.svg';
import nolusImage from '../../assets/images/hubs/nolus.svg';
import arbitrumImage from '../../assets/images/hubs/arbitrum.svg';

const hubs = [
  {
    id: 1,
    shortName: 'Osmosis',
    fullName: 'Osmosis DEX',
    comingSoon: false,
    image: osmosisImage,
    link: 'https://osmosis.zone/'
  },
  {
    id: 2,
    shortName: 'Neutron',
    fullName: 'Astroport',
    comingSoon: false,
    image: astroportImage,
    link: 'https://astroport.finance/'
  },
]
</script>