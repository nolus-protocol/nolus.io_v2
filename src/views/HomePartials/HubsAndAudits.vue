<template>
  <div class="relative bg-neutral-100">
    <NolusContainer class="relative -top-24 z-10 md:-mb-20">
      <div class="grid grid-cols-1 items-start gap-x-8 gap-y-8 md:grid-cols-2 lg:gap-x-12 lg:gap-y-12">
        <div class="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div class="p-6 md:p-12">
            <p
              class="text-base font-medium leading-7 text-blue-600"
              aria-hidden="true"
            >
              Liquidity
            </p>
            <h2
              class="mt-2 text-3xl font-bold tracking-tight text-neutral-900 lg:text-5xl"
              aria-hidden="true"
            >
              Multiple Hubs
            </h2>
            <p class="mt-3 text-base leading-8 text-neutral-600 lg:mt-6 lg:text-lg">
              Nolus taps into a diverse set of interconnected liquidity hubs, enabling immediate lending or asset
              swapping without creating fragmentation and inefficiencies across markets
            </p>
          </div>
          <div>
            <ul class="flex flex-wrap gap-px border-t bg-neutral-200/70 text-center">
              <li
                v-for="hub in hubs"
                :key="hub.id"
                class="flex-grow basis-12 bg-white md:basis-40"
              >
                <a
                  :href="hub.link"
                  class="flex flex-col items-center px-4 py-7 transition-all hover:bg-neutral-100"
                >
                  <figure
                    class="mx-auto mb-4 h-20 w-20 rounded-full bg-white p-4 text-xs shadow-inner shadow-sm shadow-neutral-200"
                    aria-hidden="true"
                  >
                    <component
                      :is="hub.image"
                      :alt="`Logo of ${hub.shortName}`"
                    ></component>
                  </figure>
                  <h3 class="text-sm leading-3 text-neutral-600">{{ hub.shortName }}</h3>
                  <p class="text-lg leading-7 tracking-tight text-neutral-900">{{ hub.fullName }}</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="overflow-hidden rounded-2xl bg-white pb-4 shadow-xl">
          <div class="p-6 md:p-12">
            <p
              class="text-base font-medium leading-7 text-blue-600"
              aria-hidden="true"
            >
              Safety
            </p>
            <h2
              class="mt-2 text-3xl font-bold tracking-tight text-neutral-900 lg:text-5xl"
              aria-hidden="true"
            >
              Audited
            </h2>
            <p class="mt-3 text-base leading-8 text-neutral-600 lg:mt-6 lg:text-lg">
              Nolus adheres to the highest security standards and is audited by leading experts in the industry
            </p>
          </div>
          <div>
            <ul class="flex flex-col gap-px border-t border-neutral-200/50">
              <li
                v-for="audit in audits"
                :key="audit.id"
                class="border-b border-neutral-200/70"
              >
                <a
                  :href="audit.url"
                  class="flex items-center justify-between gap-x-4 bg-white px-6 py-4 transition-all hover:bg-neutral-100 md:px-12"
                >
                  <div class="flex items-center gap-x-4">
                    <span class="w-10 overflow-hidden rounded-full bg-green-400"
                      ><img
                        :src="audit.logoUrl"
                        alt=""
                        aria-hidden="true"
                    /></span>
                    <p class="font-medium leading-5">
                      <span class="block text-base tracking-tight">{{ audit.name }}</span>
                      <span class="text-sm font-light"
                        >by <a href="https://www.oaksecurity.io/">{{ audit.auditor }}</a></span
                      >
                    </p>
                  </div>
                  <component
                    :is="ChevronRightIcon"
                    class="h-4 w-4 fill-neutral-500"
                    aria-hidden="true"
                  ></component>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </NolusContainer>
  </div>
</template>

<script lang="ts" setup>
// For Hubs widget
import NolusContainer from "@/components/NolusContainer.vue";
import osmosisImage from "../../assets/images/hubs/osmosis.svg";
import astroportImage from "../../assets/images/hubs/astroport.svg";
import halborn_logo from "../../assets/images/auditors/halborn_logo.jpeg";
import oak_logo from "../../assets/images/auditors/oak_logo.jpeg";
import hydroImage from "../../assets/images/hubs/hydro.svg";

// For Audits widget
import ChevronRightIcon from "@/assets/icons/chevron-right.svg";

const hubs = [
  {
    id: 1,
    shortName: "Osmosis",
    fullName: "Osmosis DEX",
    comingSoon: false,
    image: osmosisImage,
    link: "https://osmosis.zone/"
  },
  {
    id: 2,
    shortName: "Neutron",
    fullName: "Astroport",
    comingSoon: false,
    image: astroportImage,
    link: "https://astroport.fi/"
  },
  {
    id: 3,
    shortName: "Neutron",
    fullName: "Hydro",
    comingSoon: false,
    image: hydroImage,
    link: "https://hydro.cosmos.network/"
  }
];

const audits = [
  {
    id: 1,
    name: "Nolus Core",
    auditor: "Oak Security",
    url: "https://github.com/oak-security/audit-reports/blob/master/Nolus/2022-12-12%20Audit%20Report%20-%20Nolus%20Core%20v1.1.pdf",
    logoUrl: oak_logo
  },
  {
    id: 2,
    name: "Money Market",
    auditor: "Oak Security",
    url: "https://github.com/oak-security/audit-reports/blob/master/Nolus/2023-01-27%20Audit%20Report%20-%20Nolus%20Money%20Market%20v1.1.pdf",
    logoUrl: oak_logo
  },
  {
    id: 3,
    name: "Money Market",
    auditor: "Halborn",
    url: "https://github.com/HalbornSecurity/PublicReports/blob/master/CosmWasm%20Smart%20Contract%20Audits/Nolus_Money_Market_CosmWasm_Smart_Contract_Security_Assessment_Report_Halborn_Final.pdf",
    logoUrl: halborn_logo
  }
];
</script>
