<template>
  <div
    :class="{
      'pt-[15px]': !showHeader
    }"
    @click.stop
  >
    <div
      v-if="showHeader"
      class="modal-header flex"
    >
      <div class="navigation-header">
        <button
          v-if="back"
          class="absolute left-0 top-2/4 -mt-3 px-4 align-baseline md:px-10"
          type="button"
          @click="backClick"
        >
          <ArrowLeftIcon
            aria-hidden="true"
            class="text-primary h-6 w-6"
          />
        </button>
        <h1 class="mb-10 text-3xl font-bold">
          {{ headerList[0] }}
        </h1>
      </div>
    </div>
    <div class="prose"><slot></slot></div>
  </div>
</template>

<script lang="ts" setup>
import { type PropType, provide, ref } from "vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  headerList: {
    type: Array as PropType<string[]>,
    required: true
  },
  activeTab: {
    type: Number,
    default: 1
  },
  disabled: {
    type: Array<Number>,
    default: []
  },
  back: {
    type: Function,
    required: false
  },
  routes: {
    type: Array as PropType<string[]>,
    default: () => {
      return [];
    }
  }
});

const showHeader = ref(true);

const backClick = () => {
  if (props.back) {
    props.back();
  }
};

function setShowDialogHeader(shouldShow: boolean) {
  showHeader.value = shouldShow;
}

provide("setShowDialogHeader", setShowDialogHeader);
</script>
<style lang="scss"></style>
