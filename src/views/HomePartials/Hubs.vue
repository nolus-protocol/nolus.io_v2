<template>
  <div class="relative border bg-neutral-100 py-24 sm:py-32">
    <NolusContainer class="relative z-10">
      <div class="grid max-w-2xl grid-cols-2 items-center lg:mx-0 lg:max-w-none">
        <div class="lg:max-w-lg">
          <p
            class="text-base font-medium leading-7 text-blue-600"
            aria-hidden="true"
          >
            Deep liquidity
          </p>
          <h2
            class="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl"
            aria-hidden="true"
          >
            Deep Liquidity
          </h2>
          <p class="mt-6 text-lg leading-8 text-neutral-600">
            Nolus effortlessly taps into multiple liquidity hubs, bypassing the need to build its own. This enables
            instant asset lending or swapping on any connected DEX
          </p>
        </div>
        <div>
          <ul class="mx-auto flex w-full flex-wrap justify-stretch gap-x-4 gap-y-4 text-center">
            <li
              v-for="hub in hubs"
              :key="hub.id"
              class="flex-grow basis-32"
            >
              <a class="flex flex-col items-center px-4 py-7">
                <figure
                  class="mx-auto mb-4 h-20 w-20 rounded-full bg-white p-4 text-xs shadow-inner shadow-sm shadow-neutral-200"
                  aria-hidden="true"
                >
                  <component
                    :is="hub.image"
                    :alt="`Logo of ${hub.shortName}`"
                  ></component>
                </figure>
                <h3 class="text-sm leading-3 text-neutral-600">{{ hub.shortName }}</h3>
                <p class="text-lg leading-7 tracking-tight text-neutral-900">{{ hub.fullName }}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </NolusContainer>
  </div>
</template>

<script lang="ts" setup>
import NolusContainer from "@/components/NolusContainer.vue";
import { HUBS } from "@/constants/hubs";

const hubs = HUBS;
</script>
