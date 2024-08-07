<template>
  <Popover
    class="relative"
    v-slot="{ open }"
  >
    <PopoverButton
      class="inline-flex items-center gap-x-1 rounded-lg px-3 py-2.5 leading-6 text-neutral-900 transition-all"
      :class="[
        {
          'bg-neutral-200/40': open,
          'shadow-none hover:bg-neutral-200/50': isHeroDark,
          'hover:bg-neutral-50': !isHeroDark
        },
        buttonScrollStyles
      ]"
    >
      <span
        :class="`${props.textColorClass} font-medium`"
        class="overflow-hidden rounded-sm"
        ><component
          :is="flagIcons['en.svg']"
          aria-label="English"
      /></span>
      <ChevronDownSmallIcon
        class="h-5 w-5 rotate-180 fill-neutral-800 lg:rotate-0"
        :class="props.fillColorClass"
        aria-hidden="true"
      />
    </PopoverButton>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1 scale-95 origin-bottom"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1 scale-95 origin-bottom"
    >
      <PopoverPanel class="absolute bottom-14 right-0 z-10 mt-5 flex w-screen max-w-min md:bottom-auto">
        <div
          class="flex w-56 shrink flex-col gap-y-1 rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5"
        >
          <a
            v-for="language in languages"
            :key="language.short_string"
            :href="language.route"
            class="flex items-center gap-x-2 rounded-md p-2 transition-all hover:bg-blue-100 hover:text-blue-600"
            :class="{ 'bg-neutral-100': language.active }"
            :aria-label="language.lang"
            ><component
              :is="flagIcons[language.icon]"
              class="overflow-clip rounded-sm"
              aria-hidden="true"
            />
            {{ language.lang }}</a
          >
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, markRaw } from "vue";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import ChevronDownSmallIcon from "@/assets/icons/chevron-down-small.svg";

const buttonScrollStyles = computed(() => (!props.isHeaderScrolled ? `shadow-md ${props.bgColorClass}` : ""));

const props = defineProps({
  textColorClass: String,
  fillColorClass: String,
  bgColorClass: String,
  isHeaderScrolled: Boolean,
  isHeroDark: Boolean
});

const languages = [
  { short_string: "EN", lang: "English", route: "", icon: "en.svg", active: true },
  { short_string: "RU", lang: "Русский", route: "", icon: "ru.svg", active: false },
  { short_string: "CN", lang: "中文", route: "", icon: "cn.svg", active: false },
  { short_string: "ES", lang: "Español", route: "", icon: "es.svg", active: false },
  { short_string: "GR", lang: "Ελληνικά", route: "", icon: "gr.svg", active: false },
  { short_string: "TR", lang: "Türkçe", route: "", icon: "tr.svg", active: false },
  { short_string: "FR", lang: "Français", route: "", icon: "fr.svg", active: false }
];

const flagIcons = ref<{[key: string]: string}>({});

onMounted(async () => {
  const flags = import.meta.glob("@/assets/icons/flags/*.svg");

  for (const [path, importFn] of Object.entries(flags)) {
    const module = await importFn();
    const flag = path.split("/").pop();
    flagIcons.value[flag as string] = markRaw((module as any).default);
  }
});
</script>
