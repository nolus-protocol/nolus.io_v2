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
            <component :is="feature.icon" class="h-24 w-24"></component>
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
import icon1 from  '@/assets/images/general-value-propositions/icon1.svg';
import icon2 from  '@/assets/images/general-value-propositions/icon2.svg';
import icon3 from  '@/assets/images/general-value-propositions/icon3.svg';
import NolusContainer from '../../components/NolusContainer.vue'

const features = [
  {
    name: 'Cost Efficient',
    description:
      'Enter and exit leverage positions with minimal spread and low impact to secure the best prices with no extra costs',
    icon: icon1,
    href: '#',
  },
  {
    name: 'Less Risk',
    description:
      'Partial liquidation engine shields against volatility and full collateral loss while maintaining a healthy loan-to-value ratio',
    icon: icon2,
    href: '#',
  },
  {
    name: 'Effortless',
    description:
      'Seamlessly lease and transition among supported assets into your chosen positions through a simple and intuitive interface',
    icon: icon3,
    href: '#',
  },
]
</script>