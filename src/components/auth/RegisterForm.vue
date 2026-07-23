<script setup lang="ts">
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { pocketBaseSymbol } from '@/types';

const $pb = inject(pocketBaseSymbol);
const userStore = useUserStore();
const router = useRouter();

const email = ref('');
const username = ref('');
const password = ref('');
const passwordConfirm = ref('');

const createUser = async () => {
  try {
    if (password.value !== passwordConfirm.value) {
      alert("Passwords do not match");
      return;
    }

    const user = await $pb?.collection('users').create({
      name: username.value,
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value
    });

    if (user) {
      // Auto-login after registration
      const userData = await $pb?.collection('users').authWithPassword(email.value, password.value);
      if (userData) {
        userStore.setFromRecord(userData.record);
        router.push({ path: '/' });
      }
    }
  } catch (error) {
    console.error('Registration error:', error);
  }
};
</script>

<template>
  <div class="mx-auto max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
    <h2 class="mb-6 text-center text-2xl font-bold tracking-tight text-gray-900">Create Account</h2>
    <form @submit.prevent="createUser" class="space-y-5">
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">Name</label>
        <input type="text" class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" v-model="username" required placeholder="John Doe" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">Email address</label>
        <input type="email" class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" v-model="email" required placeholder="you@example.com" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">Password</label>
        <input type="password" class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" v-model="password" required placeholder="••••••••" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">Confirm Password</label>
        <input type="password" class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" v-model="passwordConfirm" required placeholder="••••••••" />
      </div>
      <button
        type="submit"
        class="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      >
        Sign up
      </button>
    </form>
  </div>
</template>
