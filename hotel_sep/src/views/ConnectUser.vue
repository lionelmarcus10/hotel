<script setup lang="js">
import { SignIn } from 'vue-clerk'
</script>

<template >
  <div class="py-20">
    <div class="flex flex-col w-full h-full items-center justify-center">
      <SignIn path="/sign-in" redirect-url="/reservations" routing="path" sign-up-url="/sign-up"  fallback-redirect-url="/reservations" />
    </div>
  </div>
</template>