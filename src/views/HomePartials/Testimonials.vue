<template>
  <div class="relative isolate bg-neutral-50 pb-32 pt-24 sm:pt-32">

    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-xl text-center">
        <p class="text-lg font-medium leading-8 tracking-tight text-blue-600" aria-hidden="true">Testimonials</p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">Dare to know us and you'll love us</h2>
      </div>
      <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-neutral-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
        <figure class="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
          <blockquote class="p-6 text-lg font-medium leading-7 tracking-tight text-gray-900 sm:p-12 sm:text-xl sm:leading-8">
            <p>{{ featuredTestimonial.body }}</p>
          </blockquote>
          <figcaption class="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
            <div class="flex-auto">
              <div class="font-semibold">{{ featuredTestimonial.author.name }}</div>
              <a :href="featuredTestimonial.author.link" class="text-blue-600 hover:text-neutral-900">{{ `${featuredTestimonial.author.where}` }}</a>
            </div>
            <img class="h-10 w-auto flex-none" :src="featuredTestimonial.author.logoUrl" alt="" />
          </figcaption>
        </figure>
        <div v-for="(columnGroup, columnGroupIdx) in testimonials" :key="columnGroupIdx" class="space-y-8 xl:contents xl:space-y-0">
          <div v-for="(column, columnIdx) in columnGroup" :key="columnIdx" :class="[(columnGroupIdx === 0 && columnIdx === 0) || (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1) ? 'xl:row-span-2' : 'xl:row-start-1', 'space-y-8']">
            <figure v-for="testimonial in column" :key="testimonial.author.handle" class="rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
              <blockquote class="text-neutral-900 text-base">
                <p>{{ testimonial.body }}</p>
              </blockquote>
              <figcaption class="mt-6 flex items-center gap-x-4">
                <div>
                  <span class="font-medium mr-1">{{ testimonial.author.name }}</span>
                  <a :href="testimonial.author.link" class="text-blue-500 hover:text-neutral-900 block">View {{ testimonial.author.where }}</a>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
      <div class="coin">
        <div class="tails"></div>
        <div class="head"></div>
      </div>
    </div>
  </div>
</template>



<script setup>
import CoinTelegraph from '../../assets/images/testimonials/Cointelegraph.svg';

const featuredTestimonial = {
  body: 'Crypto lending reinvented: This solution can reduce liquidation and overcollateralization risks. The Nolus protocol represents a promising solution to the major issues hindering the adoption of DeFi lending. With its proactive strategies to mitigate overcollateralization and liquidation risks, Nolus paves the way for a safer and more user-friendly DeFi lending environment.',
  author: {
    name: 'CoinTelegraph',
    where: 'https://cointelegraph.com/',
    link: 'https://cointelegraph.com/press-releases/nolus-protocol-reinvents-crypto-lending-with-its-decentralized-cross-chain-lease-protocol',
    logoUrl: CoinTelegraph,
  },
}
const testimonials = [
  [
    [
      {
        body: 'In our opinion, Nolus has the potential for significant growth as it seeks to address the limitations of current lending options in the crypto market and offers innovative solutions through its DeFi Lease and Nolus Protocol.',
        author: {
          name: 'Token Metrics Ventures',
          where: 'on X',
          link: 'https://twitter.com/tmventuresfund/status/1683597424638533632',
        },
      },
      // More testimonials...
    ],
    [
      {
        body: 'Explore endless possibilities with Nolus. It gets two thumbs up from me for its simplicity and straightforwardness of lending and leasing. 👍 🌐',
        author: {
          name: 'CosmosHOSS',
          where: 'on X',
          link: 'https://twitter.com/CosmosHOSS/status/1721906947879035257'
        },
      },
      // More testimonials...
    ],
  ],
  [
    [
      {
        body: "Just looking at my @NolusProtocol position and it's looking good. Put down $100 axlWETH to open the position. Borrowed $100 to buy more WETH. As WETH is now up 28%, I'm actually up 56% on my initial investment. Defi Lease. Safe 🤜🤛",
        author: {
          name: 'Rebel Defi',
          where: 'on X',
          link: 'https://twitter.com/rebel_defi/status/1731968852286718357'
        },
      },
      // More testimonials...
    ],
    [
      {
        body: '@NolusProtocol $NLS has one of the cleanest IBC user interfaces. There is nowhere else in crypto that moving assets between sovereign chains is this quick and easy',
        author: {
          name: 'Leonard Krasner',
          where: 'on X',
          link: 'https://twitter.com/DLeveraged/status/1713192924731859432 '
        },
      },
      // More testimonials...
    ],
  ],
]
</script>