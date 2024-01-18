<template>
  <div class="relative isolate overflow-hidden" style="background: #F7F9FD">
    <div class="text-center w-full h-full absolute inset-0 -z-10 -translate-y-12 flex">
      <video muted="true" autoplay="false" playsinline="" class="video-presentation js-video mobile-video mx-auto" data-timing="7" data-wait="240" style="margin-top: 0vh;transform: rotateY(180deg)">
      <source src="https://nolus.io/theme/assets/video/header_animation.8a9a5501bc12a75ade98.mp4" type="video/mp4">
    </video>
    </div>
    <div class="absolute inset-x-0 -bottom-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-bottom-20" aria-hidden="true">
    <!-- <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange-300 to-blue-400 opacity-30 sm:left-[calc(40%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(3% 43%, 16% 21%, 37% 35%, 61% 22%, 55% 54%, 91% 44%, 76% 68%, 40% 72%, 29% 51%);" /> -->
    </div>
    <div class="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:px-8 lg:pt-32 lg:pb-16">
      <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-2xl lg:flex-shrink-0 lg:pt-8">
        <h1 class="mt-10 text-4xl font-bold tracking-tight text-neutral-900 sm:text-7xl "
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
        >Triple your holdings without tripling your risk! Unlock the full potential of your assets</p>
        <div class="mt-10 flex items-center gap-x-3"
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :variants="{ custom: { scale: 2 } }"
          :delay="400"
        >
          <Button size="lg" variant="primary" link="https://example.org">
            Launch dApp
          </Button>
          <Button size="lg" variant="clean">
            Watch explainer
          </Button>
        </div>
      </div>
      <div class="py-16 sm:py-16 max-w-4xl">
          <div class="mx-auto max-w-7xl px-6 lg:px-0">
            <dl class="grid grid-cols-1 gap-y-16 lg:grid-cols-3 rounded-xl shadow-2xl shadow-blue-100">
              <div v-for="stat in stats" :key="stat.id" class="mx-auto flex max-w-xs flex-col gap-y-3 px-8 py-8 bg-white border border-neutral-100"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, scale: 1 }"
              :variants="{ custom: { scale: 2 } }"
              :delay="stat.id*100"
              >
                <dt class="text-base leading-6 text-neutral-600">{{ stat.name }}</dt>
                <dd class="order-first text-3xl font-bold tracking-tight text-neutral-900">{{ stat.value }}</dd>
              </div>
            </dl>
          </div>
        </div>   
    </div>
  </div>
  
</template>

<script setup>
import Button from '../../components/Button.vue'

const stats = [
  { id: 1, name: 'Value locked across 15 assets distributed over 2 networks', value: '$1,170,869' },
  { id: 2, name: 'Fixed interest for the entire term of a Lease Position', value: '14.00% APR Lease' },
  { id: 3, name: 'Real yield interest returns on lent stablecoins', value: '6.24% APR Yield' },
]
</script>