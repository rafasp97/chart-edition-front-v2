<script setup lang="ts">
import Card from '../Card.vue';

const session = defineModel<number>('session');
const emit = defineEmits<{(e: 'getCharts', group: string): void}>();

const selectModel = (model: 'default' | 'custom') => {
  if(model === 'default'){
    session.value = 2;
      emit('getCharts', 'edition'); //TODO: ADICIONAR MAIS GRUPOS QUANDO HOUVER
  }  else{
    session.value = 1;
  }
}

</script>

<template>
    <div class="flex flex-col md:flex-row h-full">
      <Card @click="selectModel('default')"
      color1="#ff3b3b" 
      color2="#361216" 
      title="Padrão" 
      subtitle="Charts semanais inspirado no grupo de amigos que deu origem ao Charts Editions."
      option="1">
      </Card>
      <Card @click="selectModel('custom')"
      color1="#12263f" 
      color2="#1e90ff" 
      title="Personalizado" 
      subtitle="Selecione seus amigos e defina o período de análise para gerar charts exclusivos."
      option="2">
      </Card>
    </div>
</template>