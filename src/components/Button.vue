<template>
    <a :href="link" class="font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors inline-flex gap-x-2" :class="size(), variant().buttonStyles[props.theme]" v-bind="$attrs">
      <template v-if="icon">
        <component :is="icon" :class="[props.size==='sm'?'h-5':'h-6', variant().iconColor[props.theme]]" />
      </template>
      <slot></slot>
    </a>
</template>

<script setup>

/* Define props */
const props = defineProps({
  size: {
    type: String,
    default: 'md'
  },
  variant: {
    type: String,
    default: 'primary'
  },
  theme: {
    type: String,
    default: 'light'
  },
  link: {
    type: String,
    default: '#'
  },
  icon: {
    type: [Object, Function]
  }
})

/* Button size */
const size = () => {
  const sizesList = {
    'sm': 'rounded-full px-3.5 py-2 text-sm',
    'md': 'rounded-full px-4 py-3 text-md',
    'lg': 'rounded-full px-6 py-4 text-md',
  }

  return sizesList[props.size] || '';
}

/* Button Variant */
const variant = () => {
  const variantsList = {
    'primary': {
      buttonStyles: {
        light: 'bg-blue-500 text-white hover:bg-blue-600 focus-visible:outline-blue-600 shadow-plastic-soft',
        dark: 'bg-blue-600 text-white hover:bg-blue-600 focus-visible:outline-blue-600 shadow-plastic-soft'
      },
      iconColor: {
        light: 'text-white fill-white',
        dark: 'text-blue-500 fill-blue-500'
      }
    },
    'secondary': {
      buttonStyles: {
        light: 'text-neutral-900 hover:bg-neutral-100 focus-visible:outline-neutral-500 bg-neutral-50 shadow-plastic-hard',
        dark: 'text-neutral-50 hover:bg-neutral-950 focus-visible:outline-neutral-500 shadow-neutral-200/80 bg-neutral-900 border border-neutral-600 shadow-plastic-hard'
      },
      iconColor: {
        light: 'text-blue-500 fill-blue-500',
        dark: 'text-blue-300 fill-blue-300'
      }
    },
    'clean': {
      buttonStyles: {
        light: 'text-neutral-900 hover:bg-neutral-100 focus-visible:outline-neutral-500 shadow-none shadow-plastic-hard',
        dark: 'text-neutral-50 hover:bg-neutral-100 focus-visible:outline-neutral-500 shadow-none shadow-plastic-hard'
      },
      iconColor: {
        light: 'text-blue-500 fill-blue-500',
        dark: 'text-blue-300 fill-blue-300'
      }
    }
  }

  return variantsList[props.variant] || '';
}

</script>