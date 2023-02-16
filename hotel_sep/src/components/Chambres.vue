<script setup>
import DisplayRoom from "./DisplayRoom.vue";
const Suits = [ "Suite Junior", "Chambre Standart","Chambre Supérieur"];
</script>
<template>
    <div class="container px-4 md:px-0 lg:px-24 xl:px-56 space-y-5">
        
        <div class="sm:grid sm:grid-cols-6 sm:gap-x-4">
            <div class="bg-black col-span-2 grid">
                <p class="text-white mx-4 mb-2 text-2xl m-2 self-end">CHAMBRES</p>
            </div>
            <img src="../assets/chambre_1.jpg" alt="" class="col-span-4">
        </div>
        <div class="px-8 space-y-4">
            
            <h4 class="text-xl">Nos Chambres</h4>
            
            <hr class="bg-gray-500 h-[3px]">
            
            <div class="">
                <form action="" class="space-y-5 sm:space-y-0 sm:grid sm:grid-cols-5 sm:gap-x-2">
                    <input type="date"  placeholder="Année" class="outline px-3">
                    <input type="date" name="departure" id="departure" value="Départ" placeholder="Départ" class="outline px-3">
                    <input type="number" placeholder="1 Adulte" class="outline px-3">
                    <input type="number" placeholder="0 Enfant" class="outline px-3">
                    <input type="submit" value="Rechercher" class="bg-black text-white py-2 px-3 mx-4 sm:mx-0">
                </form>
            </div>
            
            <hr class="bg-gray-500 h-[3px]">
        
            <div class=" flex flex-col sm:space-y-5 space-y-9 ">
                <DisplayRoom v-for="elements in Suits">{{ elements }}</DisplayRoom>
            </div>

            
        </div>

    </div>
</template>
<style scoped>

</style>