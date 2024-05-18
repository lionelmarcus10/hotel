<script setup lang="js">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { fetchUsersData } from '@/utils/users';
import { onMounted, ref, watchEffect } from 'vue';
import { useRoomStore } from '@/store/roomStore';
import UserDeleteBtn from "./UserDeleteBtn.vue"
import UserSheet from "./UserSheet.vue"
import { getAllRooms } from '@/utils/rooms';

const users = ref([])
const roomStore = useRoomStore()

onMounted(async () => {
  users.value = await fetchUsersData()
  let usersReservations = (await getAllRooms()).filter(room => room.reservedDet)
  
})
const filterUser = (userId) => {
  users.value = users.value.filter(user => user.userId !== userId)
}
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead class="">
          Utilisateur
        </TableHead>
        <TableHead class="text-left">Email</TableHead>
        <TableHead class="text-left w-[100px]">Tel</TableHead>
        <TableHead class="text-right  w-[100px]">
          Réservations en cours
        </TableHead>
        <TableHead class="text-right">
          Suppression
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="user in users" :key="user.userId">
        <TableCell class="font-medium">
          {{ user.name }}
        </TableCell>
        <TableCell class="text-left">{{ user.email }}</TableCell>
        <TableCell class="text-left">{{ user.phone }}</TableCell>
        <TableCell class="text-right">
          <UserSheet v-if="user" :user="user" :key="user.userId" />

        </TableCell>
        <TableCell class="text-right">
          <UserDeleteBtn  @delUser="(userId) => filterUser(userId)" :user="user" />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>