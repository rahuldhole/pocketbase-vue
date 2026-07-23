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
      userStore.userID = userData.record.id;
      userStore.username = userData.record.profile?.username || '';
      userStore.userProfileID = userData.record.profile?.id || '';
      router.push({ path: '/' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
  }
};
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold">Login</h2>
    <form @submit.prevent="authUser">
      <div class="grid grid-cols-1 gap-6">
        <label class="block">
          <span>Email</span>
          <input type="email" class="mt-1 block w-full" v-model="email" required />
        </label>
        <label class="block">
          <span>Password</span>
          <input type="password" class="mt-1 block w-full" v-model="password" required />
        </label>
      </div>
      <button
        type="submit"
        class="mt-4 rounded border-2 border-black bg-black px-4 py-2 text-white hover:bg-white hover:text-black dark:hover:bg-main-dark-bg desktop-xl:text-2xl"
      >
        Login
      </button>
    </form>
  </div>
</template>
