<template>
  <main class="transition-opacity duration-300" :class="{ 'opacity-0': !pageReady }">
    <Hero />
    <GeneralValuePropositions />
    <HubsAndAudits />
    <ProductValuePropositions />
    <Testimonials />
  </main>
</template>

<script lang="ts" setup>
import { usePageReady } from "@/composables/usePageReady";
import Hero from "./HomePartials/Hero.vue";
import GeneralValuePropositions from "./HomePartials/GeneralValuePropositions.vue";
import HubsAndAudits from "./HomePartials/HubsAndAudits.vue";
import ProductValuePropositions from "./HomePartials/ProductValuePropositions.vue";
import Testimonials from "./HomePartials/Testimonials.vue";

const { pageReady } = usePageReady();
</script>
