<template>
    <Popover class="relative" v-slot="{ open }">
      <PopoverButton class="flex w-full justify-between items-center gap-x-1 py-5 lg:py-2 px-5 lg:px-3 rounded-t-2xl  lg:rounded-lg lg:hover:bg-neutral-200/50 transition-all" :class="{ 'bg-white lg:bg-neutral-200/40 shadow-lg lg:shadow-none': open }">
        <span :class="props.textColorClass">Resources</span>
        <ChevronDownSmallIcon class="h-7 w-7 lg:h-5 lg:w-5 fill-neutral-800 transition-all" :class="[{'rotate-90 lg:rotate-0': !open }, props.fillColorClass]" aria-hidden="true" />
      </PopoverButton>

      <transition enter-active-class="transition ease-in-out duration-200" enter-from-class="opacity-0 translate-y-3 md:scale-95 origin-bottom" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-3 md:scale-95 origin-bottom">
        <PopoverPanel class="lg:absolute lg:left-1/2 lg:z-10 lg:mt-5 flex lg:w-screen max-w-max lg:-translate-x-1/2 lg:px-4 ">
          <div class="w-screen max-w-md flex-auto bg-white rounded-b-2xl lg:rounded-3xl leading-6 shadow-2xl ring-1 ring-neutral-900/5 overflow-hidden p-4">
            <a v-for="item in solutions" :key="item.name" :href="item.href" class="rounded-lg">
                <div class="text-sm group relative flex gap-x-4 rounded-lg p-4 hover:bg-blue-100 transition-all ">
                  <div class=" flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200  transition-all">
                    <component :is="item.icon" class="h-6 w-6 text-blue-500 fill-blue-500" aria-hidden="true" />
                  </div>
                  <div>
                    <p class="font-semibold text-neutral-900">
                      {{ item.name }}
                    </p>
                    <p class="mt-1 font-normal text-neutral-600">{{ item.description }}</p>
                  </div>
                </div>
              </a>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
</template>

<script setup>
import { defineProps } from 'vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import ChevronDownSmallIcon from '@/assets/icons/chevron-down-small.svg'
import GithubIcon from '../assets/icons/github.svg'
import ShieldCheckIcon from '../assets/icons/shield-check.svg'
import ColorPaletteIcon from '../assets/icons/color-palette.svg'
import HeadphonesIcon from '../assets/icons/headphones.svg'
import Newspaper2Icon from '../assets/icons/newspaper-2.svg'

const props = defineProps({
  textColorClass: String,
  fillColorClass: String
})

const solutions = [
  { 
    name: 'Whitepaper', 
    description: 'More about the vision behind Nolus', 
    href: 'https://nolus.io/Nolus-Whitepaper.pdf#',  
    icon: Newspaper2Icon,
  },
  {
    name: 'Tech Documentation',
    description: 'Tailored for developers & validators',
    href: 'https://hub.nolus.io/en_US/technical-documentation',
    icon: HeadphonesIcon,
  },
  { 
    name: 'Github', 
    description: 'Contribute to the development of the protocol', 
    href: 'https://github.com/nolus-protocol',
    icon: GithubIcon,
  },
  { 
    name: 'Audits', 
    description: 'All external security reports', 
    href: 'https://hub.nolus.io/en_US/technical-documentation/security',
    icon: ShieldCheckIcon,
  },
  { 
    name: 'Brand Assets', 
    description: 'The Nolus Protocol brand assets', 
    href: 'https://drive.google.com/drive/folders/1kJb93A7jxTXM5_2qPyP5ZiooH8ODP253?usp=sharing',
    icon: ColorPaletteIcon,
  },
]
</script>