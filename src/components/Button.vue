<template>
  <a
    :href="link"
    class="flex inline-flex cursor-pointer items-center justify-center gap-x-2 font-medium transition-all focus:outline-none"
    :class="[size(), variant().buttonStyles[props.theme]]"
    v-bind="$attrs"
    @click="handleClick"
  >
    <template v-if="icon">
      <component
        :is="icon"
        :class="[props.size === 'sm' ? 'h-5' : 'h-6', variant().iconColor[props.theme]]"
      />
    </template>
    <slot></slot>
  </a>
</template>

<script lang="ts" setup>
import { Theme } from "@/config";
import type { PropType } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "md"
  },
  variant: {
    type: String,
    default: "primary"
  },
  theme: {
    type: String as PropType<Theme>,
    default: Theme.light
  },
  link: {
    type: String,
    default: "#"
  },
  icon: {
    type: [Object, Function, String]
  }
});

/* Button size */
const size = () => {
  const sizesList: { [key: string]: string } = {
    sm: "rounded-full px-3.5 py-2 text-sm shadow-md",
    md: "rounded-full px-4 py-3 text-md shadow-lg",
    lg: "rounded-full px-6 py-4 text-md shadow-xl"
  };

  return sizesList[props.size as string] || "";
};

/* Button Variant */
const variant = () => {
  const variantsList: {
    [key: string]: {
      buttonStyles: {
        light: string;
        dark: string;
      };
      iconColor: {
        light: string;
        dark: string;
      };
    };
  } = {
    primary: {
      buttonStyles: {
        light: "bg-blue-500 text-white hover:bg-blue-600 shadow-blue-200",
        dark: "bg-blue-600 text-white hover:bg-blue-600 shadow-blue-800"
      },
      iconColor: {
        light: "text-white fill-white",
        dark: "text-blue-500 fill-blue-500"
      }
    },
    secondary: {
      buttonStyles: {
        light: "text-neutral-900 hover:bg-neutral-100 bg-white",
        dark: "text-neutral-50 hover:bg-neutral-950 shadow-neutral-200/80 bg-neutral-900 border border-neutral-600"
      },
      iconColor: {
        light: "text-blue-500 fill-blue-500",
        dark: "text-blue-300 fill-blue-300"
      }
    },
    clean: {
      buttonStyles: {
        light: "text-neutral-900 hover:bg-neutral-100 shadow-none",
        dark: "text-neutral-50 hover:bg-neutral-100 shadow-none"
      },
      iconColor: {
        light: "text-blue-500 fill-blue-500",
        dark: "text-blue-300 fill-blue-300"
      }
    }
  };

  return (
    variantsList[props.variant] ?? {
      buttonStyles: {
        light: "",
        dark: ""
      },
      iconColor: {
        light: "",
        dark: ""
      }
    }
  );
};

function handleClick(event: MouseEvent) {
  if (props.link === "#") {
    event.preventDefault();
  }
}
</script>
