<script setup lang="ts">
import { ref } from "vue";
import { LastFmPeriod, LastFmPeriodTransaled } from "../../enums/EPeriodLastFm";
import { Trash2 } from "lucide-vue-next";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const session = defineModel<number>("session");
const emit = defineEmits<{
  (e: "getRank", customUsers: string[], selectedPeriod: LastFmPeriod): void;
}>();

const customUsers = ref<string[]>([""]);

const addUser = () => {
  customUsers.value.push("");
};

const generateCharts = () => {
  customUsers.value = customUsers.value.filter((user) => user.trim() !== "");
  if (customUsers.value.length === 0) {
    customUsers.value.push("");
    toast.error('Adicione um usuário...');
    return;
  }
  session.value = 2;
  emit("getRank", customUsers.value, selectedPeriod.value);
};

const removeUser = (index: number) => {
  if (customUsers.value.length > 1) {
    customUsers.value.splice(index, 1);
  }
};

const selectedPeriod = ref<LastFmPeriod>(LastFmPeriod.SevenDays);

const periodOptions = Object.values(LastFmPeriod).map((period) => ({
  label: LastFmPeriodTransaled[period],
  value: period,
}));

defineExpose({
  generateCharts,
});
</script>

<template>
  <div class="flex flex-col gap-1 p-4 h-full">
    <VSelect
      v-model="selectedPeriod"
      :items="periodOptions"
      label="Defina o período"
      item-title="label"
      item-value="value"
      density="comfortable"
      variant="solo-filled"
      class="max-h-15 mt-4"
    />
    <div class="flex justify-end items-end mt-1 mb-2">
      <VBtn class="w-[10em]" color="white" @click="addUser">Adicionar</VBtn>
    </div>
    <div class="bg-white  border border-gray-200 rounded-lg py-3 pl-3 overflow-auto max-h-95">
        <VCard
          variant="flat"
          class="grid md:gap-4 w-full grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] py-2"
        >
          <VTextField
            v-for="(_, index) in customUsers"
            :key="index"
            variant="outlined"
            v-model="customUsers[index]"
            :label="`Usuário ${index + 1}`"
            placeholder="Digite o nome do usuário"
            density="compact"
          >
            <template #append>
              <VBtn variant="flat" color="white" class="relative right-2 border" @click="removeUser(index)" size="40">  <Trash2 :size="20" color="red" /></VBtn>
            </template>
          </VTextField>
        </VCard>
    </div>
  </div>
</template>
