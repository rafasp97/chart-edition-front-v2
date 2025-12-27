<script setup lang="ts">
import { ref } from 'vue';
import DefineChartsDialog from '../components/DefineChartsDialog.vue';
import Logo from '../components/Logo.vue';
import { Github } from 'lucide-vue-next';
import Button from '../components/Button.vue';

const isOpen = ref(false);

</script>

<template>
  <div class="overflow-hidden flex flex-col w-full h-full gap-8 items-center justify-center bg-[linear-gradient(120deg,_rgba(12,12,20,1)_8%,_rgba(15,15,26,1)_42%,_rgba(0,0,0,1)_70%)]">
    <div class="flex h-full flex-col items-center justify-center">
      <Logo />
      <Button @action="isOpen = true" name="INICIAR"/>
    </div>
    <div class="w-full h-20 flex items-center justify-center border-t-1 border-white text-white ">
      <a 
        href="https://github.com/rafasp97" 
        class="flex items-center gap-2 hover:text-blue-200 transition-colors"
      >
      <span class="font-light text-sm">rafasp97</span>
      <Github class="w-5 h-5" />
      </a>
    </div>
  </div>
  <DefineChartsDialog v-model:isOpen="isOpen"/>
</template>