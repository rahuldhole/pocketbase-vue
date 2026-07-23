<script setup lang="ts">
import { inject } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { pocketBaseSymbol } from '@/types';

const userStore = useUserStore();
const $pb = inject(pocketBaseSymbol);
const router = useRouter();

const logoutUser = () => {
  userStore.clear();
  $pb?.authStore.clear();
  router.push({ path: '/' });
};
</script>

<template>
  <nav class="sticky top-0 z-10 border-b border-gray-100 bg-white/80 px-4 py-4 backdrop-blur-md">
    <div class="mx-auto flex max-w-5xl items-center justify-between">
      <div class="flex items-center">
        <span aria-current="page" class="text-xl font-extrabold tracking-tight text-gray-900">
          Pocketbase & Vue
        </span>
      </div>
      
      <div class="flex items-center gap-6 text-sm font-medium text-gray-600">
        <RouterLink to="/" class="hover:text-black transition-colors">Home</RouterLink>
        <RouterLink v-if="!$pb?.authStore.token" to="/auth" class="hover:text-black transition-colors">Login</RouterLink>
        <RouterLink v-if="$pb?.authStore.token" to="/new-post" class="hover:text-black transition-colors">New Post</RouterLink>
        <button v-if="$pb?.authStore.token" type="button" @click="logoutUser" class="cursor-pointer hover:text-black transition-colors">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>
