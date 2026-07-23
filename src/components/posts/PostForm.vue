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
const file = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];
  }
};

const createPost = async () => {
  try {
    const postPayload: PostPayload = {
      title: title.value,
      content: content.value,
      user: userStore.userID,
      userdata: userStore.userProfileID
    };
    
    if (file.value) {
      postPayload.file = file.value;
    }

    const response = await $pb?.collection('posts').create(postPayload);
    if (response) {
      emit('newPostCreated');
      title.value = '';
      content.value = '';
      file.value = null;
      if (fileInput.value) {
        fileInput.value.value = '';
      }
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
        <label class="block">
          <span>File (Image, etc.)</span>
          <input type="file" ref="fileInput" @change="handleFileChange" class="mt-1 block w-full" />
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
