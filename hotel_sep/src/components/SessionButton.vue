<script setup>
import { SignInButton, UserButton, useAuth, SignUpButton } from 'vue-clerk'
const { isSignedIn } = useAuth()
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'



</script>

<template>
    <UserButton v-if="isSignedIn" />
    <DropdownMenu v-else>
    <DropdownMenuTrigger class="block border-2 border-black px-7 py-2">Compte</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>
        <SignUpButton mode="redirect" v-slot="{ handler }">
        <button @click="handler">
            S'inscrire
        </button>
    </SignUpButton>
      </DropdownMenuItem>
      <DropdownMenuSeparator />

      <DropdownMenuItem>
        <SignInButton mode="modal"  v-slot="{ handler }">
        <button @click="handler">
            Se connecter
        </button>
    </SignInButton>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
    
   
</template>
