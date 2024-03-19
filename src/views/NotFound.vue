<template>
  <main class="grid min-h-full place-items-center bg-neutral-100 px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-blue-600">404</p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
      <p class="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for</p>
      <div class="mt-10 flex items-center justify-center gap-x-4">
        <Button>Go back home</Button>
        <Button variant="secondary">Contact support</Button>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import Button from "@/components/Button.vue";
</script>
