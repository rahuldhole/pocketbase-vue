<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';
</script>

<template>
  <div class="mx-auto max-w-5xl py-8">
    <div class="mb-12 text-center">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Welcome to Pocketbase & Vue</h1>
      <p class="mt-3 text-lg text-gray-500">Sign in to your account or register a new one to start posting.</p>
    </div>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
      <div>
        <LoginForm />
      </div>
      <div>
        <RegisterForm />
      </div>
    </div>
  </div>
</template>
