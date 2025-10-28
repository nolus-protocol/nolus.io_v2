<template>
  <header
    :class="{ 'bg-gradient-to-b from-neutral-100 to-white shadow-lg backdrop-blur-xl lg:bg-white': isHeaderScrolled }"
    class="fixed inset-x-0 top-0 z-50 transition-all"
  >
    <nav
      class="flex items-center justify-between lg:px-8 lg:py-4"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <router-link
          class="flex h-8 w-auto items-center p-4"
          :to="getLocalePath('/')"
        >
          <span class="sr-only">{{ $t('header_nolusProtocol') }}</span>
          <component
            :is="NolusLogoSymbol"
            class="mr-3 h-8 fill-orange-400"
            alt=""
            aria-hidden="true"
          ></component>
          <component
            :is="NolusLogoType"
            class="h-6"
            :class="fillColorClass"
            alt=""
            aria-hidden="true"
          ></component>
        </router-link>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="inline-flex items-center justify-center p-4 py-5 hover:bg-neutral-200/50"
          :class="textColorClass"
          @click="isOpen = true"
        >
          <span class="sr-only">{{ $t('header_openMainMenu') }}</span>
          <BarsIcon
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-8">
        <div
          v-for="item in navigationWithTextColorClass"
          :key="item.id"
        >
          <router-link
            v-if="item.internal && item.nameKey"
            :key="item.id"
            :to="item.href!"
            class="block rounded-lg px-3 py-2 text-base font-medium transition-all hover:bg-neutral-200/50"
            :class="textColorClass"
            active-class="bg-neutral-200/40"
          >
            {{ $t(item.nameKey) }}
          </router-link>
          <component
            v-else-if="!item.internal && item.name"
            :is="item.name"
            :textColorClass="item.textColorClass"
            :fillColorClass="item.fillColorClass"
          />
        </div>
      </div>
      <div class="hidden h-5 lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-4">
        <Button
          size="sm"
          v-bind:class="!y ? 'hidden' : ''"
          :icon="SquareArrowTopRightIcon"
          link="https://app.nolus.io/"
          class=""
          >{{ $t('common_launchApp') }}</Button
        >
        <PopoverLanguagePicker v-bind="{ textColorClass, bgColorClass, fillColorClass, isHeaderScrolled, isHeroDark }" />
      </div>
    </nav>
    <TransitionRoot
      appear
      :show="isOpen"
      as="template"
    >
      <Dialog
        as="div"
        class="lg:hidden"
        @close="isOpen = false"
      >
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 z-50 bg-neutral-300/50 backdrop-blur-xl" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0 -translate-y-4 scale-95 md:translate-y-0 md:translate-x-12 md:scale-100"
          enter-to="opacity-100 translate-y-0 md:translate-x-0 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0 -translate-y-4 scale-95 md:translate-y-0 md:translate-x-12 md:scale-100"
        >
          <DialogPanel
            class="fixed inset-y-0 right-0 z-50 flex h-full w-full flex-col justify-between overflow-y-auto bg-neutral-100/80 backdrop-blur-xl sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          >
            <div>
              <div class="flex items-center justify-between">
                <button
                  type="button"
                  class="w-full border-b border-neutral-200/50 px-4 py-6 text-neutral-700 hover:bg-neutral-200/60"
                  @click="isOpen = false"
                >
                  <span class="sr-only">{{ $t('header_closeMenu') }}</span>
                  <CrossLargeIcon
                    class="mx-auto h-5 w-5 fill-neutral-800"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div class="mt-8 flex flex-col gap-y-4 px-4">
                <div>
                  <router-link
                    key="home"
                    :to="getLocalePath('/')"
                    class="block rounded-2xl px-5 py-5 text-lg font-medium text-neutral-900 hover:bg-gray-50"
                    active-class="bg-white shadow-lg"
                    @click="isOpen = false"
                    >{{ $t('header_home') }}</router-link
                  >
                </div>
                <div v-for="(item, index) in navigation" :key="index">
                  <router-link
                    v-if="item.internal && item.nameKey"
                    :key="item.id"
                    :to="item.href!"
                    class="block rounded-2xl px-5 py-5 text-lg font-medium text-neutral-900 hover:bg-gray-50"
                    active-class="bg-white shadow-lg"
                    @click="isOpen = false"
                  >
                    {{ $t(item.nameKey) }}
                  </router-link>
                  <component
                    v-else-if="!item.internal && item.name"
                    :is="item.name"
                    :textColorClass="item.textColorClass"
                    :fillColorClass="item.fillColorClass"
                  />
                </div>
              </div>
            </div>
            <div class="bottom-0 mt-16 flex w-full items-center justify-between px-4 py-4">
              <Button
                size="md"
                :icon="SquareArrowTopRightIcon"
                link="https://app.nolus.io/"
                >{{ $t('common_launchApp') }}</Button
              >
              <PopoverLanguagePicker 
                v-bind="{ 
                  textColorClass: 'text-neutral-900', 
                  bgColorClass: 'bg-white', 
                  fillColorClass: 'fill-neutral-900', 
                  isHeaderScrolled: true, 
                  isHeroDark: false 
                }" 
              />
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>
  </header>
