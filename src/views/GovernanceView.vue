<template>
  <div class="bg-white">
    <main class="isolate">
      <!-- Hero section -->
      <div class="relative isolate -z-10 overflow-hidden bg-blue-100 py-32 pb-24 md:pt-40">
        <NolusContainer>
          <div class="-top-12 hidden scale-75 md:absolute md:-right-96 md:block lg:-right-64 lg:scale-100 xl:-right-16">
            <canvas
              id="myCanvas"
              ref="myCanvas"
              style="
                clip-path: polygon(
                  50% 0%,
                  50% 0%,
                  47.041% 0.088%,
                  44.103% 0.349%,
                  41.193% 0.782%,
                  38.318% 1.384%,
                  35.486% 2.153%,
                  32.703% 3.087%,
                  29.979% 4.183%,
                  27.318% 5.44%,
                  24.73% 6.855%,
                  22.221% 8.426%,
                  22.221% 8.426%,
                  19.81% 10.143%,
                  17.512% 11.993%,
                  15.333% 13.969%,
                  13.277% 16.067%,
                  11.349% 18.28%,
                  9.555% 20.603%,
                  7.899% 23.028%,
                  6.385% 25.551%,
                  5.019% 28.166%,
                  3.806% 30.866%,
                  3.806% 30.866%,
                  2.755% 33.633%,
                  1.872% 36.447%,
                  1.158% 39.302%,
                  0.614% 42.188%,
                  0.241% 45.099%,
                  0.039% 48.027%,
                  0.009% 50.964%,
                  0.153% 53.903%,
                  0.469% 56.835%,
                  0.961% 59.755%,
                  0.961% 59.755%,
                  1.624% 62.639%,
                  2.453% 65.47%,
                  3.446% 68.24%,
                  4.597% 70.942%,
                  5.904% 73.57%,
                  7.363% 76.116%,
                  8.97% 78.575%,
                  10.721% 80.939%,
                  12.614% 83.201%,
                  14.645% 85.355%,
                  14.645% 85.355%,
                  16.799% 87.386%,
                  19.061% 89.279%,
                  21.425% 91.03%,
                  23.884% 92.637%,
                  26.43% 94.096%,
                  29.058% 95.403%,
                  31.76% 96.554%,
                  34.53% 97.547%,
                  37.361% 98.376%,
                  40.245% 99.039%,
                  40.245% 99.039%,
                  43.165% 99.531%,
                  46.097% 99.847%,
                  49.036% 99.991%,
                  51.973% 99.961%,
                  54.901% 99.759%,
                  57.812% 99.386%,
                  60.698% 98.842%,
                  63.553% 98.128%,
                  66.367% 97.245%,
                  69.134% 96.194%,
                  69.134% 96.194%,
                  71.834% 94.981%,
                  74.449% 93.615%,
                  76.972% 92.101%,
                  79.397% 90.445%,
                  81.72% 88.65%,
                  83.933% 86.723%,
                  86.03% 84.667%,
                  88.007% 82.488%,
                  89.857% 80.19%,
                  91.573% 77.778%,
                  91.573% 77.778%,
                  93.144% 75.27%,
                  94.56% 72.681%,
                  95.816% 70.021%,
                  96.913% 67.296%,
                  97.847% 64.514%,
                  98.616% 61.682%,
                  99.218% 58.807%,
                  99.651% 55.897%,
                  99.912% 52.959%,
                  100% 50%,
                  100% 50%,
                  99.843% 46.041%,
                  99.377% 42.131%,
                  98.609% 38.287%,
                  97.546% 34.527%,
                  96.194% 30.866%,
                  94.561% 27.321%,
                  92.654% 23.91%,
                  90.479% 20.649%,
                  88.044% 17.555%,
                  85.355% 14.645%,
                  85.355% 14.645%,
                  82.445% 11.956%,
                  79.351% 9.521%,
                  76.09% 7.346%,
                  72.679% 5.439%,
                  69.134% 3.806%,
                  65.473% 2.454%,
                  61.712% 1.391%,
                  57.869% 0.623%,
                  53.959% 0.157%,
                  50% 0%,
                  67.482% 74.997%,
                  32.521% 74.997%,
                  32.521% 74.997%,
                  31.926% 74.973%,
                  31.338% 74.903%,
                  30.76% 74.788%,
                  30.195% 74.628%,
                  29.644% 74.425%,
                  29.111% 74.179%,
                  28.598% 73.892%,
                  28.108% 73.565%,
                  27.643% 73.199%,
                  27.205% 72.795%,
                  27.205% 72.795%,
                  26.801% 72.357%,
                  26.435% 71.892%,
                  26.108% 71.402%,
                  25.821% 70.889%,
                  25.576% 70.356%,
                  25.372% 69.806%,
                  25.212% 69.24%,
                  25.097% 68.662%,
                  25.027% 68.074%,
                  25.003% 67.479%,
                  25.003% 32.518%,
                  25.003% 32.518%,
                  25.027% 31.922%,
                  25.097% 31.335%,
                  25.212% 30.757%,
                  25.372% 30.191%,
                  25.576% 29.641%,
                  25.821% 29.108%,
                  26.108% 28.595%,
                  26.435% 28.105%,
                  26.801% 27.639%,
                  27.205% 27.202%,
                  27.205% 27.202%,
                  27.643% 26.798%,
                  28.108% 26.431%,
                  28.598% 26.104%,
                  29.111% 25.818%,
                  29.644% 25.572%,
                  30.195% 25.369%,
                  30.76% 25.209%,
                  31.338% 25.094%,
                  31.926% 25.024%,
                  32.521% 25%,
                  67.482% 25%,
                  67.482% 25%,
                  68.078% 25.024%,
                  68.665% 25.094%,
                  69.243% 25.209%,
                  69.809% 25.369%,
                  70.359% 25.572%,
                  70.892% 25.818%,
                  71.405% 26.104%,
                  71.895% 26.431%,
                  72.36% 26.798%,
                  72.798% 27.202%,
                  72.798% 27.202%,
                  73.202% 27.639%,
                  73.568% 28.105%,
                  73.895% 28.595%,
                  74.182% 29.108%,
                  74.428% 29.641%,
                  74.631% 30.191%,
                  74.791% 30.757%,
                  74.907% 31.335%,
                  74.977% 31.922%,
                  75% 32.518%,
                  75% 67.479%,
                  75% 67.479%,
                  74.977% 68.074%,
                  74.907% 68.662%,
                  74.791% 69.24%,
                  74.631% 69.806%,
                  74.428% 70.356%,
                  74.182% 70.889%,
                  73.895% 71.402%,
                  73.568% 71.892%,
                  73.202% 72.357%,
                  72.798% 72.795%,
                  72.798% 72.795%,
                  72.36% 73.199%,
                  71.895% 73.565%,
                  71.405% 73.892%,
                  70.892% 74.179%,
                  70.359% 74.425%,
                  69.809% 74.628%,
                  69.243% 74.788%,
                  68.665% 74.903%,
                  68.078% 74.973%,
                  67.482% 74.997%
                );
              "
              v-motion
              :initial="{ opacity: 0 }"
              :enter="{ opacity: 1 }"
              :delay="300"
            ></canvas>
          </div>
          <div class="max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <div class="w-full max-w-xl lg:shrink-0 xl:max-w-3xl">
              <h1
                class="text-5xl font-bold leading-tight tracking-tight text-neutral-900"
                v-motion
                :initial="{ opacity: 0, y: 10 }"
                :enter="{ opacity: 1, y: 0, scale: 1 }"
                :delay="100"
              >
              {{ $t('governance_heroTitle') }}
              </h1>
              <p
                class="relative mt-6 basis-1/2 text-lg leading-8 text-neutral-800 sm:max-w-md lg:max-w-lg"
                v-motion
                :initial="{ opacity: 0, y: 10 }"
                :enter="{ opacity: 1, y: 0, scale: 1 }"
                :delay="200"
              >
                {{ $t('governance_heroDesc') }}
              </p>
            </div>
          </div>
        </NolusContainer>
      </div>

      <NolusContainer>
        <div class="bg-white py-24">
          <dl class="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="stat in stats"
              :key="stat.id"
              class="flex max-w-xs flex-col gap-y-4"
            >
              <dt class="text-base leading-7 text-neutral-600">{{ stat.description }}</dt>
              <dd class="order-first text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                {{ stat.value }}
              </dd>
            </div>
          </dl>
        </div>
      </NolusContainer>

      <!-- Team section -->
      <div class="bg-neutral-100 py-24">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="max-w-2xl lg:mx-0">
            <h2 class="mb-12 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">{{ $t('governance_recentProposalsHeading') }}</h2>
          </div>

          <div class="mt-8 md:mt-0">
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <ProposalItem
                v-for="proposal in proposals"
                :key="proposal.id"
                :state="proposal"
                :bondedTokens="bondedTokens"
                :quorum="quorum"
                @read-more="onReadMore"
                v-motion
                :initial="{ opacity: 0, y: -100 }"
                :enter="{ opacity: 1, y: 0, scale: 1, transition: { duration: 400 } }"
                :leave="{ opacity: 0, y: 100 }"
              />
            </div>
            <div class="mt-6 text-center lg:mt-8">
              <Button
                v-if="visible"
                variant="secondary"
                @click="loadMoreProposals"
                :icon="PlusSmallIcon"
                size="md"
                class="mt-4"
              >
                {{ $t('common_loadMore') }}
              </Button>
            </div>
            <Modal
              :show="state.showReadMoreModal"
              @close-modal="onCloseReadMoreModal"
            >
              <ProposalReadMoreDialog
                :source="state.proposal.summary"
                :title="state.proposal.title"
              />
            </Modal>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import type { Proposal } from "@/components/vote/Proposal";
