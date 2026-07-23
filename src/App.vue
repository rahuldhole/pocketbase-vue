<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppNavbar from '@/components/layout/AppNavbar.vue';
</script>

<template>
  <div class="container mx-auto p-4">
    <AppNavbar />
    <RouterView />
  </div>
</template>
