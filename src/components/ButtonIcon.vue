<script setup lang="ts">
    import { X, ArrowLeft } from 'lucide-vue-next';
    const emit = defineEmits<{(e: 'action'): void}>();

    defineProps<{type?: string }>();

    const action = () => {
        emit('action');
    }
</script>

<template>
    <VBtn icon color="white" variant="flat" class="cursor-pointer" @click="action" v-if="type == 'arrow-left'">
        <ArrowLeft /> 
    </VBtn> 
    <VBtn icon variant="flat" color="white" class="cursor-pointer" @click="action" v-else>
        <X />
    </VBtn>
</template>