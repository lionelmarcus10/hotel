<script setup lang="js">
import { SignUp } from 'vue-clerk'
</script>

<template>
  <div class="py-20">
    <div class="flex flex-col w-full h-full items-center justify-center">
      <SignUp routing="path" path="/sign-up" sign-in-url="/sign-in" fallback-redirect-url="/dashboard" />
    </div>
  </div>
</template>