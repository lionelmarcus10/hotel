<script setup>
import lightGallery from 'lightgallery';

import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'

lightGallery(document.querySelector('.gal_test')),{
    plugins: [lgZoom, lgThumbnail],
    liccense: "0000-0000-000-0000",
    speed: 500,
}

</script>
<template>
     <div class="container px-4 md:px-0 lg:px-24 xl:px-56 space-y-5">
        
        <div class="sm:grid sm:grid-cols-9 sm:gap-x-4 space-y-4 sm:space-y-0">
            <img src="../assets/decouvrir_1.jpg" alt="" class="sm:col-span-3 w-full h-full">
            <div class="bg-black sm:col-span-2 grid">
                <p class="text-white mx-4 mb-2 text-2xl m-2 self-end">HOTEL URBAIN <br> DE <br> LUXE</p>
            </div>
            <div class="sm:col-span-4 br-red-500 px-8 border-2 border-black flex flex-col justify-center space-y-4 py-4">
                    <p class="text-sm">
                        Paragraphe. Cliquez ici pour ajouter votre propre Texte ou double-cliquez ici pour ajoutez votre contenu et personnaliser les polices.
                    </p>
                    <p class="text-sm">
                        Présezntez votre entreprise. Vos services et vos équipes. Utilisez cet espace pour décrire votre activité. Présentez votre équipe et les services proposés.
                    </p>
            </div>
        </div>

        <div class="flex flex-col space-y-5">


            <div class="grid grid-cols-6 gal_test gap-x-5">
                <div class="col-span-4 flex flex-row space-x-5">
                    <div class="flex flex-col justify-between">
                        <img src="../assets/decouvrir_5.jpg" class="">
                        <img src="../assets/decouvrir_8.jpg" class="">
                    </div>
                    <div class="flex flex-col justify-between">
                        <img src="../assets/decouvrir_5.jpg" class="">
                        <img src="../assets/decouvrir_8.jpg" class="">
                    </div>
                </div>
                <img src="../assets/decouvrir_4.jpg" class="col-span-2 h-full">
            </div>

            <div class="grid grid-cols-6 gap-x-5">
                <img src="../assets/decouvrir_6.jpg" class="col-span-4 h-full">
                <div class="col-span-2 flex flex-col space-y-5">
                    <img src="../assets/decouvrir_9.jpg" class="">
                    <img src="../assets/decouvrir_10.jpg" class="">
                </div>
                
            </div>

        </div>

     </div>
</template>
<style scoped>
</style>