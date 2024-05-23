<script setup>
import {  useUser, OrganizationSwitcher, Protect  } from 'vue-clerk'
import { ref, watch } from 'vue';
import  Users  from '@/components/Users.vue'
import AdminActionAndStats  from '@/components/AdminActionAndStats.vue'
const { user, isLoaded } = useUser()

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
   <Protect  v-if="isSlugInList" > 
     <div class="container px-4 md:px-5 lg:px-24 xl:px-56 space-y-5">
      <div class="flex flex-col justify-center items-stretch pt-10">
        <OrganizationSwitcher 
         defaultOpen="true" afterSwitchOrganizationUrl="/admin-dashboard" 
          afterLeaveOrganizationUrl="/" organizationProfileMode="modal"
           appearance="undefined" createOrganizationUrl="/admin-dashboard"
            organizationProfileUrl="/admin-dashboard" class="pt-5" />
      </div>
      <div class="">
        <h1 class="text-left font-medium py-5 text-4xl">Statistiques</h1>
      <div class="">
      <AdminActionAndStats/>
      <!-- input pour creer n chambres -->
      <!-- input pour creer n utilisateurs -->
      <!-- seed chambres based on users -->
      <!-- supprimer tous les users -->
      <!-- supprimer tous les chambres -->
      </div>
      </div>
      <div class="">
        <h1 class="text-left font-medium py-5 text-4xl">Liste des utilisateurs</h1>
        <div class="shadow border rounded-xl">
          <Users/>
        </div>
      </div>
       </div>
   </Protect>
</template> 