import type { StakingPoolResponse, GovernanceResponse, TallyingParamsResponse } from "@/types/governance";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { Dec } from "@keplr-wallet/unit";
import { API_MAINNET } from "@/config";
import { ANIMATION_TIMINGS } from "@/constants/animations";

import NolusContainer from "@/components/NolusContainer.vue";
import Button from "@/components/Button.vue";
import ProposalItem from "@/components/vote/components/ProposalItem.vue";
import ProposalReadMoreDialog from "@/components/vote/components/ProposalReadMoreDialog.vue";
import Modal from "@/components/modals/templates/Modal.vue";
import PlusSmallIcon from "@/assets/icons/plus-small.svg";
import { usePageReady } from "@/composables/usePageReady";

import { useI18n } from "vue-i18n";

const { t } = useI18n();

const stats = computed(() => [
  {
    description: t("governance_statsValidatorsDesc"),
    value: t("governance_statsValidators"),
    id: 1
  },
  { 
    description: t("governance_statsDelegatorsDesc"), 
    value: t("governance_statsDelegators"), 
    id: 2 
  },
  { 
    description: t("governance_statsStakedDesc"), 
    value: t("governance_statsStaked"), 
    id: 3 
  }
]);

let myCanvas = ref<HTMLCanvasElement | null>();
let dotColor = "13,55,127"; // Change this to control the color of the dots

