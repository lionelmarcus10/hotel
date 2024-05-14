<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Navigation, Autoplay } from "swiper";
  // Import Swiper styles
  import 'swiper/css';
  
  export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Autoplay],
    };
  },
};
</script>
<template>
    <div class=" h-[600px] 2xl:h-[800px]">
    <div  class="container px-4 md:px-0 lg:px-24 xl:px-56 sticky z-20">
        <div class="bg-[#fff]/[.60] space-y-4 pt-20 pb-6 px-6 w-64 absolute">
            <h4>Réservez votre séjour</h4>
            <div class="flex flex-col">
                <div class="flex flex-col">
                    
                    <label for="year">Arrivé</label>
                    <input type="date" id="year" name="year" class="px-5 py-2 w-52">
                    
                
                </div>
                <div class="flex flex-col">
                    
                    <label for="year">Départ</label>
                    <input type="date" id="depart" name="depart" class="px-5 py-2 w-52">
                    
                
                </div>
                <div class="flex flex-row justify-between pb-5">
                    <div class="flex flex-col">
                        <label for="year" class="">Adultes</label>
                        <input type="number" id="depart" name="depart" class="py-2 px-5 w-20" value="1">
                    </div>
                    <div class="flex flex-col">
                        <label for="year">Enfants</label>
                        <input type="number" id="depart" name="depart" class="py-2 px-5 w-20" value="0">
                    </div>
                </div>

                <input type="submit" value="Rechercher" class="bg-black text-white text-center py-1.5 w-52"/>

            </div>
        </div>
    </div>
    <swiper class="mySwiper z-10 absolute top-0"
    :loop="true"
    :speed="1500"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :modules="modules"
    
    >
      <swiper-slide><img src="../assets/Carrousel 1.webp"/></swiper-slide>
      <swiper-slide><img src="../assets/Carrousel 2.webp"/></swiper-slide>
      <swiper-slide><img src="../assets/Carrousel 3.webp"/></swiper-slide>
      
    </swiper>
    
    </div>
</template>
<style scoped> 
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>