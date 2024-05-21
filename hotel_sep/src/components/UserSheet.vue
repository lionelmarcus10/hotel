<script setup lang="js">

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from "@/components/ui/button";

import { formatDate } from '@/utils/users';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
    reservations: {
        type: Object,
        required: true,
    }
});



</script>

<template>
  <Sheet>
    <SheetTrigger>
      <Button class="outline bg-white text-black hover:bg-white  py-2 px-4 rounded-lg transition-transform active:scale-95 flex w-full gap-x-4 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rows-4"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M21 7.5H3"/><path d="M21 12H3"/><path d="M21 16.5H3"/></svg>      
          <span>Prévisualiser</span>
    </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle class="text-3xl">{{  user.name }}</SheetTitle>
        <SheetDescription>
          Ceci est une prévisualisation de la fiche de :  <br/>
          {{ user.name }}, inscrit le {{ user.createdAt }}.
        </SheetDescription>
        <div class="overflow-y-scroll max-h-screen mb-5 pb-40 w-full flex flex-col invisible-scrollbar">
          
          <div class="pt-5">
            <h1 class="font-bold text-xl pb-2">Réservations prochaines</h1>
              <div v-if="reservations.future.length > 0" v-for="next in reservations.future">
                <div v-if="next.nextReservationDetails.length > 0" v-for="next_child in next.nextReservationDetails">
                    <Card class="transition-transform hover:scale-90 scale-95">
                      <CardHeader class="pb-2">
                          <CardTitle>
                          <div>
                            <span class="">Chambre {{ next.id }}: </span>
                            <span class="text-lg">{{ next.name }}</span>
                          </div>
                          </CardTitle>
                          
                          <CardDescription>{{ next_child.description}}</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <div class="flex flex-col">
                            <div class="flex flex-row justify-between">
                                  <p>Prix par jour</p>
                                  <p>{{ next_child.price }}$</p>
                              </div>
                              <div class="flex flex-row justify-between">
                                  <p>Nombre de jours</p>
                                  <p>{{ next_child.numberOfDays }}</p>
                              </div>
                              <div class="flex flex-row justify-between">
                                  <p>Prix total</p>
                                  <p>{{ next_child.price * next_child.numberOfDays }}$</p>
                              </div>
                          </div>
                      </CardContent>
                      <CardFooter class="flex flex-col w-full !px-7 gap-2 pb-4">
                       <p class="text-left"> Du {{ formatDate(new Date(next_child.reservationStartDate)) }} au  {{ formatDate(new Date(next_child.reservationEndDate)) }}</p>

                          <Button class="w-full">
                            <a target="_blank" href="/chambres-disponible">Voir la chambre</a>
                          </Button>
                      </CardFooter>
                  </Card>
                  </div>
                  
              </div>
              <div v-else>
                <p class="text-center pt-5">Aucune réservation à venir</p>
                </div>
          </div>
          
          <div class="pt-5">
            <h1 class="font-bold text-xl pb-2">Réservations termnié</h1>
              <div v-if="reservations.previous.length > 0" v-for="prev in reservations.previous">
              
                <div v-if="prev.previousReservationDetails.length > 0" v-for="prev_child in prev.previousReservationDetails">
                    <Card class="transition-transform  hover:scale-90 scale-95">
                      <CardHeader class="pb-2">
                          <CardTitle>
                          <div>
                            <span class="">Chambre {{ prev.id }}: </span>
                            <span class="text-lg">{{ prev.name }}</span>
                          </div>
                          </CardTitle>
                          
                          <CardDescription>
                            {{ prev_child.description}}
                          </CardDescription>
                      </CardHeader>
                      <CardContent>
                          <div class="flex flex-col">
                            <div class="flex flex-row justify-between">
                                  <p>Prix par jour</p>
                                  <p>{{ prev_child.price }}$</p>
                              </div>
                              <div class="flex flex-row justify-between">
                                  <p>Nombre de jours</p>
                                  <p>{{ prev_child.numberOfDays }}</p>
                              </div>
                              <div class="flex flex-row justify-between">
                                  <p>Prix total</p>
                                  <p>{{ prev_child.price * prev_child.numberOfDays }}$</p>
                              </div>
                          </div>
                      </CardContent>
                      <CardFooter class="flex flex-col w-full !px-7 gap-2 pb-4">
                       <p class="text-left"> Du {{ formatDate(new Date(prev_child.reservationStartDate)) }} au  {{ formatDate(new Date(prev_child.reservationEndDate)) }}</p>

                          <Button class="w-full">
                            <a target="_blank" href="/chambres-disponible">Voir la chambre</a>
                          </Button>
                      </CardFooter>
                  </Card>
                  </div>
                  
              </div>
              <div v-else>
                <p class="text-center pt-5">Aucune réservation passé</p>
                </div>
          </div>
        </div>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>