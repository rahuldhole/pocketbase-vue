<script setup lang="ts">
import { inject, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { pocketBaseSymbol, type PostPayload } from '@/types';

const $pb = inject(pocketBaseSymbol);
const userStore = useUserStore();

const emit = defineEmits<{
  (e: 'newPostCreated'): void;
}>();

const title = ref('');
const content = ref('');

const createPost = async () => {
  try {
    const postPayload: PostPayload = {
      title: title.value,
      content: content.value,
      user: userStore.userID,
      userdata: userStore.userProfileID
    };

    const response = await $pb?.collection('posts').create(postPayload);
    if (response) {
      emit('newPostCreated');
      title.value = '';
      content.value = '';
    }
  } catch (error) {
    console.error('Error creating post:', error);
  }
};
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold">Create new post</h2>
    <form @submit.prevent="createPost">
      <div class="grid grid-cols-1 gap-6">
        <label class="block">
          <span>Title</span>
          <input type="text" class="mt-1 block w-full" v-model="title" required />
        </label>
        <label class="block">
          <span>Content</span>
          <textarea class="mt-1 block w-full" v-model="content" required></textarea>
        </label>
      </div>
      <button
        type="submit"
        class="mt-4 rounded border-2 border-black bg-black px-4 py-2 text-white hover:bg-white hover:text-black dark:hover:bg-main-dark-bg desktop-xl:text-2xl"
      >
        Submit
      </button>
    </form>
  </div>
</template>
