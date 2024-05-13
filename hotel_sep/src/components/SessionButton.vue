<script setup>
import { SignInButton, UserButton, useAuth } from 'vue-clerk'

const { isSignedIn } = useAuth()
</script>

<template>
    <UserButton v-if="isSignedIn" />
    <SignInButton mode="modal" v-else />
</template>
