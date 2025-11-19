<script lang="ts" setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div v-cloak>
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>
