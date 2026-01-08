<script setup lang="ts">
import type { Artist } from '../../interfaces/Artist';
import Loader from '../Loader.vue';

defineProps<{
    rank: Artist[];
}>();

const isLoading = defineModel<boolean>('isLoading');


</script>

<template>
    <div v-if="isLoading"
        class="flex flex-col gap-5 items-center justify-center h-full bg-[var(--dialog-black-bg)] text-white">
        <Loader />
        <span>Carregando...</span>
    </div>
    <VTable density="comfortable" class="h-full flextext-white" v-else ref="tableRef">
        <thead class="bg-[var(--dialog-black-bg)] text-white">
            <tr>
                <th class="text-center font-bold">RANK</th>
                <th class="text-center font-bold">ARTISTAS</th>
                <th class="text-center font-bold">PONTOS</th>
            </tr>
        </thead>
        <tbody class="h-full relative top-2">
            <tr v-for="(artist, index) in rank" :key="index">
                <td class="text-center">
                    <span v-if="index <= 2" class="flex items-center justify-center" :class="{'relative bottom-1': index === 0}">
                        <img :src="`/rank${index + 1}.png`" :class="index === 0 ? 'w-10' : 'w-8'" />
                    </span>
                    <span v-else class="font-bold">
                        {{ index + 1 }}°
                    </span>
                </td>
                <td class="text-center">{{ artist.name }}</td>
                <td class="text-center">{{ artist.playcount }}</td>
            </tr>
        </tbody>
    </VTable>
</template>