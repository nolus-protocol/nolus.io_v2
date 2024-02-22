<template>
  <Popover class="relative" v-slot="{ open }">
    <PopoverButton class="inline-flex items-center gap-x-1 leading-6 text-neutral-900 py-2.5 px-3 rounded-lg transition-all" :class="{ 'bg-neutral-200/40': open, 'shadow-none hover:bg-neutral-200/50': isHeroDark, 'hover:bg-neutral-50': !isHeroDark }, buttonScrollStyles">
      <span :class="`${props.textColorClass} font-medium`"><component :is="flagIcons['en.svg']" class="h-5 w-5 rounded-md overflow-clip" aria-label="English" /></span>
      <ChevronDownSmallIcon class="h-5 w-5 rotate-180 lg:rotate-0 fill-neutral-800" :class="props.fillColorClass" aria-hidden="true" />
    </PopoverButton>

    <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1 scale-95 origin-bottom" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1 scale-95 origin-bottom">
      <PopoverPanel class="absolute right-0 bottom-14 md:bottom-auto z-10 mt-5 flex w-screen max-w-min">
        <div class="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5 flex flex-col gap-y-1">
          <a v-for="language in languages" :key="language.short_string" :href="language.route" class="flex gap-x-2 items-center p-2 transition-all hover:text-blue-600 hover:bg-blue-100 rounded-md" :class="{ 'bg-neutral-100': language.active}"><component :is="flagIcons[language.icon]" class="h-5 w-5 rounded-md overflow-clip" aria-hidden="true" /> {{ language.lang }}</a>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
import { onMounted, ref, computed, markRaw } from 'vue';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import ChevronDownSmallIcon from '@/assets/icons/chevron-down-small.svg'

const buttonScrollStyles = computed(() => !props.isHeaderScrolled ? `shadow-md ${props.bgColorClass}` : '')

const props = defineProps({
  textColorClass: String,
  fillColorClass: String,
  bgColorClass: String,
  isHeaderScrolled: Boolean,
  isHeroDark: Boolean
})

const languages = [
    {short_string: 'EN', lang: 'English', route: '', icon: 'en.svg', active: true}, 
    {short_string: 'RU', lang: 'Русский', route: '', icon: 'ru.svg', active: false},
    {short_string: 'CN', lang: '中文', route: '', icon: 'cn.svg', active: false},
    {short_string: 'ES', lang: 'Español', route: '', icon: 'es.svg', active: false},
    {short_string: 'GR', lang: 'Ελληνικά', route: '', icon: 'gr.svg', active: false},
    {short_string: 'TR', lang: 'Türkçe', route: '', icon: 'tr.svg', active: false},
    {short_string: 'FR', lang: 'Français', route: '', icon: 'fr.svg', active: false},
]

const flagIcons = ref({});

onMounted(async () => {
  const flags = import.meta.glob('@/assets/icons/flags/*.svg')

  for (const [path, importFn] of Object.entries(flags)) {
    const module = await importFn();
    const flag = path.split('/').pop()
    flagIcons.value[flag] = markRaw(module.default);
  }
})

</script>