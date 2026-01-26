<template>
  <div class="relative overflow-hidden bg-blue-800">
    <div class="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8">
      <div class="flex flex-row items-start gap-x-8">
        <div class="basis-1/2 items-center justify-center gap-x-10">
          <div class="temp h-56"></div>
          <div>
            <h2 class="mt-2 text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl">Audited &amp; Verified</h2>
            <p class="mt-6 text-lg leading-8 text-neutral-100">
              Best security practices and rigorous auditing by leading security experts in the industry
            </p>
          </div>
        </div>

        <ul class="flex basis-1/2 flex-col gap-y-5">
          <li
            v-for="audit in audits"
            :key="audit.id"
            class="relative flex items-center justify-between gap-x-4 rounded-full bg-gradient-to-r from-neutral-100 to-blue-100 px-6 py-6 shadow-[0_2px_0px_inset_rgba(255,255,255,1)] backdrop-blur-sm"
          >
            <div class="flex items-center gap-x-4">
              <span class="w-9 rounded-full bg-green-400 p-2"><CheckIcon class="w-full text-white" /></span>
              <span class="text-lg font-medium leading-5">
                <span class="block">{{ audit.name }}</span>
                <span class="text-sm font-light"> by {{ audit.auditor }}</span>
              </span>
            </div>
            <Button
              size="md"
              variant="secondary"
              :icon="DocumentCheckIcon"
              :link="audit.url"
              target="_new"
              aria-label="View report"
            >
              View report
            </Button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "../../components/Button.vue";
import { DocumentCheckIcon, CheckIcon } from "@heroicons/vue/20/solid";

const audits = [
  {
    id: 1,
    name: "Nolus Core Audit",
    auditor: "Oak Security",
    url: "https://github.com/oak-security/audit-reports/blob/master/Nolus/2022-12-12%20Audit%20Report%20-%20Nolus%20Core%20v1.1.pdf",
    scale: 90
  },
  {
    id: 2,
    name: "Nolus Money Market",
    auditor: "Oak Security",
    url: "https://github.com/oak-security/audit-reports/blob/master/Nolus/2023-01-27%20Audit%20Report%20-%20Nolus%20Money%20Market%20v1.1.pdf",
    scale: 95
  },
  {
    id: 3,
    name: "Nolus Money Market",
    auditor: "Halborn",
    url: "https://github.com/HalbornSecurity/PublicReports/blob/master/CosmWasm%20Smart%20Contract%20Audits/Nolus_Money_Market_CosmWasm_Smart_Contract_Security_Assessment_Report_Halborn_Final.pdf",
    scale: 100
  }
];
</script>
