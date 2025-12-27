<script setup lang="ts">
    const emit = defineEmits<{(e: 'action'): void}>();

    defineProps<{name: string }>();

    const action = () => {
        emit('action');
    }
</script>

<template>
    <VBtn 
        @click="action" 
        color="white"
        class="cursor-pointer shadow-md w-[8em]"
    >
        {{ name }}
    </VBtn>
</template>