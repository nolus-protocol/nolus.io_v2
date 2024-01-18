<template>
  <div class="relative isolate overflow-hidden bg-neutral-100">
    <div class="absolute inset-x-0 -bottom-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-bottom-20" aria-hidden="true">
    <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-white to-white opacity-100 sm:left-[calc(40%-20rem)] sm:w-[72.1875rem]" style="clip-path: polygon(3% 43%, 16% 21%, 37% 35%, 61% 22%, 55% 54%, 91% 44%, 76% 68%, 40% 72%, 29% 51%);" />
    </div>
    <div class="relative mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:px-8 lg:pt-32 lg:pb-16">
      <img class="h-[68rem] w-[68rem] absolute -right-24 top-24 " src="../../assets/nolus-coins.png"
      v-motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :variants="{ custom: { scale: 2 } }"
          :delay="100"
      >

      <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
        <h1 class="mt-10 text-4xl font-bold tracking-tighter  text-blue-900 sm:text-7xl"
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :variants="{ custom: { scale: 2 } }"
          :delay="100"
        >Cross-Chain Lease Protocol</h1>

        
        <p class="mt-6 text-xl leading-8 text-neutral-600"
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :variants="{ custom: { scale: 2 } }"
          :delay="300"
        >Triple your holdings without tripling your risk <br /> Unlock the full potential of your assets</p>
        <div class="mt-10 flex items-center gap-x-3"
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :variants="{ custom: { scale: 2 } }"
          :delay="400"
        >
          <Button size="lg" variant="primary" link="https://example.org" :icon="ArrowTopRightOnSquareIcon">
            
            Launch dApp
          </Button>
          <Button size="lg" variant="secondary" :icon="PlayCircleIcon">
            Watch explainer
          </Button>
        </div>
      </div>
      <div class="sm:py-16 max-w-4xl">
          <dl class="grid grid-cols-1 gap-y-16 lg:grid-cols-3 rounded-xl ">
            <div v-for="stat in stats" :key="stat.id" class="mx-auto flex max-w-xs flex-col gap-y-3 pr-8 py-8"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            :variants="{ custom: { scale: 2 } }"
            :delay="stat.id*100"
            >
              <dt class="text-base leading-6 text-neutral-600">{{ stat.description }}</dt>
              <dt class="leading-3 order-first text-orange-400 font-medium">{{ stat.subtitle }}</dt>
              <dd class="order-first text-3xl font-bold tracking-tight text-neutral-900">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>   
    </div>
    <!-- <svg class="absolute inset-0 bottom-0 -z-10 h-full w-full stroke-neutral-200 [mask-image:radial-gradient(65%_75%_at_bottom_left,white,transparent)]" aria-hidden="true">
      <defs>
        <pattern id="0787a7c5-978c-4f66-83c7-11c213f99cb7" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" stroke-width="0" fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
    </svg> -->
    <svg width="100%" height="100%" class="absolute bottom-0 left-0 fill-neutral-300 -z-10 [mask-image:radial-gradient(65%_75%_at_bottom_left,white,transparent)]">
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
import { ArrowTopRightOnSquareIcon, PlayCircleIcon } from '@heroicons/vue/24/solid';
import Button from '../../components/Button.vue'

const neshto = "<em>text is here</em>";

const stats = [
  { id: 1, subtitle: 'Total value', description: 'Value locked across 15 assets distributed over 2 networks', value: '$1,170,869' },
  { id: 2, subtitle: 'APR Lease', description: 'Fixed interest for the entire term of a Lease Position', value: '14.00%' },
  { id: 3, subtitle: 'APR Yield', description: 'Real yield interest returns on lent stablecoins', value: '6.24%' },
]
</script>