<script setup>


</script>

<template>
    <div  class="shadow-xl sm:shadow-none flex flex-col pb-6 sm:pb-0 sm:grid sm:grid-cols-8 sm:gap-x-6  space-y-3">
        <img src='../assets/chambre_3.jpg' class="sm:col-span-2 h-full">
        <div class="flex flex-col space-y-5 sm:space-y-0 sm:col-span-6 sm:grid sm:grid-cols-7 sm:gap-x-8">
            <div class="sm:col-span-5 flex flex-col space-y-5 sm:space-y-3 text-sm  px-12 my-5 sm:px-0 sm:my-0">
                <h4 class="font-bold text-2xl  sm:text-lg"><slot>Suite Name</slot></h4>
                <p>Notre chambre Standart associe confort et modernité dans un cadre chaleureux</p>
                <ul class="line-disc">
                    <li>Taille 280 ftz</li>
                    <li>Uts 1 Uts King Size</li>
                </ul>
    
                <div class="flex flex-col">
                    <hr class="bg-gray-500 h-[1px] ">
                    <div class="flex flex-row flex-nowrap justify-center sm:justify-start">
                        <img src="../assets/logo tripadvisor.webp" class="p-2">
                        <img src="../assets/logo instagram.webp" class="p-2">
                        <img src="../assets/logo facebook.webp" class="p-2">
                        <img src="../assets/logo tripadvisor.webp" class="p-2">
                        <img src="../assets/logo instagram.webp" class="p-2">
                        <img src="../assets/logo facebook.webp" class="p-2">
                    </div>
                </div>

            </div>
            <div class="sm:col-span-2 sm:self-center">
                <p class="text-[11px] text-center">A partir de </p>
                <p class=" sm:text-3xl text-center pb-6">250$</p>
                <p class="text-white bg-black text-center px-3 py-2 w-1/2 sm:w-auto mx-auto sm:mx-0">Plus d'info</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>