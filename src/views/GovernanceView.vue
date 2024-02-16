<template>
  <div class="bg-white">


    <main class="isolate">
      <!-- Hero section -->
      <div class="overflow-hidden relative isolate -z-10 bg-blue-100 py-32 pb-24 md:pt-40">
          <NolusContainer>
            <div class="hidden md:absolute -top-12 -right-64 xl:-right-16">
              <svg width="0" height="0" viewBox="0 0 444 444">
                <defs>
                  <clipPath id="logoMask" clipPathUnits="objectBoundingBox">
                    <path d="M0.5 0a0.5 0.5 0 0 0-0.461 0.309A0.5 0.5 0 1 0 0.5 0Zm0.175 0.75H0.325a0.075 0.075 0 0 1-0.075-0.075V0.325A0.075 0.075 0 0 1 0.325 0.25h0.35a0.075 0.075 0 0 1 0.075 0.075v0.35a0.075 0.075 0 0 1-0.022 0.053 0.075 0.075 0 0 1-0.053 0.022Z"/>
                  </clipPath>
                </defs>
              </svg>
              <canvas id="myCanvas" ref="myCanvas" style="clip-path: url(#logoMask);" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1}" :delay="300"></canvas>
            </div>
            <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div class="w-full max-w-xl lg:shrink-0 xl:max-w-3xl">
                <h1 class="text-5xl font-bold tracking-tight text-neutral-900 leading-tight" v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="100">Governance</h1>
                <p class="basis-1/2 relative mt-6 text-lg leading-8 text-neutral-800 sm:max-w-md lg:max-w-lg" v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="200">The Nolus Protocol is managed by a decentralized group of individuals who delegate their NLS tokens. This community suggests and votes on platform improvements.</p>
                <p class="basis-1/2 relative mt-6 text-lg leading-8 text-neutral-800 sm:max-w-md lg:max-w-lg" v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="300">
                  By allocating their NLS tokens to different validators, these delegators bolster the Nolus network's security. Validators play a crucial role in maintaining the network's integrity and protection.
                </p>
              </div>
            </div>
          </NolusContainer> 
      </div>        

      <NolusContainer>
        <div class="bg-white py-24">       
          <dl class="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
            <div v-for="stat in stats" :key="stat.id" class="flex max-w-xs flex-col gap-y-4">
              <dt class="text-base leading-7 text-neutral-600">{{ stat.description }}</dt>
              <dd class="order-first text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>
      </NolusContainer>

      <!-- Team section -->
      <div class="bg-neutral-100 py-24">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div class="basis-2/5 shrink-0 mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-6 ">Recent proposals</h2>
          </div>
          <div class="basis-3/5 shrink-0">
            Proposals go here...
          </div>
        </div>
      </div>
      
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import NolusContainer from '@/components/NolusContainer.vue';
import dots from '@/assets/images/dots.svg';

const stats = [
  {description: "A subset of 50 validators from a total of 432 are actively engaged in maintaining the network's integrity", value: '50 active validators' },
  {description: 'Votes delegated', value: '1,323 delegators' },
  {description: 'Real yield interest returns on lent stablecoins', value: '3,2323 voting addresses' },
]

let myCanvas = ref(null);
let dotColor = '13,55,127'; // Change this to control the color of the dots

onMounted(() => {
  let canvas = myCanvas.value;
  let ctx = canvas.getContext('2d');
  let dotRadius = 7/2;
  let dotSpacingX = 32; // Horizontal spacing
  let dotSpacingY = 18; // Vertical spacing
  let lineOffset = 16;

  let canvasWidth = 730;
  let canvasHeight = 730;
  let devicePixelRatio = window.devicePixelRatio || 1;
  canvas.width = canvasWidth * devicePixelRatio;
  canvas.height = canvasHeight * devicePixelRatio;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  ctx.scale(devicePixelRatio, devicePixelRatio);

  let dots = [];

  for (let y = 0; y < canvas.height; y += dotSpacingY) {
    let xOffset = y % (2 * dotSpacingY) === 0 ? lineOffset : 0;
    for (let x = xOffset; x < canvas.width; x += dotSpacingX) {
      let dot = {
        x: x,
        y: y,
        opacity: Math.random(),
        direction: Math.random() < 0.5 ? -1 : 1
      };
      dots.push(dot);
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach(dot => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2, true);
      ctx.fillStyle = `rgba(${dotColor},${dot.opacity})`;
      ctx.fill();

      // Update dot opacity
      dot.opacity += dot.direction * 0.005;
      if (dot.opacity > 1) {
        dot.opacity = 1;
        dot.direction = -1;
      } else if (dot.opacity < 0) {
        dot.opacity = 0;
        dot.direction = 1;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
});
</script>