<script setup lang="js">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import IncrementalNumber from '@/components/IncrementalNumber.vue'
import { ref, onMounted } from 'vue'
import { getStats } from '@/utils/rooms';

const stats = ref({
  users: 0,
  rooms: 0,
  reservations: 0,
  pendingReservations: 0,
  finishedReservations: 0,
  income: 0,
})

onMounted(async () => {
  stats.value = await getStats()
})


</script>

<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card class="transition-transform hover:scale-105">
        <CardHeader>
          <CardTitle>Utilisateurs</CardTitle>
          <CardDescription>Ensemble des utilisateurs</CardDescription>
        </CardHeader>
        <CardContent>
          <IncrementalNumber class="text-7xl font-bold" :endValue="stats.users"/>
        </CardContent>
        
      </Card>
      <Card class="transition-transform hover:scale-105">
        <CardHeader>
          <CardTitle>Chambres</CardTitle>
          <CardDescription>Nombre total de chambres</CardDescription>
        </CardHeader>
        <CardContent>
          <IncrementalNumber class="text-7xl font-bold" :endValue="stats.rooms"/>
        </CardContent>
        
      </Card>
      <Card class="transition-transform hover:scale-105">
        <CardHeader>
          <CardTitle>Réservations</CardTitle>
          <CardDescription>Nombre total de réservations</CardDescription>
        </CardHeader>
        <CardContent>
          <IncrementalNumber class="text-7xl font-bold" :endValue="stats.reservations"/>
        </CardContent>
      </Card>
      <Card class="transition-transform hover:scale-105">
        <CardHeader>
          <CardTitle>Réservations en cours</CardTitle>
          <CardDescription>Nombre total de réservations en cours</CardDescription>
        </CardHeader>
        <CardContent>
          <IncrementalNumber class="text-7xl font-bold" :endValue="stats.pendingReservations"/>
        </CardContent>
      </Card>
      <Card class="transition-transform hover:scale-105">
        <CardHeader>
          <CardTitle>Réservations completé</CardTitle>
          <CardDescription>Ensemble des réservations terminés</CardDescription>
        </CardHeader>
        <CardContent>
          <IncrementalNumber class="text-7xl font-bold" :endValue="stats.finishedReservations"/>
        </CardContent>
      </Card>
      <Card class="transition-transform hover:scale-105">
        <CardHeader>
          <CardTitle>Bénéfice actuel</CardTitle>
          <CardDescription>Chiffre d'affaire</CardDescription>
        </CardHeader>
        <CardContent>
          <IncrementalNumber class="text-5xl flex justify-start items-center my-auto font-bold" :endValue="stats.income" :money="true"/>
        </CardContent>
      </Card>
  </div>
  <div class="">
  <!-- chart data : reservations historique , user creation date -->
    <p>Lio</p>
  </div>
</template>