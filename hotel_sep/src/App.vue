<script setup>
import { ref } from 'vue';
import Acceuil from './components/Acceuil.vue'
import Decouvrir from './components/Decouvrir.vue';
import NavBar from './components/NavBar.vue'
import Services from './components/Services.vue';
import Conference from './components/Conferences.vue';
import Footer from './components/Footer.vue';
import Chambre from './components/Chambres.vue';
function MoutComponent(option){
    console.log(option)
   
  }

</script>


<template>
  
  <NavBar @part-click="MoutComponent"/> 
  <Acceuil class=""/>
  <Decouvrir class="hidden"/>
  <Chambre class="hidden"/>
  <Services class="hidden"/>
  <Conference class="hidden"/>
  
  <Footer/>
  
</template>

<style scoped>
</style>
