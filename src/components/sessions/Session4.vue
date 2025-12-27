<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import ChartMetric from '../ChartMetric.vue';


const container = ref<HTMLElement | null>(null);

onMounted(() => {
  gsap.fromTo(
    container.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
  )
})





</script>

<template>
  <div class="flex flex-col items-center pt-15 md:pt-10 gap-10 h-full bg-[var(--dialog-black)]">
    <div class="bg-blue-100 border-1 rounded-xl p-4 w-[80%] text-center border-blue-300 relative" ref="container" >
      <span class="text-[0.8em] md:text-[1em]">Selecione as métricas de interesse.</span>
    </div>
    <div class="flex flex-col items-center justify-center w-full text-white gap-3 md:gap-6">
      <ChartMetric
      title="O maestro da música"
      subtitle="Tá sempre no volume máximo. O seu impacto dita o charts."
      description="Representa o usuário que mais ouviu do charts"
      />
      <ChartMetric
      title="O criador de tendências"
      subtitle="Seus plays definem o que vira tendência entre os amigos."
      description="O usuário que mais ouviu o #1 do charts"
      />
      <ChartMetric
      title="O explorador sonoro"
      subtitle="Sempre trazendo novos nomes pro coletivo."
      description="O usuário que mais ouviu o #10 do charts"
      />
      <ChartMetric
      title="O ouvinte fantasma"
      subtitle="Diz que ama música, mas o histórico discorda."
      description="O usuário que menos ouviu do charts."
      />
    </div>
  </div>
</template>
