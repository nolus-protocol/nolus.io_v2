<template>
  <div
    :class="{
      'pt-[15px]': !showHeader
    }"
    @click.stop
  >
    <div v-if="showHeader" class="flex modal-header">
      <template v-if="isTabLayout">
        <button
          v-for="(tab, index) of headerList"
          :key="`${tab}-${index}`"
          :class="index + 1 === activeTab ? 'active' : ''"
          @click="switchTab(index + 1)"
          v-text="tab"
        ></button>
      </template>
      <div v-else class="navigation-header">
        <button
          v-if="back"
          class="align-baseline absolute left-0 top-2/4 -mt-3 px-4 md:px-10"
          type="button"
          @click="backClick"
        >
          <ArrowLeftIcon aria-hidden="true" class="h-6 w-6 text-primary" />
        </button>
        <h1 class="text-3xl font-bold mb-10">
          {{ headerList[0] }}
        </h1>
      </div>
    </div>

    <template v-if="isTabLayout">
      <template v-for="(tab, index) in headerList">
        <slot v-if="index + 1 === activeTab" :key="index" :name="`tab-${index + 1}`"> </slot>
      </template>
    </template>
    <slot v-else></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType, provide, ref } from "vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import router from "@/router";

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

const activeTab = ref(props.activeTab);
const showHeader = ref(true);

const backClick = () => {
  if (props.back) {
    props.back();
  }
};

const isTabLayout = computed(() => {
  return props.headerList.length > 1;
});

function switchTab(index: number) {
  if (props.disabled.includes(index)) {
    return false;
  }
  activeTab.value = index;
  const route = props.routes[index - 1];
  if (route != null) {
    setRoute(route);
  }
}

function setRoute(route: string) {
  const path = router.currentRoute.value.path;
  console.log(path)
  router.replace({
    path,
    hash: `#${route}`
  });
}

function setShowDialogHeader(shouldShow: boolean) {
  showHeader.value = shouldShow;
}

provide("setShowDialogHeader", setShowDialogHeader);
</script>
<style lang="scss">


</style>