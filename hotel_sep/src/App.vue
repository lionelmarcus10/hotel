<script setup>
import Footer from './components/Footer.vue';
import NavBar from './components/NavBar.vue';
import { Toaster } from 'vue-sonner'

</script>


<template>
  <NavBar /> 
  <router-view></router-view>
  <Footer/>
  <Toaster richColors  position="bottom-right" />

</template>

<style scoped>
</style>
