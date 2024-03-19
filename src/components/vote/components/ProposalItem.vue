<template>
  <div class="flex w-full flex-col justify-between gap-y-5 overflow-clip rounded-xl bg-white shadow-lg">
    <div class="flex items-start justify-between p-5 pb-0">
      <div
        class="basis-4/5 overflow-hidden break-words text-xl font-medium tracking-tight text-neutral-900 md:text-2xl"
      >
        &#35;{{ state.id }} {{ state.title }}
      </div>
      <div
        class="flex items-center gap-2 rounded-md px-3 py-1"
        :class="{ [color.bg_parent]: color }"
      >
        <div
          :class="{ [color.bg]: color }"
          class="h-2.5 w-2.5 rounded-full"
        />
        <div
          :class="{ [color.text]: color }"
          class="text-sm font-medium"
        >
          {{ ProposalStatus[state.status].split("_")[2] }}
        </div>
      </div>
    </div>
    <div
      class="flex flex-col gap-y-4 border-b border-t px-5 py-4"
      v-if="isVotingPeriod"
    >
      <div class="flex flex-col items-center justify-between gap-2 md:flex-row md:gap-0">
        <div class="flex gap-4">
          <div>
            <span class="block text-sm">Turnout:</span> <span class="text-base font-medium">{{ turnout }}%</span>
          </div>
          <div>
            <span class="block text-sm">Quorum:</span> <span class="text-base font-medium">{{ quorumState }}%</span>
          </div>
          <div>
            <span class="block text-sm">Voting ends:</span>
            <span class="text-base font-medium">{{ DateUtils.formatDateTime(state.voting_end_time) }}</span>
          </div>
        </div>
      </div>

      <ProposalVotingLine
        v-if="isVotingPeriod && Object.values(state.tally).filter((res) => !!Number(res)).length > 0"
        :voting="state.tally"
      />
    </div>
    <div
      v-if="state.summary"
      class="px-5 text-neutral-900"
    >
      <div
        class="prose prose-h1:mb-2 prose-h1:text-lg prose-h1:font-medium prose-h2:my-1 prose-h2:text-lg prose-h2:font-medium"
        v-html="StringUtils.truncateText(description, 156)"
      ></div>
    </div>
    <div class="border-t bg-neutral-50 transition-colors hover:bg-neutral-100">
      <button
        v-if="state.summary && state.summary.length > 156"
        class="flex w-full items-center justify-center p-3 text-sm font-medium hover:text-neutral-800"
        @click="$emit('read-more', { title: state.title, summary: state.summary })"
      >
        Read more
        <ChevronRightSmallIcon
          class="h-5 w-5"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType } from "vue";
import { type Proposal, ProposalStatus, type FinalTallyResult } from "../Proposal";
import { marked } from "marked";
import { DateUtils, StringUtils } from "@/utils";
import { ProposalState } from "../state";
import { Dec } from "@keplr-wallet/unit";

import ProposalVotingLine from "./ProposalVotingLine.vue";
import ChevronRightSmallIcon from "@/assets/icons/chevron-right-small.svg";
import Button from "@/components/Button.vue";

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

const description = computed(() => {
  return marked.parse(props.state.summary, {
    pedantic: true,
    gfm: true,
    breaks: true
  }) as string;
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
      return { bg_parent: "bg-green-500/15", bg: "bg-green-500", text: "text-green-500" };
    case ProposalStatus.PROPOSAL_STATUS_REJECTED || ProposalStatus.PROPOSAL_STATUS_FAILED:
      return { bg_parent: "bg-blue-500/15", bg: "bg-blue-500", text: "text-blue-500" };
    case ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD: {
      if (props.state.voted) {
        return { bg_parent: "", bg: "bg-dark-500", text: "text-dark-500" };
      }
      return { bg_parent: "bg-orange-400/15", bg: "bg-orange-400", text: "text-orange-400" };
    }
    default:
      return { bg_parent: "bg-neutral-500/15", bg: "bg-neutral-800", text: "text-neutral-800" };
  }
});

const isVotingPeriod = computed(() => {
  return props.state.status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD;
});

defineEmits(["vote", "read-more"]);
</script>

<style lang="scss" scoped>
.proposal {
  outline: none;
  position: relative;
}
</style>
