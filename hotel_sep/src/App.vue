<script setup>
import Footer from './components/Footer.vue';
import NavBar from './components/NavBar.vue';
import { Toaster } from 'vue-sonner'
import { ShoppingCart } from 'lucide-vue-next';
import { watch, ref } from 'vue';
import { useUser } from 'vue-clerk'
import { useRoomStore } from '@/store/roomStore';
const { user, isLoaded, isSignedIn } = useUser()
const store = useRoomStore();
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
  <NavBar /> 
  <router-view></router-view>
  <Footer/>
  <Toaster richColors  position="bottom-right" />
  <div v-if="!isSlugInList" class="fixed bottom-32 shadow right-10 z-40 transition-transform active:scale-95 hover:shadow-md bg-white p-4 rounded-full text-3xl text-black">
    <ShoppingCart class="z-20" />
    <p class="text-xs absolute top-0 right-0 py-1 z-30 bg-gray-200 px-2 rounded-full">{{  store.getShippingRooms.length }}</p>
  </div>
</template>

<style scoped>
</style>
