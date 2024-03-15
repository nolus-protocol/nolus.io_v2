<template>
  <Popover class="relative" v-slot="{ open }">
    <PopoverButton class="flex w-full justify-between items-center gap-x-1 py-5 lg:py-2 px-5 lg:px-3 rounded-t-2xl  lg:rounded-lg lg:hover:bg-neutral-200/50 transition-all" :class="{ 'bg-white lg:bg-neutral-200/40 shadow-lg lg:shadow-none': open }">
      <span :class="props.textColorClass">Educational</span>
      <ChevronDownSmallIcon class="h-7 w-7 lg:h-5 lg:w-5 fill-neutral-800 transition-all" :class="[{'rotate-90 lg:rotate-0': !open }, props.fillColorClass]" aria-hidden="true" />
    </PopoverButton>

    <transition enter-active-class="transition ease-in-out duration-200" enter-from-class="opacity-0 translate-y-3 md:scale-95 origin-bottom" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-3 md:scale-95 origin-bottom">
      <PopoverPanel class="lg:absolute lg:left-1/2 lg:z-10 lg:mt-5 flex lg:w-screen max-w-max lg:-translate-x-1/2 lg:px-4 ">
        <div class="w-screen max-w-md flex-auto bg-white rounded-b-2xl lg:rounded-3xl leading-6 shadow-2xl ring-1 ring-neutral-900/5 overflow-hidden">
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
            <div class="flex flex-col md:flex-row gap-y-2 justify-between md:items-center px-3 mb-2 pr-0">
              <h3 class="text-md font-medium leading-6 text-neutral-900">Recent blog posts</h3>
              <Button size="sm" :icon="MediumIcon" variant="secondary" link="https://medium.com/nolusprotocol" >View all posts</Button>
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

<script lang="ts" setup>
import { ref, onMounted, defineProps } from 'vue';
import data from '../../rss-server/data/data.json';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import ChevronDownSmallIcon from '@/assets/icons/chevron-down-small.svg'
import Button from './Button.vue';
import BookIcon from '../assets/icons/book.svg'
import MediumIcon from '../assets/icons/medium.svg'
import ReadmeIcon from '../assets/icons/readme.svg'

const props = defineProps({
  textColorClass: String,
  fillColorClass: String
})

const resources = [
  { name: 'Knowledge Hub', description: 'Find answers to your questions', href: 'https://hub.nolus.io/', icon: BookIcon },
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
