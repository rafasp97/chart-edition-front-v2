<script setup lang="ts">
import ColorInput from 'vue-color-input';
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import Ping from '../Ping.vue';
import { ImageIcon } from 'lucide-vue-next';
import Loader from '../Loader.vue';

const color = defineModel<string>('color', { default: '#ed3235' })
const image = defineModel<File | null>('image');
const isLoading = defineModel<boolean>('isLoading');

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
  isFirstClick.value = false;
}

const rgbToHex = (rgbString: string) => {
  const match = rgbString.match(/\d+/g);
  if (!match || match.length < 3) return 'ed3235';
  const r = Number(match[0]) || 0;
  const g = Number(match[1]) || 0;
  const b = Number(match[2]) || 0;

  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `${toHex(r)}${toHex(g)}${toHex(b)}`;
};


const handleColorChange = (val: string) => {
  color.value = rgbToHex(val);
}


</script>

<template>
  <div v-if="isLoading"
      class="flex flex-col gap-5 items-center justify-center h-full bg-[var(--dialog-black)] text-white">
      <Loader />
      <span>Carregando...</span>
  </div>
  <div v-else class="flex flex-col items-center pt-4 h-full" @click="handleFirstClick">
    <div class="bg-blue-100 border-1 rounded-xl p-4 w-[95%] text-center border-blue-300 relative" ref="container">
      <span class="text-[0.9em] md:text-[1em]">Escolha uma cor e uma imagem que melhor combine com o resultado.</span>
    </div>
    <div class="flex flex-col items-center justify-center w-full h-full gap-15">
      <div class="flex flex-col items-center justify-center">
        <Ping class="absolute w-[10em] h-[10em] pointer-events-none" v-if="isFirstClick" />
        <ColorInput v-model="color" @update:modelValue="handleColorChange" disable-text-inputs
          transition="my-cool-transition" class="w-25 h-25 md:w-[10em] md:h-[10em] cursor-pointer" />
      </div>
      <div class="flex flex-col items-center justify-center w-full">
        <VFileInput v-model="image" accept="image/*" label="Selecione uma imagem" variant="outlined"
          class="w-full relative right-5">
          <template #prepend-inner>
            <ImageIcon class="w-6 h-6 text-gray-500" />
          </template>
        </VFileInput>
      </div>
    </div>
  </div>
</template>
