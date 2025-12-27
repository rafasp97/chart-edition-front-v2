<script setup lang="ts">
import ColorInput from 'vue-color-input';
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import Ping from '../Ping.vue';

const color = defineModel({
  default: '#ed3235'
});

const container = ref<HTMLElement | null>(null);
const isFirstClick = ref(true);

onMounted(() => {
  gsap.fromTo(
    container.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
  )
})

const handleFirstClick = () => {
  console.log(isFirstClick.value);
  isFirstClick.value = false;
    console.log(isFirstClick.value);
}

</script>

<template>
  <div class="flex flex-col items-center pt-15 md:pt-10 gap-10 h-full bg-[var(--dialog-black)]"  @click="handleFirstClick">
    <div class="bg-blue-100 border-1 rounded-xl p-4 w-[80%] text-center border-blue-300 relative" ref="container" >
      <span class="text-[0.8em] md:text-[1em]">Escolha uma cor que melhor combine com o resultado do charts.</span>
    </div>
    <div class="flex flex-col items-center justify-center">
      <Ping class="absolute w-[10em] h-[10em] pointer-events-none" v-if="isFirstClick"/>
      <ColorInput 
        v-model="color" 
        disable-text-inputs 
        transition="my-cool-transition" 
        class="w-25 h-25 md:w-[10em] md:h-[10em] cursor-pointer"   
      />
    </div>
  </div>
</template>
