<template>
  <div class="relative isolate overflow-hidden bg-neutral-100">
    <div class="relative mx-auto max-w-7xl px-6 py-32 pb-24 lg:px-8 lg:pt-28">
      <div class="absolute bottom-0 left-0 -z-5 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div class="relative aspect-[1/1] w-[66.125rem] bg-gradient-to-r from-white to-white opacity-100" style="clip-path: ellipse(50% 25% at center 100%);"></div>
      </div>
      

      <div class="md:max-w-xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 relative">
        <h1 class="max-w-64 sm:max-w-lg lg:max-w-none md:mt-10 text-4xl font-bold tracking-tighter  text-neutral-900 sm:text-7xl"
          v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="100"
        >Cross-Chain Lease Protocol</h1>
        
        <p class="max-w-64 sm:max-w-lg lg:max-w-none mt-6 text-base md:text-xl sm:leading-8 text-neutral-600"
          v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="300"
        >Triple your holdings without tripling the risk! Unlock the full potential of your assets directly from your wallet</p>

        <div class="mt-10 flex flex-col md:flex-row gap-y-4 items-center gap-x-3"
          v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="400"
        >
          <Button class="w-full md:w-auto" size="lg" variant="primary" link="https://app.nolus.io/" :icon="SquareArrowTopRightIcon">
            Launch dApp
          </Button>
          <Button class="w-full md:w-auto" size="lg" variant="secondary" :icon="PlayCircleIcon" @click="showVideoDialog = true">
            Watch explainer
          </Button>
        </div>

      </div>
      <div class="w-full my-12 absolute md:scale-100 left-0 md:left-auto -right-48 sm:-right-56 lg:-right-72 top-20 md:top-10 -z-10 mx-auto lg:mt-0">
        <video ref="videoRef" @loadeddata="isVideoLoaded = true" :class="{ invisible: !isVideoLoaded, visible: isVideoLoaded }" muted autoplay playsinline data-timing="7" data-wait="240" loop aria-hidden="true" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :delay="100" :poster='videoPoster'>
          <source :src="videoSrc" type="video/mp4" />
        </video>
        <img v-if="!isVideoLoaded" :src="videoPoster" alt="Video loading..." v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :delay="100" />
      </div>
      <div class="md:pt-16 max-w-4xl">
          <dl class="flex flex-col md:flex-row gap-y-10 rounded-xl mt-16 md:my-0">
            <div v-for="stat in stats" :key="stat.id" class="w-full md:mx-auto flex max-w-xs flex-col gap-y-3 md:pr-8"
            v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="stat.id*100"
            >
              <dt class="leading-3 order-first text-blue-600 font-medium">{{ stat.subtitle }}</dt>
              <dd class="text-3xl font-bold tracking-tight text-neutral-900">{{ stat.value }}</dd>
              <dt class="text-base leading-6 text-neutral-600">{{ stat.description }}</dt>
            </div>
          </dl>
        </div>
        <Modal
          :show="showVideoDialog"
          :variant="'video'"
          :width="'sm:w-full md:w-2/3'"
          @close-modal="showVideoDialog = false"
        >
          <videoModal />
        </Modal>   
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SquareArrowTopRightIcon from '@/assets/icons/square-arrow-top-right-2.svg';
import PlayCircleIcon from '@/assets/icons/play-circle.svg';
import Button from '@/components/Button.vue';
import videoPoster from '@/assets/videos/header.jpg';
import Modal from '@/components/modals/templates/Modal.vue';
import VideoModal from '@/components/modals/VideoModal.vue';
import videoSrc from '@/assets/videos/header.mp4';

const stats = [
  { id: 1, subtitle: '', description: 'Transactional value channeled through Nolus', value: '$100M+' },
  { id: 2, subtitle: '', description: 'Liquidity locked across 25 assets distributed on 3 networks', value: '$1,170,869' },
  { id: 3, subtitle: '', description: 'Sustanable annual percentage yield on lent assets', value: '9.24%' },
]

const showVideoDialog= ref(false);
const videoRef = ref(null);
const isVideoLoaded = ref(false);

</script>