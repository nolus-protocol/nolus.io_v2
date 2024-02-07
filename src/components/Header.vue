<template>
  <header v-bind:class="[y>0?'bg-white/90 backdrop-blur-2xl backdrop-contrast-125 shadow-lg':'', headerClass]" class="fixed inset-x-0 top-0 z-50 transition-all">
      <nav class="flex items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a class="h-8 w-auto flex items-center" href="/">
            <span class="sr-only">Nolus Protocol</span>
            <component :is='NolusLogoSymbol' class="h-8 fill-orange-400 mr-3" alt="" aria-hidden="true"></component>
            <component :is='NolusLogoType' class="h-6" :class="fillColorClass" alt="" aria-hidden="true"></component>
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-8">
          <div v-for="item in navigationWithTextColorClass" :key="item.name">
            <router-link 
              v-if="item.internal" 
              :key="item.name" 
              :to="item.href" 
              class="block rounded-lg px-3 py-2 text-base font-medium hover:bg-neutral-300/30 transition-all"
              :class="textColorClass"
              active-class="bg-neutral-300/30"
            >
              {{ item.name }}
            </router-link>
            <a v-else :href="item.href" class="font-medium text-neutral-900 tracking-tight rounded-lg hover:bg-neutral-200/40 transition-all">
              <component :is="item.name" :textColorClass="item.textColorClass" :fillColorClass="item.fillColorClass">{{ item.name}}</component>
            </a>
          </div>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4 h-5">
          <Button size="sm" v-bind:class="y==0?'hidden':''" :icon="SquareArrowUpRightSolidIcon" link="https://app.nolus.io/">Launch dApp</Button>
          <a href="#" class="font-medium leading-6" :class="textColorClass">EN</a>
        </div>
        
      </nav>
      <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50"></div>
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

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import  SquareArrowUpRightSolidIcon from '@/assets/icons/square-arrow-up-right-solid.svg'
import NolusLogoSymbol from '@/assets/images/logo-symbol.svg'
import NolusLogoType from '@/assets/images/logo-type.svg'
import Button from './Button.vue'
import PopoverEducational from './PopoverEducational.vue'
import PopoverResources from './PopoverResources.vue'
import { useWindowScroll } from '@vueuse/core'
const { x, y } = useWindowScroll()

const navigation = [
  { id: 1, type: "link", name: 'About', href: '/about', internal: true },
  { id: 2, type: "link", name: 'Governance', href: '/governance', internal: true },
  { id: 3, type: "menu", name: PopoverEducational, internal: false },
  { id: 4, type: "menu", name: PopoverResources, internal: false },
]

const mobileMenuOpen = ref(false);

const router = useRouter();

const headerClass = computed(() => {
  switch (router.currentRoute.value.name) {
    case 'about':
      return 'light-header'
    default:
      return 'dark-header'
  }
})

const textColorClass = computed(() => {
  if (headerClass.value === 'light-header' && y.value <= 0) {
    return 'text-white'
  } else {
    return 'text-neutral-900'
  }
})
const fillColorClass = computed(() => {
  if (headerClass.value === 'light-header' && y.value <= 0) {
    return 'fill-white'
  } else {
    return 'fill-neutral-900'
  }
})

const navigationWithTextColorClass = computed(() => {
  return navigation.map(item => {
    if (item.name === PopoverEducational || item.name === PopoverResources) {
      return {
        ...item,
        textColorClass: textColorClass.value,
        fillColorClass: fillColorClass.value
      }
    } else {
      return item
    }
  })
})

</script>