<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppNavbar from '@/components/layout/AppNavbar.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-sans">
    <AppNavbar />
    <main class="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <RouterView />
    </main>
  </div>
</template>