const bondedTokens = ref(new Dec(0));
const quorum = ref(new Dec(0));
const { setPageReady } = usePageReady();

const state = ref<{
  showReadMoreModal: boolean,
  showErrorDialog: boolean,
  errorMessage: string,
  proposal: {
    id: string,
    title: string,
    summary: string
  },
  limit: number,
  pagination: {
    total: string,
    next_key: string | null
  }
}>({
  showReadMoreModal: false,
  showErrorDialog: false,
  errorMessage: "",
  proposal: {
    id: "",
    title: "",
    summary: ""
  },
  limit: 6,
  pagination: {
    total: "0",
    next_key: ""
  }
});

let interval: NodeJS.Timeout;
let observer: IntersectionObserver | null = null;
const proposals = ref([] as Proposal[]);
const dots: {
  x: number;
  y: number;
  opacity: number;
  direction: number;
}[] = [];

const startAnimation = () => {
  if (!interval) {
    animate();
    interval = setInterval(animate, ANIMATION_TIMINGS.CANVAS_FRAME_RATE);
  }
};

const stopAnimation = () => {
  if (interval) {
    clearInterval(interval);
  }
};

onMounted(async () => {
  try{
  let canvas = myCanvas.value;

  if (canvas) {
    let ctx = canvas.getContext("2d")!;
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

    // Use Intersection Observer to pause animation when not visible
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
          } else {
            stopAnimation();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);
  }

  setPageReady();

  await Promise.all([fetchGovernanceProposals(), loadBondedTokens(), loadTallying()]);

  }catch(e){
    console.error(e)
  }
});

