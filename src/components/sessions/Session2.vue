<script setup lang="ts">
import type { Artist } from '../../interfaces/Artist';
import Loader from '../Loader.vue';

defineProps<{
    rank: Artist[];
    type: string; 
}>();


</script>

<template>
    <VTable density="comfortable" class="h-full flextext-white" v-if="rank.length > 0" ref="tableRef">
        <thead class="bg-[var(--dialog-black)] text-white">
            <tr>
                <th></th>
                <th class="text-center font-bold">ARTISTAS</th>
                <th></th>
            </tr>
        </thead>
        <tbody class="h-full relative top-2">
            <tr v-for="(artist, index) in rank" :key="index">
                <td class="text-center">
                    <span v-if="index == 0" class="flex items-center justify-center relative bottom-1">  
                        <img :src="`/rank${index + 1}.png`" class="w-10" /> 
                        <div class="absolute left-12">
                            <img :src="`/status/up.png`" class="w-10" /> 
                            <span class="absolute top-4 left-1 font-bold text-[var(--status-purple)] drop-shadow-lg text-[1.5em]">9</span>
                        </div>
                    </span>
                    <span v-else-if="index <= 2" class="flex items-center justify-center">  
                        <img :src="`/rank${index + 1}.png`" class="w-8" /> 
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
    <div v-else class="flex flex-col gap-5 items-center justify-center h-full bg-[var(--dialog-black)] text-white">
        <Loader/>
        <span>Carregando...</span>
    </div>
</template>