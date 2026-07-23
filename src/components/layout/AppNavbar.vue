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
  <nav class="sticky top-0 z-10 flex flex-wrap items-center justify-between bg-white py-3">
    <div class="relative flex w-full justify-between py-1 lg:static lg:block lg:w-auto lg:justify-start">
      <span aria-current="page" class="text-3xl font-extrabold">
        Pocketbase & Vue
      </span>
      <button type="button" class="lg:hidden">
        <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
          stroke="currentColor" class="h-8 w-8 fill-current text-black">
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
    <div class="hidden items-center text-xl font-medium lg:relative lg:flex lg:flex-grow">
      <ul class="ml-auto flex flex-row list-none">
        <li v-if="$pb?.authStore.token" class="pr-5">
          <RouterLink to="/feed" class="hover:underline">
            Feed
          </RouterLink>
        </li>
        <li v-if="$pb?.authStore.token" class="pr-5">
          <RouterLink to="/dashboard" class="hover:underline">
            Dashboard
          </RouterLink>
        </li>
        <li v-if="$pb?.authStore.token" class="pr-5">
          <button type="button" @click="logoutUser" class="cursor-pointer hover:underline">
            Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>
