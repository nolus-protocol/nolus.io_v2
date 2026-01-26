<template>
  <div class="relative isolate overflow-hidden bg-neutral-50 py-16 lg:py-24">
    <NolusContainer>
      <div class="mx-auto">
        <!-- <p class="text-lg font-medium leading-8 tracking-tight text-blue-600" aria-hidden="true"></p> -->
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">{{ $t('home_testimonialsHeading') }}</h2>
      </div>
      <div class="mx-auto mb-8 mt-12 grid grid-cols-1 gap-x-20 gap-y-16 md:mt-16 md:grid-cols-2">
        <figure
          v-for="testimonial in displayedTestimonials"
          :key="testimonial.id"
          class="motion-hidden divide-y"
          v-motion
          :initial="{ opacity: 0, y: -100 }"
          :enter="{ opacity: 1, y: 0, scale: 1, transition: { duration: 400 } }"
          :leave="{ opacity: 0, y: 100 }"
        >
          <blockquote class="text-base leading-8 text-neutral-900 md:text-xl md:leading-9">
            <p>{{ testimonial.body }}</p>
          </blockquote>
          <figcaption class="mt-6 flex items-center gap-x-4 pt-4 text-sm">
            <div>
              <span class="mr-1 font-medium">{{ testimonial.author.name }}</span>
              <a
                :href="testimonial.author.link"
                class="block text-blue-700 hover:text-neutral-900"
                >{{ $t('home_testimonialsViewSource', { source: testimonial.author.where }) }}</a
              >
            </div>
          </figcaption>
        </figure>
      </div>
      <Button
        variant="secondary"
        :icon="PlusSmallIcon"
        size="md"
        v-if="testimonialsToShow < testimonials.length"
        @click="loadMore"
        class="mt-4"
        >{{ $t('common_loadMore') }}</Button
      >
    </NolusContainer>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import Button from "@/components/Button.vue";
import PlusSmallIcon from "@/assets/icons/plus-small.svg";
import NolusContainer from "@/components/NolusContainer.vue";

const testimonialsToShow = ref(2);

function loadMore() {
  testimonialsToShow.value += 2; // Increase by 2 each time
}

const testimonials = [
  {
    id: 1,
    body: "By combining efficient lending practices with novel features like reduced liquidation thresholds and the partial liquidation mechanism, Nolus offers a safer and more intuitive experience for crypto traders looking to leverage DeFi opportunities",
    author: {
      name: "CoinTelegraph",
      where: "https://cointelegraph.com",
      link: "https://cointelegraph.com/news/how-is-defi-margin-trading-getting-safer-with-this-cross-chain-protocol"
    }
  },
  {
    id: 2,
    body: "Overcollateralized loans lock up collateral that could be used to minimize counterparty risk. DeFi leasing on Nolus mitigates against this",
    author: {
      name: "Decrypt",
      where: "https://decrypt.co",
      link: "https://decrypt.co/resources/what-is-nolus-how-the-defi-leasing-platform-simplifies-crypto-lending"
    }
  },
  {
    id: 3,
    body: "The protocol’s unique approach to financing, combined with its native NLS token’s utility and governance features, creates a compelling ecosystem that incentivizes participation and growth",
    author: {
      name: "Blockonomi",
      where: "https://blockonomi.com",
      link: "https://blockonomi.com/nolus/"
    }
  },
  {
    id: 4,
    body: "Nolus doesn’t reactively liquidate users’ assets when prices fall either. Instead, it liquidates a small percentage (“partial liquidations”) to restore leases to healthy levels",
    author: {
      name: "Coingape",
      where: "https://coingape.com",
      link: "https://coingape.com/blog/the-lay-of-the-land-in-crypto-lending-borrowing-what-to-know-for-todays-bull-run/"
    }
  },
  {
    id: 5,
    body: "In our opinion, Nolus has the potential for significant growth as it seeks to address the limitations of current lending options in the crypto market and offers innovative solutions through its DeFi Lease and Nolus Protocol",
    author: {
      name: "Token Metrics",
      where: "on X",
      link: "https://twitter.com/tmventuresfund/status/1683597424638533632"
    }
  },
  {
    id: 6,
    body: "Interchain account based liquidations on Osmosis. Pretty cool",
    author: {
      name: "Zaki ⚛️🍷",
      where: "on X",
      link: "https://twitter.com/zmanian/status/1671435729925226496"
    }
  },
  {
    id: 7,
    body: "No matter the price in the short term, always look for opportunities from teams who are building and growing the ecosystem! NolusProtocol is a young project, and its had huge growth across the board",
    author: {
      name: "Coach K Crypto",
      where: "on X",
      link: "https://twitter.com/Coachkcrypto/status/1749387979284717771"
    }
  },
  {
    id: 8,
    body: 'I like to call Nolus the "green-candle" appchain. In short, if you\'re bullish on an asset like ATOM or TIA but don\'t have as much money as you\'d like to invest, Nolus allows you to "lock the current price," buy, and unlock the assets afterwards',
    author: {
      name: "tøny",
      where: "on X",
      link: "https://twitter.com/tonyler_/status/1745407696352759836"
    }
  },
  {
    id: 9,
    body: "Thanks to Nolus Protocol I am getting low-risk leveraged exposure and staking yield",
    author: {
      name: "Degèn Dantès",
      where: "on X",
      link: "https://twitter.com/DLeveraged/status/1734585896333373766"
    }
  }
];

const displayedTestimonials = computed(() => {
  return testimonials.slice(0, testimonialsToShow.value);
});
</script>
