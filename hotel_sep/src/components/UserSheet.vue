<script setup lang="js">

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {  ref, onMounted} from 'vue';
import { getUserReservedRooms } from '@/utils/users';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  }
});

let userReservedRooms = ref([]);

onMounted(async () => {
  userReservedRooms.value = await getUserReservedRooms(props.user.id);
  
});
</script>

<template>
  <Sheet>
    <SheetTrigger>
      <Button class="outline py-2 px-4 rounded-lg transition-transform active:scale-95 flex w-full gap-x-4 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rows-4"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M21 7.5H3"/><path d="M21 12H3"/><path d="M21 16.5H3"/></svg>      
          <span>Prévisualiser</span>
    </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{{  user.name }}</SheetTitle>
        <SheetDescription>
          Ceci est une prévisualisation de la fiche de :  <br/>
          {{ user.name }}, inscrit le {{ user.createdAt }}.
        </SheetDescription>
        <div class="overflow-y-scroll max-h-screen mb-5 pb-40 w-full flex flex-col invisible-scrollbar">
          <div class="">
          <!-- Display infos of room that will be modifiable -->
          </div>
        </div>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>