</template>

<script lang="ts" setup>
defineProps({
  currentPage: {
    type: String,
    default: "home"
  }
});

import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from "@headlessui/vue";

import BarsIcon from "@/assets/icons/bars.svg";
import CrossLargeIcon from "@/assets/icons/cross-large.svg";
import SquareArrowTopRightIcon from "@/assets/icons/square-arrow-top-right-2.svg";
import NolusLogoSymbol from "@/assets/images/logo-symbol.svg";
import NolusLogoType from "@/assets/images/logo-type.svg";
import Button from "./Button.vue";
import PopoverEducational from "./PopoverEducational.vue";
import PopoverResources from "./PopoverResources.vue";
import PopoverLanguagePicker from "./PopoverLanguagePicker.vue";

const y = ref(false);
const { locale } = useI18n();
const router = useRouter();

// Helper to generate locale-aware paths
const getLocalePath = (path: string) => {
  const currentLocale = locale.value;
  if (currentLocale === 'en') {
    return path;
  }
  return `/${currentLocale}${path}`;
};

const navigation = computed(() => [
  { id: 1, type: "link", nameKey: "header_about", href: getLocalePath("/about"), internal: true, textColorClass: "", fillColorClass: "" },
  {
    id: 2,
    type: "link",
    nameKey: "header_governance",
    href: getLocalePath("/governance"),
    internal: true,
    textColorClass: "",
    fillColorClass: ""
  },
  { id: 3, type: "menu", name: PopoverEducational, internal: false, textColorClass: "", fillColorClass: "" },
  { id: 4, type: "menu", name: PopoverResources, internal: false, textColorClass: "", fillColorClass: "" }
]);

const isOpen = ref(false);
const isHeaderScrolled = computed(() => y.value);
const isHeroDark = computed(() => {
  const routeName = router.currentRoute.value.name as string;
  return routeName === "about" || routeName === "about-localized";
});

const textColorClass = computed(() =>
  isHeroDark.value && !isHeaderScrolled.value ? "text-white" : "text-neutral-900"
);

const fillColorClass = computed(() =>
  isHeroDark.value && !isHeaderScrolled.value ? "fill-white" : "fill-neutral-900"
);

const bgColorClass = computed(() =>
  isHeroDark.value && !isHeaderScrolled.value ? "bg-white/10" : "bg-white"
);

const navigationWithTextColorClass = computed(() => {
  return navigation.value.map((item) => {
    if (item.name === PopoverEducational || item.name === PopoverResources) {
      return {
        ...item,
        textColorClass: textColorClass.value,
        fillColorClass: fillColorClass.value
      };
    } else {
      return item;
    }
  });
});

const scroll = () => {
  y.value = window.scrollY > 0;
}

onMounted(() => {
  window.addEventListener("scroll", scroll, { passive: true });
})
</script>
