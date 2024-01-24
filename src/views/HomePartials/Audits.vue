<template>
  <div class="bg-blue-800 relative overflow-hidden">
    <div class="mx-auto max-w-7xl py-32 px-6 lg:px-8 relative z-10">
      <div class="absolute -bottom-64 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div class="relative aspect-[1/1] w-[36.125rem] bg-gradient-to-r from-blue-500 to-blue-950 opacity-50" style="clip-path: circle(50%);"></div>
      </div>
      <div class="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div class="relative aspect-[1/1] w-[36.125rem] bg-gradient-to-r from-blue-800 to-blue-300 opacity-50" style="clip-path: circle(50%);"></div>
      </div>
      <div class="flex flex-row items-start gap-x-8">

        <div class="basis-1/2 gap-x-10 items-center justify-center">
          <img src="../../assets/verified.png" alt="" class="w-40 mb-8" aria-hidden="true" />
          <!-- <div class="temp h-56"></div> -->
          <div>
            <h2 class="mt-2 text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl">Audited &amp; Verified</h2>
            <p class="mt-6 text-lg leading-8 text-neutral-100">Audited by the world’s leading security firms, security of the Nolus Protocol is the highest priority</p>
          </div>
        </div>

        <ul class="basis-1/2 flex flex-col gap-y-5">
            <li v-for="audit in audits" :key="audit.id" class="flex justify-between items-center gap-x-4 px-6 py-6 bg-gradient-to-r from-neutral-100 to-blue-100 backdrop-blur-sm rounded-full shadow-[0_2px_0px_inset_rgba(255,255,255,1)] relative">
              <div class="flex items-center gap-x-4">
                <span class="bg-green-400 w-9 p-2 rounded-full"><CheckIcon class="w-full text-white" /></span>
                <span class="text-lg font-medium leading-5">
                  <span class="block">{{ audit.name }}</span>
                  <span class="text-sm font-light">by <a href="https://www.oaksecurity.io/">{{ audit.auditor }}</a></span>
                </span>
              </div>
              <Button size="md" variant="secondary" :icon="DocumentCheckIcon" :link="audit.url" target="_new" aria-label="View report">View report</Button>
            </li>
        </ul>
      </div>
    </div>
    <svg width="100%" height="100%" class="absolute bottom-0 right-0 fill-blue-400 [mask-image:radial-gradient(100%_100%_at_bottom_right,white,transparent)]" aria-hidden="true">
      <defs>
        <pattern id="dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle fill="white" cx="20" cy="20" r="2.5"></circle>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)"></rect>
    </svg>
  </div>
</template>

<script setup>
import Button from '../../components/Button.vue'
import { DocumentCheckIcon, CheckIcon } from '@heroicons/vue/20/solid';

const audits = [
  {
    id: 1,
    name: 'Clockchain audit',
    auditor: 'Oak Security',
    url: 'https://github.com/oak-security/audit-reports/blob/master/Nolus/2022-12-12%20Audit%20Report%20-%20Nolus%20Core%20v1.1.pdf',
    scale: 90
  },
  {
    id: 2,
    name: 'Money market report',
    auditor: 'Oak Security',
    url: 'https://github.com/oak-security/audit-reports/blob/master/Nolus/2023-01-27%20Audit%20Report%20-%20Nolus%20Money%20Market%20v1.1.pdf',
    scale: 95
  },
  {
    id: 3,
    name: 'Money market report',
    auditor: 'Halborn',
    url: 'https://github.com/HalbornSecurity/PublicReports/blob/master/CosmWasm%20Smart%20Contract%20Audits/Nolus_Money_Market_CosmWasm_Smart_Contract_Security_Assessment_Report_Halborn_Final.pdf',
    scale: 100
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