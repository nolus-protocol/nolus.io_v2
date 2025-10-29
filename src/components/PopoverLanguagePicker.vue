<template>
  <Popover
    class="relative"
    v-slot="{ open, close }"
  >
    <PopoverButton
      class="inline-flex items-center gap-x-1 rounded-lg px-3 py-2.5 leading-6 transition-all hover:bg-neutral-200/50"
      :class="[
        open ? 'bg-neutral-200/40' : '',
        textColorClass
      ]"
    >
      <span
        :class="`${props.textColorClass} font-medium`"
        class="flex h-4 w-[21px] flex-shrink-0 items-center justify-center overflow-hidden rounded-sm"
        style="transform: translateZ(0);"
        ><component
          :is="flagIcons[currentLanguage.icon]"
          :aria-label="currentLanguage.lang"
          class="block h-full w-full"
          style="transform: translateZ(0);"
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
      <PopoverPanel class="absolute bottom-14 right-0 z-50 mt-5 flex w-screen max-w-min md:bottom-auto md:right-0">
        <div
          class="flex w-56 shrink flex-col gap-y-1 rounded-xl bg-white p-4 text-sm leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5"
        >
          <button
            v-for="language in languages"
            :key="language.short_string"
            @click="switchLanguage(language.code, close)"
            class="flex items-center gap-x-2 rounded-md p-2 font-medium transition-all hover:bg-blue-100 hover:text-blue-600"
            :class="{ 'bg-neutral-100': language.active }"
            :aria-label="language.lang"
            ><component
              :is="flagIcons[language.icon]"
              class="overflow-clip rounded-sm"
              aria-hidden="true"
            />
            {{ language.lang }}</button
          >
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, markRaw } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import ChevronDownSmallIcon from "@/assets/icons/chevron-down-small.svg";

const { locale } = useI18n();
const route = useRoute();

const props = defineProps({
  textColorClass: String,
  fillColorClass: String,
  bgColorClass: String,
  isHeaderScrolled: Boolean,
  isHeroDark: Boolean
});

const languageData = [
  { code: "en", short_string: "EN", lang: "English", icon: "en.svg" },
  { code: "ru", short_string: "RU", lang: "Русский", icon: "ru.svg" },
  { code: "cn", short_string: "CN", lang: "中文", icon: "cn.svg" },
  { code: "es", short_string: "ES", lang: "Español", icon: "es.svg" },
  { code: "gr", short_string: "GR", lang: "Ελληνικά", icon: "gr.svg" },
  { code: "tr", short_string: "TR", lang: "Türkçe", icon: "tr.svg" },
  { code: "fr", short_string: "FR", lang: "Français", icon: "fr.svg" },
  { code: "id", short_string: "ID", lang: "Bahasa Indonesia", icon: "id.svg" },
  { code: "jp", short_string: "JP", lang: "日本語", icon: "jp.svg" },
  { code: "kr", short_string: "KR", lang: "한국어", icon: "kr.svg" }
];

const languages = computed(() =>
  languageData.map((lang) => ({
    ...lang,
    active: locale.value === lang.code
  }))
);

const currentLanguage = computed(() => 
  languageData.find(lang => lang.code === locale.value) || languageData[0]
);

const switchLanguage = (langCode: string, closePopover?: () => void) => {
  // Save language preference to localStorage
  localStorage.setItem('user-locale', langCode);
  
  // Get current path without locale prefix
  let currentPath = route.path;
  const localeRegex = /^\/(ru|cn|es|fr|gr|tr|id|jp|kr)/;
  if (localeRegex.test(currentPath)) {
    currentPath = currentPath.replace(localeRegex, '');
  }
  
  // Build new path with locale prefix (except for English)
  let newPath;
  if (langCode === 'en') {
    newPath = currentPath || '/';
  } else {
    newPath = `/${langCode}${currentPath || '/'}`;
  }
  
  // Close the popover
  if (closePopover) {
    closePopover();
  }
  
  // Reload the page with the new language
  // The router guard will set locale.value based on the URL
  window.location.href = newPath;
};

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
