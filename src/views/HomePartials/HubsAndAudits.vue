<template>
  <div class="relative bg-neutral-100 pt-24">
    <NolusContainer class="relative z-10">
      <div class="grid grid-cols-2 gap-x-12 items-start">
        <div class="bg-white overflow-hidden rounded-2xl shadow-xl">
          <div class="p-12">
            <p class="text-base font-medium leading-7 text-blue-600" aria-hidden="true">Deep liquidity</p>
            <h2 class="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl" aria-hidden="true">Hubs</h2>
            <p class="mt-6 text-lg leading-8 text-neutral-600">Nolus effortlessly taps into multiple liquidity hubs, bypassing the need to build its own. This enables instant asset lending or swapping on any connected DEX</p>
          </div>
          <div>
            <ul class="flex flex-wrap gap-px text-center bg-neutral-200/70 border-t">
                <li v-for="hub in hubs" :key="hub.id" class="bg-white flex-grow basis-48">
                  <a :href="hub.link" class="py-7 px-4 flex flex-col items-center hover:bg-neutral-100 transition-all">
                    <figure class="text-xs w-20 h-20 mx-auto mb-4 bg-white p-4 rounded-full shadow-inner shadow-sm shadow-neutral-200" aria-hidden="true">
                      <component :is="hub.image" :alt='`Logo of ${hub.shortName}`'></component>
                    </figure>
                    <h3 class="text-sm text-neutral-600 leading-3">{{ hub.shortName }}</h3>
                    <p class="text-lg leading-7 tracking-tight text-neutral-900">{{ hub.fullName }}</p>
                  </a>
                </li>
              </ul>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden pb-4">
          <div class="p-12">
            <p class="text-base font-medium leading-7 text-blue-600" aria-hidden="true">Deep liquidity</p>
            <h2 class="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl" aria-hidden="true">Audits</h2>
            <p class="mt-6 text-lg leading-8 text-neutral-600">Audited by the world’s leading security firms, security of the Nolus Protocol is the highest priority</p>
          </div>
          <div>
            <ul class="flex flex-col gap-px border-t border-neutral-200/50">
                <li v-for="audit in audits" :key="audit.id" class="border-b border-neutral-200/70">
                  <a :href="audit.url" class="bg-white px-12 py-4 hover:bg-neutral-100 flex justify-between items-center gap-x-4 transition-all">
                    <div class="flex items-center gap-x-4">
                      <span class="bg-green-400 w-10 rounded-full overflow-hidden"><img :src="audit.logoUrl" alt="" aria-hidden="true" /></span>
                      <p class="font-medium leading-5">
                        <span class="text-base block tracking-tight">{{ audit.name }}</span>
                        <span class="text-sm font-light">by <a href="https://www.oaksecurity.io/">{{ audit.auditor }}</a></span>
                      </p>
                    </div>
                    <component :is="ChevronRightIcon" class="w-4 h-4 fill-neutral-500" aria-hidden="true"></component>
                  </a>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </NolusContainer>
    
  </div>
</template>

<script setup>
// For Hubs widget
import NolusContainer from '@/components/NolusContainer.vue';
import osmosisImage from '../../assets/images/hubs/osmosis.svg';
import astroportImage from '../../assets/images/hubs/astroport.svg';
import nolusImage from '../../assets/images/hubs/nolus.svg';
import arbitrumImage from '../../assets/images/hubs/arbitrum.svg';
// For Audits widget
import Button from '../../components/Button.vue'
import { DocumentCheckIcon, CheckIcon } from '@heroicons/vue/20/solid';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';

const hubs = [
  {
    id: 1,
    shortName: 'Osmosis',
    fullName: 'Osmosis DEX',
    comingSoon: false,
    image: osmosisImage,
    link: 'https://osmosis.zone/'
  },
  {
    id: 2,
    shortName: 'Neutron',
    fullName: 'Astroport',
    comingSoon: false,
    image: astroportImage,
    link: 'https://astroport.finance/'
  }
]



const audits = [
  {
    id: 1,
    name: 'Clockchain audit',
    auditor: 'Oak Security',
    url: 'https://github.com/oak-security/audit-reports/blob/master/Nolus/2022-12-12%20Audit%20Report%20-%20Nolus%20Core%20v1.1.pdf',
    logoUrl: '/assets/images/auditors/oak_logo.jpeg'
  },
  {
    id: 2,
    name: 'Money market report',
    auditor: 'Oak Security',
    url: 'https://github.com/oak-security/audit-reports/blob/master/Nolus/2023-01-27%20Audit%20Report%20-%20Nolus%20Money%20Market%20v1.1.pdf',
    logoUrl: '/assets/images/auditors/oak_logo.jpeg'
  },
  {
    id: 3,
    name: 'Money market report',
    auditor: 'Halborn',
    url: 'https://github.com/HalbornSecurity/PublicReports/blob/master/CosmWasm%20Smart%20Contract%20Audits/Nolus_Money_Market_CosmWasm_Smart_Contract_Security_Assessment_Report_Halborn_Final.pdf',
    logoUrl: '/assets/images/auditors/halborn_logo.jpeg'
  },
  // {
  //   id: 1,
  //   name: 'Clockchain audit',
  //   auditor: 'Oak Security',
  //   url: 'https://github.com/oak-security/audit-reports/blob/master/Nolus/2022-12-12%20Audit%20Report%20-%20Nolus%20Core%20v1.1.pdf',
  //   scale: 90
  // },
  // {
  //   id: 2,
  //   name: 'Money market report',
  //   auditor: 'Oak Security',
  //   url: 'https://github.com/oak-security/audit-reports/blob/master/Nolus/2023-01-27%20Audit%20Report%20-%20Nolus%20Money%20Market%20v1.1.pdf',
  //   scale: 95
  // },
  // {
  //   id: 3,
  //   name: 'Money market report',
  //   auditor: 'Halborn',
  //   url: 'https://github.com/HalbornSecurity/PublicReports/blob/master/CosmWasm%20Smart%20Contract%20Audits/Nolus_Money_Market_CosmWasm_Smart_Contract_Security_Assessment_Report_Halborn_Final.pdf',
  //   scale: 100
  // },
]
</script>