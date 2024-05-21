
  
<script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    endValue: {
      type: Number,
      required: true
    },
    money: {
      type: Boolean,
      default: false
    }
  });
    
  // Reactive Data
  const currentValue = ref(0);
  const money = ref(false);
  const animateValue = () => {
  const startTime = Date.now();
  const duration = 2000; // 2 secondes en millisecondes
  const endValue = props.endValue;
  
  const update = () => {
    const elapsedTime = Date.now() - startTime;
    const progress = Math.min(1, elapsedTime / duration);
    const animatedValue = Math.floor(progress * endValue);
    currentValue.value = animatedValue;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };
  
  update();
};
  
  // Lifecycle hook
  watch(() => {
    animateValue();
    money.value = props.money;
  });
</script>
  
<template>
    <p class="num whitespace-nowrap flex flex-nowrap">{{ currentValue }} <span v-if="money === true">$</span> </p>
</template>