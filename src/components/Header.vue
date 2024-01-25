<template v-on:scroll="console.log('something')">
  <header v-bind:class="y>0?'bg-white/90 backdrop-blur-2xl backdrop-contrast-125 shadow-[0_-1px_1px_inset_rgba(0,0,0,0.3),0_16px_20px_rgba(0,0,0,0.1)]':''" class="fixed inset-x-0 top-0 z-50 transition-all">
      <nav class="flex items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a class="h-8 w-auto" href="/">
            <span class="sr-only">Nolus Protocol</span>
            <img class="w-full h-full" src="../assets/logo.svg" alt="" aria-hidden="true" />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-8">
          <div v-for="item in navigation" :key="item.name">
            <router-link 
              v-if="item.internal" 
              :key="item.name" 
              :to="item.href" 
              class="block rounded-lg px-3 py-2 text-base font-medium  text-neutral-900 hover:bg-neutral-300/30 transition-all"
              active-class="bg-neutral-300/30"
            >
              {{ item.name }}
            </router-link>
            <a v-else :href="item.href" class="leading-6 font-medium text-neutral-900 tracking-tight rounded-lg hover:bg-neutral-200/40 transition-all">
              <component :is="item.name">{{ item.name}}</component>
            </a>
          </div>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4 h-5">
          <Button size="sm" v-bind:class="y==0?'hidden':''" :icon="ArrowTopRightOnSquareIcon" link="https://app.nolus.io/">Launch dApp</Button>
          <a href="#" class="font-medium leading-6 text-neutral-900">EN</a>
        </div>
        
      </nav>
      <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50" />
        <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-neutral-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div v-for="item in navigation" class="space-y-2 py-6">
                <router-link 
                  v-if="item.internal" 
                  :key="item.name" 
                  :to="item.href" 
                  class="block rounded-lg px-3 py-2 text-base font-medium  text-neutral-900 hover:bg-gray-50"
                  active-class="active"
                >
                  {{ item.name }}
                </router-link>
                <a v-else :key="item.name" :href="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base font-medium  text-neutral-900 hover:bg-gray-50">{{ item.name }}</a>
              </div>
              <div class="py-6">
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium  text-neutral-900 hover:bg-gray-50">Log in</a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
</template>

<script setup>
defineProps({
  currentPage: {
    type: String,
    default: "home"
  }
})

import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid'
import Button from './Button.vue'
import PopoverEducational from './PopoverEducational.vue'
import PopoverResources from './PopoverResources.vue'
import { useWindowScroll } from '@vueuse/core'
const { x, y } = useWindowScroll()
console.log(x.value) // read current x scroll value
y.value = 100 // scroll y to 100

const navigation = [
  { id: 1, type: "link", name: 'About', href: '/about', internal: true },
  { id: 2, type: "link", name: 'Governance', href: '/governance', internal: true },
  { id: 3, type: "menu", name: PopoverEducational, internal: false },
  { id: 4, type: "menu", name: PopoverResources, internal: false },
]

const mobileMenuOpen = ref(false);

</script>