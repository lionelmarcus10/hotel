<script setup>
const proposed_services = [ "Restaurant étoilé", "Piscine chauffée", "Salle de sport", "Salle de conférence", "Concierge", "Wifi gratuit", "Balcons", "Room service", "Pressing", "Navettes", "Lits pour enfants" ]

</script>
<template>
    <div class="container px-4 md:px-0 lg:px-24 xl:px-56 space-y-5">
        <div class="grid grid-cols-6 gap-x-4">
            <div class="bg-black col-span-2 grid">
                <p class="text-white mx-4 mb-2 text-2xl m-2 self-end">SERVICES</p>
            </div>
            <img src="../assets/service_1.jpg" alt="" class="col-span-4">
        </div>
        <div class="flex flex-row justify-between space-x-5">
            <div class="outline w-[400px] p-3">
                <ul class="list-disc py-4 mx-6 space-y-4">
                    <li v-for="element in proposed_services" class="list-disc">{{ element }}</li>
                </ul>
            </div>
            <img src="../assets/service_2.jpg" class="max-h-[485px]">
        </div>
    </div>
    
</template>
<style scoped>
</style>