<template>
  <div class="bg-gradient-to-b from-white to-neutral-50 py-16 pb-40 md:pb-48">
    <NolusContainer class="relative">
      <div class="mx-auto grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-3 relative z-10">
        <p class="text-blue-500 font-medium" aria-hidden="true">Start today</p>
        <h2 class="text-4xl font-bold tracking-tighter text-neutral-900 mb-16">Why Nolus</h2>
        <div class="col-span-2 grid grid-cols-1 gap-x-16 gap-y-16 sm:grid-cols-3">
          <div v-for="(feature, index) in features" :key="feature.name" class="h-full rounded-2xl overflow-clip"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0, scale: 1 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            :variants="{ custom: { scale: 2 } }"
            :delay="index*150"
          >
            <component :is="icon1" class="h-24 w-24"></component>
            <h3 class="text-3xl mt-8 font-bold tracking-tight text-neutral-900 sm:text-2xl mb-3">
              {{ feature.name }}
            </h3>
            <p class="text-md leading-7 text-neutral-800">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </NolusContainer>
    
  </div>
</template>
  
<script setup>
import icon1 from  '@/assets/images/icon1.svg';
import NolusContainer from '../../components/NolusContainer.vue'

const features = [
  {
    name: 'Cost efficient',
    description:
      'Trade efficiently with minimal spread and price impact, securing optimal prices without extra costs',
    href: '#',
  },
  {
    name: 'Less liquidation risk',
    description:
      'Nolus Protocol keeps LTV stable with strategic collateral liquidation, minimizing risk',
    href: '#',
  },
  {
    name: 'Seamless',
    description:
      'Lease and transition seamlessly between supported assets with our user-friendly interface',
    href: '#',
  },
]
</script>