<template>
  <Popover
    class="relative"
    v-slot="{ open }"
  >
    <PopoverButton
      class="flex w-full items-center justify-between gap-x-1 rounded-t-2xl px-5 py-5 transition-all lg:rounded-lg lg:px-3 lg:py-2 lg:hover:bg-neutral-200/50"
      :class="{ 'bg-white shadow-lg lg:bg-neutral-200/40 lg:shadow-none': open }"
    >
      <span :class="props.textColorClass">Educational</span>
      <ChevronDownSmallIcon
        class="h-7 w-7 fill-neutral-800 transition-all lg:h-5 lg:w-5"
        :class="[{ 'rotate-90 lg:rotate-0': !open }, props.fillColorClass]"
        aria-hidden="true"
      />
    </PopoverButton>

    <transition
      enter-active-class="transition ease-in-out duration-200"
      enter-from-class="opacity-0 translate-y-3 md:scale-95 origin-bottom"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-3 md:scale-95 origin-bottom"
    >
      <PopoverPanel
        class="flex max-w-max lg:absolute lg:left-1/2 lg:z-10 lg:mt-5 lg:w-screen lg:-translate-x-1/2 lg:px-4"
      >
        <div
          class="w-screen max-w-md flex-auto overflow-hidden rounded-b-2xl bg-white leading-6 shadow-2xl ring-1 ring-neutral-900/5 lg:rounded-3xl"
        >
          <div class="bg-white p-4">
            <a
              v-for="item in resources"
              :key="item.name"
              target="_blank"
              class="rounded-lg"
            >
              <div class="group relative flex gap-x-4 rounded-lg p-4 text-sm transition-all hover:bg-blue-100">
                <div
                  class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-blue-100 transition-all group-hover:bg-blue-200"
                >
                  <component
                    :is="item.icon"
                    class="h-6 w-6 fill-blue-500 text-blue-500 hover:text-blue-900"
                    aria-hidden="true"
                  />
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
          <div class="border-t border-blue-900/10 bg-blue-100/80 p-4">
            <div class="mb-2 flex flex-col justify-between gap-y-2 px-3 pr-0 md:flex-row md:items-center">
              <h3 class="text-md font-medium leading-6 text-neutral-900">Recent blog posts</h3>
              <Button
                size="sm"
                :icon="MediumIcon"
                variant="secondary"
                link="https://medium.com/nolusprotocol"
                >View all posts</Button
              >
            </div>
            <ul
              role="list"
              class="space-y-1"
            >
              <li
                v-for="post in recentPosts"
                :key="post.title"
                class="relative w-full"
              >
                <a
                  :href="post.link"
                  target="_blank"
                  class="flex items-center space-x-3 rounded-lg p-3 leading-6 text-neutral-900 transition-all hover:bg-blue-200/40"
                >
                  <div class="relative h-16 shrink-0 basis-28 overflow-hidden rounded-xl">
                    <img
                      :src="post.image"
                      alt=""
                      aria-hidden="true"
                      class="absolute top-0 z-10 h-full w-full"
                    />
                  </div>
                  <div>
                    <h5 class="text-sm">{{ post.title }}</h5>
                    <time
                      :datetime="post.pubDate"
                      class="block text-xs font-normal leading-6 text-neutral-600"
                      >{{ post.pubDate }}</time
                    >
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
import { ref, onMounted } from "vue";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import ChevronDownSmallIcon from "@/assets/icons/chevron-down-small.svg";
import Button from "./Button.vue";
import BookIcon from "../assets/icons/book.svg";
import MediumIcon from "../assets/icons/medium.svg";
import { fetchFeed } from "@/utils/RssUtil";

const props = defineProps({
  textColorClass: String,
  fillColorClass: String
});

const resources = [
  {
    name: "Knowledge Hub",
    description: "Find answers to your questions",
    href: "https://hub.nolus.io/",
    icon: BookIcon
  }
];

let recentPosts = ref<
  {
    title: string;
    link: string;
    image: string;
    pubDate: string;
  }[]
>([]);

onMounted(async () => {
  try{
    recentPosts.value = await fetchFeed();

  }catch(e){
    console.log(e)
  }
  // const posts = await Promise.all(
  //   data.slice(0, 3).map(async (post) => {
  //     const imageUrl = await getImageUrl(post.image);
  //     return { ...post, imageUrl, isImageLoaded: false };
  //   })
  // );
  // recentPosts.value = posts;
  // posts.forEach((post) => {
  //   const img = new window.Image();
  //   img.onload = () => {
  //     const postInRecentPosts = recentPosts.value.find((p) => p.id === post.id);
  //     if (postInRecentPosts) {
  //       postInRecentPosts.isImageLoaded = true;
  //     }
  //   };
  //   img.src = post.imageUrl;
  // });
});
</script>
