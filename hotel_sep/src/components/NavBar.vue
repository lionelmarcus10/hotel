
<script setup lang="js">
import SessionButton from './SessionButton.vue';
import {   useUser } from 'vue-clerk'
import { ref, watch } from 'vue';
import Reserve from '@/views/Reserve.vue'
const { user, isLoaded, isSignedIn } = useUser()

let orgSlug = import.meta.env.VITE_CLERK_ADMIN_ORGANIZATION_SLUG
const isSlugInList = ref(false)

watch([user, isLoaded], () => {
  if (isLoaded.value) {
    const slugList = user.value.organizationMemberships.map(m => m.organization.slug);
    isSlugInList.value = slugList.includes(orgSlug);
  }
}, { immediate: true });

</script>
<template>
    
    <nav class="bg-white border-gray-200   rounded dark:bg-gray-900 container px-4 md:px-0 lg:px-24 xl:px-56">
    <div class="flex flex-wrap items-center justify-between mx-auto">
        <a href="https://flowbite.com/" class="flex items-center -mt-1">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </a>
        <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul class="flex flex-col items-center py-4 pl-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li class="py-2">
            <a href="/"  class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Acceuil</a>
            </li>
            <li class="py-2">
            <a href="/decouvrir"  class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Découvrir</a>
            </li>
            
            <li class="py-2">
            <a href="/services"  class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
            </li>
            <li class="py-2">
            <a href="/conferences"  class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Conférences</a>
            </li>
            <li>
            <a href="/chambres-disponible" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Réserver</a>
            </li>
            <li  v-if="isSignedIn && !isSlugInList" class="py-2">
              <Reserve>
              Mes chambres 
              </Reserve>
            </li>
            <li v-if="isSlugInList">
            <a href="/admin-dashboard" class="block py-2 pl-3 pr-4 text-black border-black border-2">Espace admin</a>
            </li>
            <li><SessionButton /></li>
        </ul>
        </div>
    </div>
    </nav>

</template>
