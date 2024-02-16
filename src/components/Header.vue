<template>
  <DialogTest />
  <header :class="{'backdrop-blur-xl bg-gradient-to-b from-neutral-100 to-white lg:bg-white shadow-lg': isHeaderScrolled}" class="fixed inset-x-0 top-0 z-50 transition-all">
      <nav class="flex items-center justify-between lg:py-4 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a class="h-8 w-auto p-4 flex items-center" href="/">
            <span class="sr-only">Nolus Protocol</span>
            <component :is='NolusLogoSymbol' class="h-8 fill-orange-400 mr-3" alt="" aria-hidden="true"></component>
            <component :is='NolusLogoType' class="h-6" :class="fillColorClass" alt="" aria-hidden="true"></component>
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="p-4 py-5 inline-flex items-center justify-center hover:bg-neutral-200/50" :class="textColorClass" @click="isOpen = true">
            <span class="sr-only">Open main menu</span>
            <BarsIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-8">
          <div v-for="item in navigationWithTextColorClass" :key="item.name">
            <router-link 
              v-if="item.internal" 
              :key="item.name" 
              :to="item.href" 
              class="block rounded-lg px-3 py-2 text-base font-medium hover:bg-neutral-200/50 transition-all"
              :class="textColorClass"
              active-class="bg-neutral-200/40"
            >
              {{ item.name }}
            </router-link>
            <a v-else :href="item.href" class="font-medium text-neutral-900 tracking-tight rounded-lg hover:bg-neutral-200/50 transition-all">
              <component :is="item.name" :textColorClass="item.textColorClass" :fillColorClass="item.fillColorClass">{{ item.name}}</component>
            </a>
          </div>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4 h-5">
          <Button size="sm" v-bind:class="y==0?'hidden':''" :icon="SquareArrowUpRightSolidIcon" link="https://app.nolus.io/" class=""><span class="hidden xl:inline">Launch</span> dApp</Button>
          <PopoverLanguagePicker v-bind="{ textColorClass, bgColorClass, fillColorClass, isHeaderScrolled, isHeroDark }" />
        </div>
        
      </nav>
      <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" class="lg:hidden" @close="isOpen = false" >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 -translate-y-4 scale-95 md:translate-y-0 md:translate-x-12 md:scale-100"
            enter-to="opacity-100 translate-y-0 md:translate-x-0 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0 -translate-y-4 scale-95 md:translate-y-0 md:translate-x-12 md:scale-100"
          >
            <DialogPanel class="h-full flex flex-col justify-between fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-neutral-100/80 backdrop-blur-xl sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div>
                <div class="flex items-center justify-between">
                  <button type="button" class="w-full px-4 py-6 border-b border-neutral-200/50 hover:bg-neutral-200/60  text-neutral-700" @click="isOpen = false">
                    <span class="sr-only">Close menu</span>
                    <CrossIcon class="h-4 w-4 mx-auto fill-neutral-800" aria-hidden="true" />
                  </button>
                </div>
                <div class="mt-8 flex flex-col gap-y-4 px-4">
                  <div><router-link 
                      :key="home" 
                      :to="'/'" 
                      class="block rounded-2xl px-5 py-5 text-lg font-medium text-neutral-900 hover:bg-gray-50"
                      active-class="bg-white shadow-lg"
                      @click="isOpen = false"
                    >Home</router-link></div>
                  <div v-for="item in navigation">
                    <router-link 
                      v-if="item.internal" 
                      :key="item.name" 
                      :to="item.href" 
                      class="block rounded-2xl px-5 py-5 text-lg font-medium text-neutral-900 hover:bg-gray-50"
                      active-class="bg-white shadow-lg"
                      @click="isOpen = false"
                    >
                      {{ item.name }}
                    </router-link>
                    <a v-else :key="item.name" :href="item.href" class="text-lg font-medium"><component :is="item.name" :textColorClass="item.textColorClass" :fillColorClass="item.fillColorClass">{{ item.name}}</component></a>
                  </div>
                </div>
              </div>
              <div class="bottom-0 w-full flex justify-between items-center mt-16 px-4 py-4">
                <Button size="md" :icon="SquareArrowUpRightSolidIcon" link="https://app.nolus.io/">Launch dApp</Button>
                <PopoverLanguagePicker v-bind="{ bgColorClass: 'bg-white', fillColorClass: 'fill-neutral-900' }" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </TransitionRoot>
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
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
import BarsIcon from '@/assets/icons/bars.svg'
import CrossIcon from '@/assets/icons/cross.svg'
import  SquareArrowUpRightSolidIcon from '@/assets/icons/square-arrow-up-right-solid.svg'
import NolusLogoSymbol from '@/assets/images/logo-symbol.svg'
import NolusLogoType from '@/assets/images/logo-type.svg'
import Button from './Button.vue'
import PopoverEducational from './PopoverEducational.vue'
import PopoverResources from './PopoverResources.vue'
import PopoverLanguagePicker from './PopoverLanguagePicker.vue'
import { useWindowScroll } from '@vueuse/core'

const { x, y } = useWindowScroll()

const navigation = [
  { id: 1, type: "link", name: 'About', href: '/about', internal: true },
  { id: 2, type: "link", name: 'Governance', href: '/governance', internal: true },
  { id: 3, type: "menu", name: PopoverEducational, internal: false },
  { id: 4, type: "menu", name: PopoverResources, internal: false },
]

const isOpen = ref(false);

function setIsOpen(value) {
  isOpen.value = value
}

const router = useRouter();

const isHeaderScrolled = computed(() => y.value > 0 ? true : false)
const isHeroDark = computed(() => router.currentRoute.value.name === 'about' ? true : false)

const textColorClass = computed(() => isHeroDark.value && !isHeaderScrolled.value ? 'text-white' : 'text-neutral-900')
const fillColorClass = computed(() => isHeroDark.value && !isHeaderScrolled.value ? 'fill-white' : 'fill-neutral-900')
const bgColorClass = computed(() => isHeroDark.value && !isHeaderScrolled.value ? 'bg-blue-900/70' : 'bg-white')

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