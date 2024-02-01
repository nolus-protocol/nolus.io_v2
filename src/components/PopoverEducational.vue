<template>
  <Popover class="relative" v-slot="{ open }">
    <PopoverButton class="inline-flex items-center gap-x-1 py-2 px-3 rounded-lg hover:bg-neutral-300/30 transition-all" :class="{ 'bg-neutral-200/50': open }">
      <span :class="props.textColorClass">Educational</span>
      <ChevronDownIcon class="h-5 w-5" :class="props.fillColorClass" aria-hidden="true" />
    </PopoverButton>

    <transition enter-active-class="transition ease-in-out duration-200" enter-from-class="opacity-0 translate-y-3 scale-95 origin-bottom" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-3 scale-95 origin-bottom">
      <PopoverPanel class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 ">
        <div class="w-screen max-w-md flex-auto bg-white rounded-3xl leading-6 shadow-2xl ring-1 ring-neutral-900/5 overflow-hidden">
          <div class="bg-white p-4">
            <a v-for="item in resources" :key="item.name" :href="item.href" class="rounded-lg">
              <div class="text-sm group relative flex gap-x-4 rounded-lg p-4 hover:bg-blue-100 transition-all">
                <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-all">
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
            <div class="flex justify-between items-center px-3 mb-2 pr-0">
              <h3 class="text-md font-medium leading-6 text-neutral-900">Recent posts</h3>
              <Button size="sm" :icon="ReadmeIcon" variant="secondary" link="https://medium.com/nolusprotocol" >See all posts</Button>
            </div>
            <ul role="list" class="space-y-1">
              <li v-for="post in recentPosts" :key="post.id" class="relative w-full">
                <a :href="post.href" class="flex items-center space-x-3 leading-6 text-neutral-900 hover:bg-blue-200/40 p-3 rounded-lg transition-all" >
                  <div class="basis-28 shrink-0 h-16 rounded-xl overflow-hidden relative">
                    <img v-if="post.isImageLoaded" :src="post.imageUrl" alt="" aria-hidden="true" class="w-full h-full absolute top-0 z-10" @load="post.isImageLoaded = true" />
                    <div v-else class="h-full w-full bg-neutral-200 animate-pulse absolute top-0 z-5"></div>
                  </div>
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
import { ref, onMounted, defineProps } from 'vue';
import data from '../../rss-server/data/data.json';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import Button from './Button.vue';
import LifeRingSolidIcon from '../assets/icons/life-ring-solid.svg'
import MediumIcon from '../assets/icons/medium.svg'
import ReadmeIcon from '../assets/icons/readme.svg'

const props = defineProps({
  textColorClass: String,
  fillColorClass: String
})

const resources = [
  { name: 'Knowledge Hub', description: 'Find solutions for your questions', href: 'https://hub.nolus.io/', icon: LifeRingSolidIcon },
  { name: 'Blog', description: 'Discover helpful insights and information', href: 'https://medium.com/nolusprotocol', icon: MediumIcon },
]

const getImageUrl = (imageName) => {
  return new URL(`../assets/blog/${imageName}`, import.meta.url).href;
};

let recentPosts = ref([]);

onMounted(async () => {
  const posts = await Promise.all(data.slice(0,3).map(async post => {
    const imageUrl = await getImageUrl(post.image);
    return { ...post, imageUrl, isImageLoaded: false };
  }));
  recentPosts.value = posts;
  posts.forEach(post => {
    const img = new window.Image();
    img.onload = () => {
      const postInRecentPosts = recentPosts.value.find(p => p.id === post.id);
      if (postInRecentPosts) {
        postInRecentPosts.isImageLoaded = true;
      }
    };
    img.src = post.imageUrl;
  });
});
</script>