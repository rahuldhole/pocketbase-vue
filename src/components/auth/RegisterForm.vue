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

const validateInput = () => {
  return password.value === passwordConfirm.value;
};

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

const createUser = async () => {
  try {
    if (!validateInput()) {
      alert("Passwords do not match");
      return;
    }

    const user = await $pb?.collection('users').create({
      username: username.value,
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value
    });

    if (user) {
      await authUser();
    } else {
      console.error('Failed to create user');
    }
  } catch (error) {
    console.error('Registration error:', error);
  }
};
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold">Register</h2>
    <form @submit.prevent="createUser">
      <div class="grid grid-cols-1 gap-6">
        <label class="block">
          <span>Username</span>
          <input type="text" class="mt-1 block w-full" v-model="username" required />
        </label>
        <label class="block">
          <span>Email</span>
          <input type="email" class="mt-1 block w-full" v-model="email" required />
        </label>
        <label class="block">
          <span>Password</span>
          <input type="password" class="mt-1 block w-full" v-model="password" required />
        </label>
        <label class="block">
          <span>Repeat Password</span>
          <input type="password" class="mt-1 block w-full" v-model="passwordConfirm" required />
        </label>
      </div>
      <button
        type="submit"
        class="mt-4 rounded border-2 border-black bg-black px-4 py-2 text-white hover:bg-white hover:text-black dark:hover:bg-main-dark-bg desktop-xl:text-2xl"
      >
        Sign Up
      </button>
    </form>
  </div>
</template>
