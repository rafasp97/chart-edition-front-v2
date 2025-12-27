<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { rankService } from '../services/rankService';
import type { Artist } from '../interfaces/Artist';
import type { LastFmPeriod } from '../enums/EPeriodLastFm';
import Button from '../components/Button.vue';
import ButtonIcon from './ButtonIcon.vue';
import Session0 from './sessions/Session0.vue';
import Session1 from './sessions/Session1.vue';
import Session2 from './sessions/Session2.vue';
import Session3 from './sessions/Session3.vue';
import Session4 from './sessions/Session4.vue';

const isOpen = defineModel<boolean>('isOpen');
const session = ref(0);
const totalSessions = 4;

const rank = ref([] as Artist[]);

const getRankByCustomUsers = ref<InstanceType<typeof Session1> | null>(null);

const nextSession = () => {
  if (session.value === 1) {
    getRankByCustomUsers.value?.generateCharts();
  }
  else session.value++;
}

const prevSession = () => {
  if(session.value === 2){
    session.value = 0;
  }
  else if (session.value > 0) {
    session.value--;
  }
}

const closeModal = () => {
  isOpen.value = false
  setTimeout(() => {
    session.value = 0
  }, 300);
}

onMounted(() => {
  session.value = 4;
})

const getRank = async (customUsers?: string[], selectedPeriod?: LastFmPeriod) => {
  rank.value = [];
  rank.value = await rankService.getDATA(customUsers, selectedPeriod);
}


</script>

<template>
  <VDialog v-model="isOpen" max-width="900" height="650" rounded="lg">
    <div class="flex flex-col h-full">
      <div class="flex w-full justify-between mt-2 h-20 p-3 bg-[#11111b]">
        <ButtonIcon @action="prevSession" type="arrow-left"/>
        <ButtonIcon @action="closeModal"/>
      </div>
      <div class="bg-white h-full">
        <Session0 v-if="session === 0" @getRank="getRank" v-model:session="session"></Session0>
        <Session1 ref="getRankByCustomUsers" v-if="session === 1" @getRank="getRank" v-model:session="session"></Session1>
        <Session2 :rank="rank" v-if="session === 2" type="standard" ></Session2>
        <Session3 v-if="session === 3" type="standard" ></Session3>
        <Session4 v-if="session === 4" type="standard"></Session4>
      </div>
      <div class="flex gap-4 w-full justify-end items-center px-3 h-20 bg-[#11111b]">
        <Button @action="nextSession" name="PRÓXIMO" v-if="session > 0 && session < totalSessions"/>
        <VBtn class="w-[10em]" color="success" v-if="session == totalSessions" @click="closeModal">
          Gerar Charts
        </VBtn>
      </div>
    </div>
    <!-- <VCard v-if="session === 1">
      <VCardTitle class="text-h6">Sessão 2</VCardTitle>
      <VCardText>
        <p>Conteúdo do card 2. Pode colocar forms, textos, imagens, etc.</p>
        <VTextField label="Nome" v-model="name" />
        <VTextField label="Email" v-model="email" />
      </VCardText>
    </VCard>
    <VCard v-if="session === 2">
      <VCardTitle class="text-h6">Sessão 3</VCardTitle>
      <VCardText>
        <p>Conteúdo do card 3. Pode colocar forms, textos, imagens, etc.</p>
        <VTextField label="Nome" v-model="name" />
        <VTextField label="Email" v-model="email" />
      </VCardText>
    </VCard> -->
  </VDialog>
</template>
