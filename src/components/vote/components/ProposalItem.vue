<template>
  <div
    :class="wrapperClasses"
    class="proposal w-full flex flex-col shadow lg:rounded-xl p-5 gap-3"
  >
    <div class="flex flex-col md:flex-row gap-2 md:gap-0 justify-between text-[10px] text-upper">
      <div class="flex items-center gap-1">
        <div :class="{ [color.bg]: color }" class="w-1.5 h-1.5 rounded" />
        <div :class="{ [color.text]: color }" class="font-medium">
          {{ ProposalStatus[state.status].split("_")[2] }}
        </div>
      </div>
      <div v-if="isVotingPeriod" class="flex gap-2 text-light-blue">
        <div>turnout: {{ turnout }}%</div>
        <div>quorum: {{ quorumState }}%</div>
        <div>voting ends: {{ DateUtils.formatDateTime(state.voting_end_time) }}</div>
      </div>
    </div>
    <div class="text-2xl font-bold tracking-tight text-neutral-900 break-words">
      &#35;{{ state.id }} {{ state.title }}
    </div>
    <ProposalVotingLine
      v-if="isVotingPeriod && Object.values(state.tally).filter((res) => !!Number(res)).length > 0"
      :voting="state.tally"
    />
    <div v-if="state.summary" class="text-neutral-600">
      <div class="font-bold text-md mb-1">Summary</div>
      <p class="text-sm">
        {{ StringUtils.truncateText(state.summary, 256) }}
      </p>
    </div>
    <button
      v-if="state.summary && state.summary.length > 256"
      class="self-start flex items-center justify-center font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer transition-all inline-flex rounded-full px-3.5 py-2 text-sm shadow-md bg-blue-500 text-white hover:bg-blue-600 focus-visible:outline-blue-600 shadow-blue-200"
      @click="$emit('read-more', { title: state.title, summary: state.summary })"
    >
      Read more
    </button>

    <div v-if="isVotingPeriod" class="flex flex-col gap-3">
      <div class="w-full border-standart border-b bg-transparent"></div>
      <button
        class="self-end flex items-center justify-center font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer transition-all inline-flex rounded-full px-8 py-2 text-sm shadow-md bg-blue-500 text-white hover:bg-blue-600 focus-visible:outline-blue-600 shadow-blue-200"
        @click="$emit('vote', state)"
      >
        Vote
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType } from "vue";
import { DateUtils, StringUtils } from "@/utils";
import { type Proposal, ProposalStatus, type FinalTallyResult } from "../Proposal";
import { ProposalState } from "../state";
import { Dec } from "@keplr-wallet/unit";
import ProposalVotingLine from "./ProposalVotingLine.vue";

const props = defineProps({
  state: {
    type: Object as PropType<Proposal>,
    required: true,
    default: ProposalState
  },
  bondedTokens: {
    type: Object as PropType<Dec | any>,
    required: true
  },
  quorum: {
    type: Object as PropType<Dec | any>,
    required: true
  }
});

const turnout = computed(() => {
  if (props.bondedTokens.isZero()) {
    return 0;
  }

  let tally = new Dec(0);

  for (const key in props.state.tally) {
    tally = tally.add(new Dec(props.state.tally[key as keyof FinalTallyResult]));
  }

  return tally.quo(props.bondedTokens).mul(new Dec(100)).toString(2);
});

const quorumState = computed(() => {
  return props.quorum.mul(new Dec(100)).toString(2);
});

const color = computed(() => {
  switch (props.state.status) {
    case ProposalStatus.PROPOSAL_STATUS_PASSED:
      return { bg: "bg-green-400", text: "text-green-400" };
    case ProposalStatus.PROPOSAL_STATUS_REJECTED || ProposalStatus.PROPOSAL_STATUS_FAILED:
      return { bg: "bg-[#E42929]", text: "text-[#E42929]" };
    case ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD: {
      if (props.state.voted) {
        return { bg: "bg-dark-500", text: "text-dark-500" };
      }
      return { bg: "bg-light-electric", text: "text-light-electric" };
    }
    default:
      return { bg: "bg-light-electric", text: "text-light-electric" };
  }
});

const isVotingPeriod = computed(() => {
  return props.state.status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD;
});

const wrapperClasses = computed(() =>
  isVotingPeriod.value ? ["background"] : ["bg-transparent", "lg:w-[calc(50%-10px)]"]
);

defineEmits(["vote", "read-more"]);
</script>

<style lang="scss" scoped>
  .proposal {
    outline: none;
    position: relative;
  }
</style>
