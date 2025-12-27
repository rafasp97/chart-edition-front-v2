<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import gsap from 'gsap';

const numCols = 5;
const maxBlocks = 10;
const columns = Array.from({ length: numCols }, (_, i) => i);
const colors = ['#9b30ff', '#ff3b3b', '#1e90ff', '#32cd32', '#ff8c00'];

const columnRanges = [
    [2, 7], 
    [2, 8],
    [2, 9],
    [2, 6],
    [2, 10],
];

const initializeTitle = () => {
  const h3 = document.querySelectorAll('h3');
  h3.forEach((el) => {
    gsap.fromTo(el, 
      { opacity: 0, x: 50 }, 
      { opacity: 1, x: 0, duration: 2, ease: 'power2.out' }
    );
  });

  const h1 = document.querySelectorAll('h1');
  h1.forEach((el) => {
    gsap.fromTo(el, 
      { opacity: 0, y: -50 }, 
      { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }
    );
  });
};

onMounted(async () => {
  initializeTitle();
  await nextTick();

  columns.forEach((colIndex) => {
    const divs = Array.from(document.querySelectorAll(`.col-${colIndex} > div`));
    const [start, end] = columnRanges[colIndex]!;

    const targetDivs = divs.slice(start, end! + 1);

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    targetDivs.forEach((div, i) => {
      tl.to(div, { opacity: 1, duration: 0.5 }, i * 0.1);
    });

    targetDivs.slice().reverse().forEach((div, i) => {
      tl.to(div, { opacity: 0, duration: 0.5 }, targetDivs.length * 0.1 + i * 0.1);
    });
  });
});
</script>

<template>
  <div class=" w-70 md:w-110 flex flex-col justify-center items-center p-4">   
    <div class="text-white relative z-10 flex w-full">
      <h1 class="text-[7em] absolute top-40 md:top-30 w-full flex justify-center">
        <img src="/charts.png" alt="Logo Text" class="w-90"/>
      </h1>
      <h3 class="text-[2em] absolute top-60 md:top-57 w-full flex justify-end md:pr-5">
        <img src="/edition.png" alt="Logo Text" class="w-40"/>
      </h3>
    </div>
    <div class="relative z-5 grid grid-cols-5 gap-3 w-full h-full rotate-180">
      <div 
        v-for="colIndex in columns" 
        :key="colIndex" 
        :class="['flex flex-col h-full justify-end gap-2', `col-${colIndex}`]"
      >
        <div 
          v-for="block in maxBlocks" 
          :key="block" 
          class="h-7 rounded-sm"
          :style="{ backgroundColor: colors[colIndex], opacity: 0 }"
        ></div>
      </div>
    </div>
    <div class="grid grid-cols-5 gap-3 w-full h-full rotate-180 relative bottom-16">
      <div 
        v-for="colIndex in columns" 
        :key="colIndex" 
        :class="['flex flex-col h-full justify-end gap-2']"
      >
        <div 
          v-for="block in 2" 
          :key="block" 
          class="h-7 rounded-s"
        :style="{ backgroundColor: colors[colIndex]}"
        ></div>
      </div>
    </div>
  </div>
</template>
