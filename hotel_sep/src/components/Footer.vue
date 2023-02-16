<script setup>

</script>
<style scoped>
</style>
<template>
    <div class="container px-4 md:px-0 lg:px-24 xl:px-56 pt-8 pb-16 ">
        <hr class="bg-black h-[3px]">
        <div class="flex flex-row flex-wrap flex-reverse justify-between pt-6">
            <div class="flex flex-col space-y-7 pb-3">
                <div class="">
                    <p>15. rue du château <br/>
                    75010 Paris. France | <span class="font-bold">01 23 45 67 89</span></p>
                </div>
                <div class="flex flex-row flex-nowrap space-x-4">
                    <div class="flex flex-row flex-nowrap space-x-2">
                        <img src="../assets/logo twitter.webp" class="py-2">
                        <img src="../assets/logo tripadvisor.webp" class="py-2">
                        <img src="../assets/logo facebook.webp" class="py-2">
                        <img src="../assets/logo instagram.webp" class="py-2">
                    </div>
                    <div class="flex flex-row space-x-4">
                        <p class="text-3xl font-bold">|</p>
                        <p class="text-white bg-black py-2 text-center w-36">Nous contacter</p>
                    </div>
                </div>
                <div class="">
                    <p>Mentions légales<br>Politique en matière de cookies<br>Politique de confidentialité<br>Conditions d'utilisation</p>
                </div>    
            </div>

            <div class="space-y-4">
                <h4 class="font-bold"> Inscrivez-vous à notre liste de diffusion</h4>
                <form action="" class="px-2 flex flex-col w-72 space-y-3">
                    <input type="text" class="px-3 py-2 text-sm outline w-72" name="diffusion" id="diffusion" placeholder="Saisissez votre addresse e-mail">
                    <input type="submit" value="Rejoindre" class="bg-black text-white py-2 px-3 w-72">
                </form>
            </div>
        </div>
    </div>
    
</template>