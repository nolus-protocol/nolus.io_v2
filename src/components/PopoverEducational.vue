<template>
  <Popover class="relative" v-slot="{ open }">
    <PopoverButton class="inline-flex items-center gap-x-1 py-2 px-3 rounded-lg hover:bg-neutral-300/30 transition-all" :class="{ 'bg-neutral-200/50': open }">
      Educational
      <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
    </PopoverButton>

    <transition enter-active-class="transition ease-in-out duration-200" enter-from-class="opacity-0 translate-y-3 scale-95 origin-bottom" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-3 scale-95 origin-bottom">
      <PopoverPanel class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 ">
        <div class="w-screen max-w-md flex-auto bg-white rounded-3xl leading-6 shadow-2xl ring-1 ring-neutral-900/5 overflow-hidden">
          <div class="bg-white p-4">
            <a v-for="item in resources" :key="item.name" :href="item.href" >
              <div class="text-sm group relative flex gap-x-6 rounded-lg p-4 hover:bg-blue-100 transition-all">
                <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-all">
                  <component :is="item.icon" class="h-6 w-6 text-blue-500 fill-blue-500 hover:text-blue-900" aria-hidden="true" />  
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
          <div class="bg-blue-100/80 border-t border-blue-900/10 p-4">
            <div class="flex justify-between items-center px-3 mb-2">
              <h3 class="text-md font-medium leading-6 text-neutral-900">Recent posts</h3>
              <Button size="sm" :icon="ReadmeIcon" variant="secondary" link="https://medium.com/nolusprotocol" >See all posts</Button>
            </div>
            <ul role="list" class="space-y-1">
              <li v-for="post in recentPosts" :key="post.id" class="relative w-full">
                <a :href="post.href" class="flex items-center space-x-3 leading-6 text-neutral-900 hover:bg-neutral-200/30 p-3 rounded-lg transition-all" >
                  <img :src="getImageUrl(post.image)" alt="" aria-hidden="true" class="w-28 rounded-md" />
                  <div>
                    <h5 class="text-sm">{{ post.title }}</h5>
                    <time :datetime="post.datetime" class="block text-xs font-normal leading-6 text-neutral-600">{{ post.date }}</time>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import data from '../../rss-server/data/data.json';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ArrowTopRightOnSquareIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'
import Button from './Button.vue';
import LifeRingSolidIcon from '../assets/icons/life-ring-solid.svg'
import MediumIcon from '../assets/icons/medium.svg'
import ReadmeIcon from '../assets/icons/readme.svg'

const resources = [
  { name: 'Knowledge Hub', description: 'Find solutions for your questions', href: 'https://hub.nolus.io/', icon: LifeRingSolidIcon },
  { name: 'Blog', description: 'Discover helpful insights and information', href: 'https://medium.com/nolusprotocol', icon: MediumIcon },
]

const getImageUrl = (imageName) => {
  return `${import.meta.env.BASE_URL}rss-server/data/${imageName}`;
};

let recentPosts = ref([]);

onMounted(async () => {
  recentPosts = data.slice(0,3);
});
</script>