onUnmounted(() => {
  stopAnimation();
  if (observer) {
    observer.disconnect();
  }
})

function animate() {
  let canvas = myCanvas.value;
  let ctx = canvas!.getContext("2d")!;
  let dotRadius = 7 / 2;
  ctx.clearRect(0, 0, canvas!.width, canvas!.height);

  dots.forEach((dot) => {
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
}

const loadBondedTokens = async (): Promise<void> => {
  const res = await fetch(`${API_MAINNET}/cosmos/staking/v1beta1/pool`);
  const data: StakingPoolResponse = await res.json();
  bondedTokens.value = new Dec(data.pool.bonded_tokens);
};

const loadTallying = async (): Promise<void> => {
  const res = await fetch(`${API_MAINNET}/cosmos/gov/v1/params/tallying`);
  const data: TallyingParamsResponse = await res.json();
  quorum.value = new Dec(data.params?.quorum || data.tally_params?.quorum || "0");
};

const fetchProposalData = async (proposal: Proposal) => {
  try {
    const promises = [
      fetch(`${API_MAINNET}/cosmos/gov/v1/proposals/${proposal.id}/tally`)
        .then((d) => d.json())
        .then((item) => {
          proposal.tally = item.tally;
        })
    ];

    await Promise.allSettled(promises);
  } catch (error: Error | any) {
    state.value.showErrorDialog = true;
    state.value.errorMessage = error?.message;
  }
};

const fetchData = async (url: string): Promise<GovernanceResponse | null> => {
  try {
    const req = await fetch(url);
    if (!req.ok) {
      throw new Error(`HTTP ${req.status}: ${req.statusText}`);
    }
    return await req.json();
  } catch (error: Error | any) {
    state.value.showErrorDialog = true;
    state.value.errorMessage = error.message;
    console.error(error);
    return null;
  }
};

const fetchGovernanceProposals = async () => {
  const data = await fetchData(
    `${API_MAINNET}/cosmos/gov/v1/proposals?pagination.limit=${state.value.limit}&pagination.reverse=true&pagination.countTotal=true`
  );
  if (!data) return;

  const promises = [];

  for (const item of data.proposals) {
    promises.push(fetchProposalData(item));
  }

  await Promise.all(promises);
  proposals.value = data.proposals;
  state.value.pagination = data.pagination;
};

const onReadMore = ({ summary, title }: { summary: string; title: string }) => {
  state.value.showReadMoreModal = true;
  state.value.proposal = {
    ...state.value.proposal,
    summary,
    title
  };
};

const onCloseReadMoreModal = () => {
  state.value.showReadMoreModal = false;
};

const visible = computed(() => {
  return state.value.pagination.next_key;
});

const loadMoreProposals = async () => {
  const data = await fetchData(
    `${API_MAINNET}/cosmos/gov/v1/proposals?pagination.limit=${state.value.limit}&pagination.key=${state.value.pagination.next_key}&pagination.reverse=true&pagination.countTotal=true`
  );

  if (!data) return;

  const promises = [];

  for (const item of data.proposals) {
    promises.push(fetchProposalData(item));
  }

  await Promise.all(promises);

  proposals.value = [...proposals.value, ...data.proposals];
  state.value.pagination = data.pagination;
};
</script>
