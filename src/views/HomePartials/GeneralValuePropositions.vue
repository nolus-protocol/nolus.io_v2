<template>
  <div class="bg-gradient-to-b from-white to-neutral-50 py-8 pb-40 md:pb-48">
    <NolusContainer class="relative">
      <div class="relative z-10 mx-auto grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <!-- <p class="text-blue-500 font-medium" aria-hidden="true"></p>
        <h2 class="text-4xl font-bold tracking-tighter text-neutral-900 mb-16"></h2> -->
        <div class="col-span-2 grid grid-cols-1 gap-x-16 gap-y-16 sm:grid-cols-3">
          <div
            v-for="(feature, index) in features"
            :key="feature.name"
            class="h-full overflow-clip rounded-2xl"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0, scale: 1 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            :variants="{ custom: { scale: 2 } }"
            :delay="index * 150"
          >
            <Feature
              :name="feature.name"
              :description="feature.description"
              :icon="feature.icon"
            />
          </div>
        </div>
      </div>
    </NolusContainer>
  </div>
</template>

<script lang="ts" setup>
import NolusContainer from "../../components/NolusContainer.vue";
import Feature from "../../components/Feature.vue";

import icon1 from "@/assets/lotties/cost-efficient.json?url";
import icon2 from "@/assets/lotties/less-risk.json?url";
import icon3 from "@/assets/lotties/effortless.json?url";

const features = [
  {
    name: "Cost Efficient",
    description:
      "Enter and exit leverage positions with minimal spread and low impact to secure the best prices with no extra costs",
    icon: icon1,
    href: "#"
  },
  {
    name: "Less Risk",
    description:
      "Partial liquidation engine shields against volatility and full collateral loss while maintaining a healthy risk factor",
    icon: icon2,
    href: "#"
  },
  {
    name: "Asset Backed",
    description:
      "Positions hold the actual asset, offering greater transparency, lower counterparty risk, and stronger alignment with its value",
    icon: icon3,
    href: "#"
  }
];
</script>
