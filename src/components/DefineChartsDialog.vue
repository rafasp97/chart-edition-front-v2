<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Artist } from '../interfaces/Artist';
import type { LastFmPeriod } from '../enums/EPeriodLastFm';
import Button from '../components/Button.vue';
import ButtonIcon from './ButtonIcon.vue';
import SelectChartType from './sessions/SelectChartType.vue';
import SelectCustomUsers from './sessions/SelectCustomUsers.vue';
import RankResult from './sessions/RankResult.vue';
import CustomizeChart from './sessions/CustomizeChart.vue';
import { ApiService } from '../services/apiService';

const isOpen = defineModel<boolean>('isOpen');
const isLoading = ref(false);
const session = ref(0);
const totalSessions = 3;

const rank = ref([] as Artist[]);
const charts = ref();
const color = ref();
const image = ref();

const getChartsByCustomUsers = ref<InstanceType<typeof SelectCustomUsers> | null>(null);

const nextSession = () => {
  if (session.value === 1) {
    getChartsByCustomUsers.value?.generateCharts();
  }
  else session.value++;
}

const prevSession = () => {
  if (session.value === 2) {
    session.value = 0;
  }
  else if (session.value > 0) {
    session.value--;
  }
}

const closeModal = () => {
  isOpen.value = false;
  setTimeout(() => {
    session.value = 0
  }, 100);
  charts.value = [];
  image.value = null;
}

onMounted(() => {
  session.value = 0;
})

const getCharts = async (group?: string | null, users?: string[], period?: LastFmPeriod) => {
  try {
    isLoading.value = true;
    charts.value = [];
    charts.value = await ApiService.getCharts(group, { users, period });
    rank.value = charts.value.rank;
  } finally {
    isLoading.value = false;
  }
}

const generateImage = async () => {
  try {
    isLoading.value = true;
    await ApiService.generateImage(image.value, { charts: JSON.stringify(charts.value), color: color.value });
  } finally {
    isLoading.value = false;
    closeModal();
  }
}



const showNextButton = computed(() => {
  return (
    session.value > 0 &&
    session.value < totalSessions &&
    (session.value !== 2 || rank.value.length > 0)
  )
})


</script>

<template>
  <VDialog v-model="isOpen" max-width="900" height="650" rounded="lg">
    <div class="flex flex-col h-full">
      <div class="flex w-full justify-between mt-2 h-20 p-3 bg-[var(--dialog-black)]">
        <ButtonIcon @action="prevSession" type="arrow-left" />
        <ButtonIcon @action="closeModal" />
      </div>
      <div class="bg-white h-full">
        <SelectChartType v-if="session === 0" @getCharts="getCharts" v-model:session="session"></SelectChartType>
        <SelectCustomUsers ref="getChartsByCustomUsers" v-if="session === 1" @getCharts="getCharts" v-model:session="session"></SelectCustomUsers>
        <RankResult :rank="rank" v-model:isLoading="isLoading" v-if="session === 2"></RankResult>
        <CustomizeChart v-if="session === 3" v-model:color="color" v-model:image="image" v-model:isLoading="isLoading"></CustomizeChart>
      </div>
      <div class="flex gap-4 w-full justify-end items-center px-3 h-20 bg-[var(--dialog-black)]">
        <Button @action="nextSession" name="PRÓXIMO" v-if="showNextButton" />
        <VBtn class="w-[10em]"  style="background-color: var(--generate-charts); color: white;" v-if="session == totalSessions" @click="generateImage"
          :disabled="!image || isLoading">
          Gerar Charts
        </VBtn>
      </div>
    </div>
  </VDialog>
</template>
