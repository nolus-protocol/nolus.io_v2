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
      body: 'By combining efficient lending practices with novel features like reduced liquidation thresholds and the partial liquidation mechanism, Nolus offers a safer and more intuitive experience for crypto traders looking to leverage DeFi opportunities',
      author: {
        name: 'CoinTelegraph',
        where: 'https://cointelegraph.com/',
        link: 'https://cointelegraph.com/news/how-is-defi-margin-trading-getting-safer-with-this-cross-chain-protocol',
      },
    },
    {
      body: 'Overcollateralized loans lock up collateral that could be used to minimize counterparty risk. DeFi leasing on Nolus mitigates against this',
      author: {
        name: 'Decrypt',
        where: 'https://decrypt.co/',
        link: 'https://decrypt.co/resources/what-is-nolus-how-the-defi-leasing-platform-simplifies-crypto-lending'
      },
    },
    {
      body: 'In our opinion, Nolus has the potential for significant growth as it seeks to address the limitations of current lending options in the crypto market and offers innovative solutions through its DeFi Lease and Nolus Protocol',
      author: {
        name: 'Token Metrics',
        where: 'on X',
        link: 'https://twitter.com/tmventuresfund/status/1683597424638533632'
      },
    },      
      {
      body: 'Interchain account based liquidations on Osmosis. Pretty cool',
      author: {
        name: 'Zaki ⚛️🍷',
        where: 'on X',
        link: 'https://twitter.com/zmanian/status/1671435729925226496'
      },
    },      
      {
      body: 'No matter the price in the short term, always look for opportunities from teams who are building and growing the ecosystem! NolusProtocol is a young project, and its had huge growth across the board',
      author: {
        name: 'Coach K Crypto',
        where: 'on X',
        link: 'https://twitter.com/Coachkcrypto/status/1749387979284717771'
      },
    },
    {
      body: 'I like to call Nolus the "green-candle" appchain. In short, if you\'re bullish on an asset like ATOM or TIA but don\'t have as much money as you\'d like to invest, Nolus allows you to "lock the current price," buy, and unlock the assets afterwards',
      author: {
        name: 'tøny',
        where: 'on X',
        link: 'https://twitter.com/tonyler_/status/1745407696352759836'
      },
    },
]
const displayedTestimonials = computed(() => {
  return testimonials.slice(0, testimonialsToShow.value);
});
</script>