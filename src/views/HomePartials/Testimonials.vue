<template>
  <div class="relative overflow-hidden isolate bg-neutral-50 py-16 lg:py-24">
    <NolusContainer>
      <div class="mx-auto">
        <!-- <p class="text-lg font-medium leading-8 tracking-tight text-blue-600" aria-hidden="true"></p> -->
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">What Others Say</h2>
      </div>
      <div class="mx-auto mt-12 md:mt-16 mb-8 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
        <figure v-for="testimonial in displayedTestimonials" :key="testimonial.author.handle" class="divide-y" v-motion :initial="{ opacity: 0, y: -100 }" :enter="{ opacity: 1, y: 0, scale: 1, transition: {duration: 400} }" :leave="{ opacity: 0, y: 100 }">
          <blockquote class="text-neutral-900 text-base md:text-xl leading-8 md:leading-9">
            <p>{{ testimonial.body }}</p>
          </blockquote>
          <figcaption class="mt-6 flex items-center gap-x-4 text-sm pt-4">
            <div>
              <span class="font-medium mr-1">{{ testimonial.author.name }}</span>
              <a :href="testimonial.author.link" class="text-blue-700 hover:text-neutral-900 block">View {{ testimonial.author.where }}</a>
            </div>
          </figcaption>
        </figure>
      </div>
      <Button variant="secondary" :icon="PlusSmallIcon" size="md" v-if="testimonialsToShow < testimonials.length" @click="loadMore" class="mt-4">Load More</Button>
    </NolusContainer>
  </div>
</template>



<script setup>
import Button from '@/components/Button.vue';
import { onMounted, computed, ref } from 'vue';
import PlusSmallIcon from '@/assets/icons/plus-small.svg';
import NolusContainer from '@/components/NolusContainer.vue';

let testimonialsToShow = ref(2);

function loadMore() {
  testimonialsToShow.value += 2; // Increase by 2 each time
}

const testimonials = [
    {
      body: 'Crypto lending reinvented: This solution can reduce liquidation and overcollateralization risks. The Nolus protocol represents a promising solution to the major issues hindering the adoption of DeFi lending. With its proactive strategies to mitigate overcollateralization and liquidation risks, Nolus paves the way for a safer and more user-friendly DeFi lending environment.',
      author: {
        name: 'CoinTelegraph',
        where: 'https://cointelegraph.com/',
        link: 'https://cointelegraph.com/press-releases/nolus-protocol-reinvents-crypto-lending-with-its-decentralized-cross-chain-lease-protocol',
      },
    },
    {
      body: '@NolusProtocol $NLS has one of the cleanest IBC user interfaces. There is nowhere else in crypto that moving assets between sovereign chains is this quick and easy',
      author: {
        name: 'Leonard Krasner',
        where: 'on X',
        link: 'https://twitter.com/DLeveraged/status/1713192924731859432 '
      },
    },
    {
      body: 'Explore endless possibilities with Nolus. It gets two thumbs up from me for its simplicity and straightforwardness of lending and leasing. 👍 🌐',
      author: {
        name: 'CosmosHOSS',
        where: 'on X',
        link: 'https://twitter.com/CosmosHOSS/status/1721906947879035257'
      },
    },
    {
      body: "Just looking at my @NolusProtocol position and it's looking good. Put down $100 axlWETH to open the position. Borrowed $100 to buy more WETH. As WETH is now up 28%, I'm actually up 56% on my initial investment. Defi Lease. Safe 🤜🤛",
      author: {
        name: 'Rebel Defi',
        where: 'on X',
        link: 'https://twitter.com/rebel_defi/status/1731968852286718357'
      },
    },
]
const displayedTestimonials = computed(() => {
  return testimonials.slice(0, testimonialsToShow.value);
});
</script>