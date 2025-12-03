<template>
  <Popover
    class="relative"
    v-slot="{ open, close }"
  >
    <div
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave(close)"
    >
      <PopoverButton
        ref="buttonRef"
        class="flex w-full items-center justify-between gap-x-1 rounded-t-2xl px-5 py-5 transition-all lg:rounded-lg lg:px-3 lg:py-2 lg:hover:bg-neutral-200/50 focus:outline-none"
        :class="{ 'bg-white shadow-lg lg:bg-neutral-200/40 lg:shadow-none': open }"
      >
        <span class="font-medium" :class="props.textColorClass">{{ $t('popover_resources') }}</span>
        <ChevronDownSmallIcon
          class="h-7 w-7 fill-neutral-800 transition-transform duration-200 lg:h-5 lg:w-5"
          :class="[open ? 'rotate-90 lg:rotate-180' : 'rotate-0', props.fillColorClass]"
          aria-hidden="true"
        />
      </PopoverButton>

      <transition
        enter-active-class="transition ease-in-out duration-200"
        enter-from-class="opacity-0 translate-y-3 md:scale-95 origin-bottom"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-3 md:scale-95 origin-bottom"
      >
        <PopoverPanel
          static
          v-show="open"
          class="flex max-w-max lg:absolute lg:left-1/2 lg:z-10 lg:mt-5 lg:w-screen lg:-translate-x-1/2 lg:px-4"
        >
        <div
          class="w-screen max-w-md flex-auto overflow-hidden rounded-b-2xl bg-white p-4 leading-6 shadow-2xl ring-1 ring-neutral-900/5 lg:rounded-3xl"
        >
          <a
            v-for="item in solutions"
            :key="item.name"
            :href="item.href"
            class="rounded-lg"
          >
            <div class="group relative flex gap-x-4 rounded-lg p-4 text-sm transition-all hover:bg-blue-100">
              <div
                class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-blue-100 transition-all group-hover:bg-blue-200"
              >
                <component
                  :is="item.icon"
                  class="h-6 w-6 fill-blue-500 text-blue-500"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p class="font-semibold text-neutral-900">
                  {{ item.name }}
                </p>
                <p class="mt-1 font-normal text-neutral-600">{{ item.description }}</p>
              </div>
            </div>
          </a>
        </div>
        </PopoverPanel>
      </transition>
    </div>
  </Popover>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { usePopoverHover } from "@/composables/usePopoverHover";
import ChevronDownSmallIcon from "@/assets/icons/chevron-down-small.svg";

const { buttonRef, onMouseEnter, onMouseLeave } = usePopoverHover('resources');
import GithubIcon from "../assets/icons/github.svg";
import ShieldCheckIcon from "../assets/icons/shield-check.svg";
import ColorPaletteIcon from "../assets/icons/color-palette.svg";
import HeadphonesIcon from "../assets/icons/headphones.svg";

const { t } = useI18n({ useScope: 'global' });

const props = defineProps({
  textColorClass: String,
  fillColorClass: String
});

const solutions = computed(() => [
  {
    name: t("popover_resourcesTechDoc"),
    description: t("popover_resourcesTechDocDesc"),
    href: "https://hub.nolus.io/en_US/technical-documentation",
    icon: HeadphonesIcon
  },
  {
    name: t("popover_resourcesGithub"),
    description: t("popover_resourcesGithubDesc"),
    href: "https://github.com/nolus-protocol",
    icon: GithubIcon
  },
  {
    name: t("popover_resourcesAudits"),
    description: t("popover_resourcesAuditsDesc"),
    href: "https://hub.nolus.io/en_US/technical-documentation/security",
    icon: ShieldCheckIcon
  },
  {
    name: t("popover_resourcesBrandAssets"),
    description: t("popover_resourcesBrandAssetsDesc"),
    href: "/Nolus-Brandkit.pdf",
    icon: ColorPaletteIcon
  }
]);
</script>
