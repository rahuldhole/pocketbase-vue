<script setup lang="ts">
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { pocketBaseSymbol } from '@/types';

const $pb = inject(pocketBaseSymbol);
const userStore = useUserStore();
const router = useRouter();

const email = ref('');
const password = ref('');

const authUser = async () => {
  try {
    const userData = await $pb?.collection('users').authWithPassword(email.value, password.value);

    if (userData) {
      userStore.setFromRecord(userData.record);
      router.push({ path: '/' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
  }
};
</script>

<template>
  <div class="mx-auto max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
    <h2 class="mb-6 text-center text-2xl font-bold tracking-tight text-gray-900">Welcome Back</h2>
    <form @submit.prevent="authUser" class="space-y-5">
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">Email address</label>
        <input type="email" class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" v-model="email" required placeholder="you@example.com" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">Password</label>
        <input type="password" class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" v-model="password" required placeholder="••••••••" />
      </div>
      <button
        type="submit"
        class="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      >
        Sign in
      </button>
    </form>
  </div>
</template>
