<template>
  <DialogHeader :headerList="[title]">
    <div
      class="proposal-modal w-full overflow-auto text-left"
      v-html="description"
    ></div>
  </DialogHeader>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { marked } from "marked";
import DialogHeader from "./DialogHeader.vue";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  }
});

const description = computed(() => {
  return marked.parse(props.source, {
    pedantic: true,
    gfm: true,
    breaks: true
  });
});
</script>

<style lang="scss">
.proposal-modal {
  p {
    text-align: left;
    margin-bottom: 18px;

    &.strong {
      font-weight: 600;
    }
  }

  ul {
    margin-bottom: 18px;
    list-style: unset;
  }

  h1 {
    text-align: left;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 18px;
  }

  h2 {
    text-align: left;
    font-weight: 700;
    font-size: 14px;
  }

  a {
    transition: ease 200ms;
    color: #2868e1;

    &.link {
      color: #2868e1;
    }
  }

  a:hover {
    color: #2868e1;
  }

  & {
    scrollbar-width: thin;
    scrollbar-color: #9c9c9c #f5f5f5;
  }

  &::-webkit-scrollbar-track {
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c1cad7;
    border: solid 1px white;
    border-radius: 4px;
  }
}
</style>
