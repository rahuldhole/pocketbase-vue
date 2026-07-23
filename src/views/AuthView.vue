<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';
</script>

<template>
  <div>
    <h1 class="mb-12 text-2xl font-bold">Welcome</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <LoginForm />
      </div>
      <div>
        <RegisterForm />
      </div>
    </div>
  </div>
</template>
