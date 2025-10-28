<template>
  <footer class="bg-white">
    <div class="mx-auto max-w-7xl overflow-hidden px-6 py-16 sm:py-16 lg:px-8">
      <div class="flex flex-col justify-between gap-y-12 md:flex-row">
        <div class="flex space-x-10">
          <a
            v-for="item in social_navigation"
            :key="item.nameKey"
            :href="item.href"
            class="text-blue-600 hover:text-neutral-500"
          >
            <span class="sr-only">{{ $t(item.nameKey) }}</span>
            <component
              :is="item.icon"
              class="h-6 w-6"
              aria-hidden="true"
            />
          </a>
        </div>
        <nav>
          <ul class="flex space-x-5">
            <li
              v-for="item in footer_navigation"
              :key="item.nameKey"
              class="text-sm leading-5"
            >
              <button
                @click="handleClick(item, $event)"
                class="cursor-pointer text-neutral-600 hover:text-neutral-900"
              >
                {{ $t(item.nameKey) }}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <p class="mt-10 border-t border-neutral-100 pt-7 text-xs leading-5 text-neutral-600">
        {{ $t('footer_legalDisclaimer') }}
      </p>
      <a
        href="#"
        class="sr-only"
        >{{ $t('footer_goBackToTop') }}</a
      >
      <Modal
        :show="showTosDialog"
        @close-modal="showTosDialog = false"
      >
        <tosModal />
      </Modal>
      <Modal
        :show="showCookiesDialog"
        @close-modal="showCookiesDialog = false"
      >
        <cookiesModal />
      </Modal>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { defineComponent, h, ref } from "vue";
import Modal from "@/components/modals/templates/Modal.vue";
import tosModal from "@/components/modals/TosModal.vue";
import cookiesModal from "@/components/modals/cookiesModal.vue";

let showTosDialog = ref(false);
let showCookiesDialog = ref(false);

const handleClick = (item: { nameKey: string; href?: string; click: Function }, event: MouseEvent) => {
  !item.href && event.preventDefault();
  item.click && item.click();
};

const footer_navigation = [
  {
    nameKey: "footer_termsOfService",
    click: () => {
      showTosDialog.value = true;
    }
  },
  {
    nameKey: "footer_cookiePolicy",
    click: () => {
      showCookiesDialog.value = true;
    }
  }
];

const social_navigation = [
  {
    nameKey: "footer_socialX",
    href: "https://twitter.com/NolusProtocol",
    icon: defineComponent({
      render: () =>
        h("svg", { fill: "currentColor", viewBox: "0 0 512 512" }, [
          h("path", {
            d: "M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
          })
        ])
    })
  },
  {
    nameKey: "footer_socialDiscord",
    href: "https://discord.com/invite/nolus-protocol",
    icon: defineComponent({
      render: () =>
        h("svg", { fill: "currentColor", viewBox: "0 0 640 512" }, [
          h("path", {
            d: "M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"
          })
        ])
    })
  },
  {
    nameKey: "footer_socialTelegram",
    href: "https://t.me/NolusProtocol",
    icon: defineComponent({
      render: () =>
        h("svg", { fill: "currentColor", viewBox: "0 0 496 512" }, [
          h("path", {
            d: "M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"
          })
        ])
    })
  }
];
</script>
