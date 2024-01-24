<template>
  <div class="bg-white py-16 pb-24 ">
    <NolusContainer class="relative">
      <div class="mx-auto max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-3 relative z-10">
        <p class="text-blue-500 font-medium" aria-hidden="true">Start today</p>
        <h2 class="text-4xl font-bold tracking-tighter text-neutral-900 mb-16">Why Nolus</h2>
        <div class="col-span-2 grid grid-cols-1 gap-x-16 gap-y-16 sm:grid-cols-3">
          <div v-for="(feature, index) in features" :key="feature.name" class="flex flex-col gap-y-4 h-full rounded-2xl overflow-clip"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0, scale: 1 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            :variants="{ custom: { scale: 2 } }"
            :delay="index*150"
          >
            <figure class="w-full h-auto pb-2 h-40">
              <!-- <img :src="feature.featureImage" aria-hidden="true" alt="" /> -->
            </figure>
            <div class="pb-8" :class="feature.textColor">
              <h3 class="text-2xl font-medium tracking-tight leading-10" :class="feature.titleColor">
                {{ feature.name }}
              </h3>
              <p class="mt-1 text-base" :class="feature.descriptionColor">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="absolute inset-x-0 -bottom-40 -left-16  -z-5 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div class="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-neutral-100 to-blue-100 opacity-100 sm:w-[72.1875rem]" style="clip-path: polygon(3% 43%, 16% 21%, 37% 35%, 61% 22%, 55% 54%, 91% 44%, 76% 68%, 40% 72%, 29% 51%);"></div>
      </div> -->
    </NolusContainer>
    
  </div>
</template>
  
<script setup>
import vp1 from '../../assets/images/value-propositions/vp1.jpg'
import vp2 from '../../assets/images/value-propositions/vp2.jpg'
import vp3 from '../../assets/images/value-propositions/vp3.jpg'
import NolusContainer from '../../components/NolusContainer.vue'

const features = [
  {
    name: 'Cost efficient',
    description:
      'Trade efficiently with minimal spread and price impact, securing optimal prices without extra costs',
    href: '#',
    featureImage: vp1,
  },
  {
    name: 'Less liquidation risk',
    description:
      'Nolus Protocol keeps LTV stable with strategic collateral liquidation, minimizing risk',
    href: '#',
    featureImage: vp2,
  },
  {
    name: 'Seamless',
    description:
      'Lease and transition seamlessly between supported assets with our user-friendly interface',
    href: '#',
    featureImage: vp3,
  },
]
</script>