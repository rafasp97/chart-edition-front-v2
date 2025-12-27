<script setup lang="ts">
import Checkbox from './Checkbox.vue';
defineProps<{
    title: string; 
    subtitle: string;
    description: string;
}>();

const emit = defineEmits<{(e: 'isChecked'): void}>();

const issueCheck = () => {
    emit('isChecked');
}

</script>

<template>
    <VCard color="dialog-black" class="flex items-start w-full justify-between px-3 md:px-7">
        <div class="flex items-start gap-5">
            <Checkbox @click="issueCheck"/>
            <div>
                <h1 class="text-[0.9em] md:text-[1.3em]">{{ title }}</h1>
                <span class="text-[0.7em] md:text-[0.9em]">{{ subtitle }}</span>
            </div>
        </div>
        <VTooltip :text="description" color="white">
            <template v-slot:activator="{ props }">
                <img v-bind="props" :src="`icons/${title}.png`" class="w-15 md:w-17"/>
            </template>
        </VTooltip>
    </VCard>
</template>