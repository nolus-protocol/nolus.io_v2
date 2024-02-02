<template>
  <div class="bg-white">


    <main class="isolate">
      <!-- Hero section -->
      <div class="overflow-hidden relative isolate -z-10 bg-[#0D377F] pt-40 pb-32">
          <NolusContainer>
            <component :is="dots" class="absolute -right-[125px] -top-12 w-3/5" />
            <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div class="w-full max-w-xl lg:shrink-0 xl:max-w-3xl">
                <h1 class="text-5xl font-bold tracking-tight text-white leading-tight" v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="100">Governance</h1>
                <p class="basis-1/2 relative mt-6 text-lg leading-8 text-white sm:max-w-md lg:max-w-lg" v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="200">The Nolus Protocol is managed by a decentralized group of individuals who delegate their NLS tokens. This community suggests and votes on platform improvements. By allocating their NLS tokens to different validators, these delegators bolster the Nolus network's security. Validators play a crucial role in maintaining the network's integrity and protection.</p>
              </div>
            </div>
          </NolusContainer> 
      </div>        

      <NolusContainer>
        <div class="bg-white py-24">       
          <dl class="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
            <div v-for="stat in stats" :key="stat.id" class="flex max-w-xs flex-col gap-y-4">
              <dt class="text-base leading-7 text-neutral-600">{{ stat.description }}</dt>
              <dd class="order-first text-2xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>
      </NolusContainer>

      <!-- Team section -->
      <div class="bg-neutral-100 py-24">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div class="basis-2/5 shrink-0 mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">Recent Proposals</h2>
          </div>
          <div class="basis-3/5 shrink-0">
            <ProposalItem
              v-for="proposal in proposals"
              :key="proposal.proposal_id"
              :state="proposal"
              @vote="onVote"
              @read-more="onReadMore"
            />
          </div>
        </div>
      </div>
      
    </main>
  </div>
</template>

<script lang="ts" setup>
import NolusContainer from '@/components/NolusContainer.vue';
import dots from '@/assets/images/dots.svg';

const stats = [
  {description: "A subset of 50 validators from a total of 432 are actively engaged in maintaining the network's integrity", value: '50 Active Validators' },
  {description: 'Votes Delegated', value: '1,323 Delegators' },
  {description: 'Real yield interest returns on lent stablecoins', value: '3,2323 Voting Addresses' },
]
</script>