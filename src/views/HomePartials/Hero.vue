<template>
  <div class="relative isolate overflow-hidden bg-neutral-100">
    <div class="relative mx-auto max-w-7xl px-6 pt-10 lg:px-8 lg:pt-28">
      <div class="absolute bottom-0 left-0 -z-5 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div class="relative aspect-[1/1] w-[66.125rem] bg-gradient-to-r from-white to-white opacity-100" style="clip-path: ellipse(50% 25% at center 100%);"></div>
      </div>
      <div>
        <video @loadeddata="isVideoLoaded = true" :class="{ invisible: !isVideoLoaded, visible: isVideoLoaded }" muted autoplay playsinline class="absolute -right-96 top-4 -z-10 mx-auto" data-timing="7" data-wait="240" style="margin-top: 0vh;transform: rotateY(180deg)" loop aria-hidden="true" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, }" :delay="100" :poster='videoPoster'>
          <source src="../../assets/videos/ball.mp4" type="video/mp4">
        </video>
        <img v-if="!isVideoLoaded" :src="videoPoster" alt="Video loading..." class="absolute -right-96 top-4 -z-10 mx-auto" style="margin-top: 0vh;transform: rotateY(180deg)" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, }" :delay="100" />
      </div>

      <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
        <h1 class="mt-10 text-4xl font-bold tracking-tighter  text-neutral-900 sm:text-7xl"
          v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="100"
        >Cross-Chain Lease Protocol</h1>

        
        <p class="mt-6 text-xl leading-8 text-neutral-600"
          v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="300"
        >Triple your holdings without tripling your risk <br /> Unlock the full potential of your assets</p>
        <div class="mt-10 flex items-center gap-x-3"
          v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="400"
        >
          <Button size="lg" variant="primary" link="https://app.nolus.io/" :icon="SquareArrowUpRightSolidIcon">
            Launch dApp
          </Button>
          <Button size="lg" variant="secondary" :icon="PlayCircleIcon" @click="showVideoDialog = true">
            Watch explainer
          </Button>
        </div>
      </div>
      <div class="sm:py-16 max-w-4xl">
          <dl class="grid grid-cols-1 gap-y-16 lg:grid-cols-3 rounded-xl ">
            <div v-for="stat in stats" :key="stat.id" class="mx-auto flex max-w-xs flex-col gap-y-3 pr-8 py-8"
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
import { ArrowTopRightOnSquareIcon, PlayCircleIcon } from '@heroicons/vue/24/solid';
import  SquareArrowUpRightSolidIcon from '@/assets/icons/square-arrow-up-right-solid.svg';
import Button from '../../components/Button.vue';
import videoPoster from '@/assets/videos/ball.jpg';
import Modal from '@/components/modals/templates/Modal.vue';
import VideoModal from '@/components/modals/VideoModal.vue';

const stats = [
  { id: 1, subtitle: 'Total value', description: 'Value locked across 15 assets distributed over 2 networks', value: '$1,170,869' },
  { id: 2, subtitle: 'APR Lease', description: 'Fixed interest for the entire term of a Lease Position', value: '14.00%' },
  { id: 3, subtitle: 'APR Yield', description: 'Real yield interest returns on lent stablecoins', value: '6.24%' },
]

const showVideoDialog= ref(false);
const isVideoLoaded = ref(false);
</script>