<template>
  <Popover class="relative"  v-slot="{ open }">
    <PopoverButton class="inline-flex items-center gap-x-1 leading-6 text-gray-900 py-2 px-3 rounded-lg hover:bg-neutral-300/30" :class="{ 'bg-neutral-200/50': open }">
      <span>Resources</span>
      <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
    </PopoverButton>

    <transition enter-active-class="transition ease-in-out duration-200" enter-from-class="opacity-0 translate-y-3 scale-95 origin-bottom" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-3 scale-95 origin-bottom">
      <PopoverPanel class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
        <div class="w-screen max-w-sm flex-auto rounded-3xl bg-white p-4 text-sm leading-6 shadow-2xl ring-1 ring-gray-900/5 ">
          <a v-for="item in solutions" :key="item.name" :href="item.href">
              <div class="text-sm group relative flex gap-x-6 rounded-lg p-4 hover:bg-blue-100 transition-all ">
                <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200  transition-all">
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
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import GithubIcon from '../assets/icons/github.svg'
import ShieldHalvedSolidIcon from '../assets/icons/shield-halved-solid.svg'
import BrushSolidIcon from '../assets/icons/brush-solid.svg'
import LifeRingSolidIcon from '../assets/icons/life-ring-solid.svg'
import FileSolidIcon from '../assets/icons/file-solid.svg'

const solutions = [
  { 
    name: 'Whitepaper', 
    description: 'Download our whitepaper to learn more about our vision and roadmap', 
    href: 'https://nolus.io/Nolus-Whitepaper.pdf#',  
    icon: FileSolidIcon,
  },
  {
    name: 'Tech documentation',
    description: 'Get all of your questions answered in our forums of contact support',
    href: '#',
    icon: LifeRingSolidIcon,
  },
  { 
    name: 'Github', 
    description: 'Learn how to maximize our platform to get the most out of it', 
    href: 'https://github.com/nolus-protocol',
    icon: GithubIcon,
  },
  { 
    name: 'Audits', 
    description: 'Check out webinars with experts and learn about our annual conference', 
    href: '#',
    icon: ShieldHalvedSolidIcon,
  },
  { 
    name: 'Brand assets', 
    description: 'Understand how we take your privacy seriously', 
    href: '#',
    icon: BrushSolidIcon,
  },
]
</script>