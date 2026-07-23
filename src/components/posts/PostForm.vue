<script setup lang="ts">
import { inject, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { pocketBaseSymbol } from '@/types';

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
    const currentUserId = userStore.userID || $pb?.authStore.record?.id || '';

    const postPayload: Record<string, any> = {
      title: title.value,
      content: content.value,
    };

    // Link post to user via the 'user' field
    if (currentUserId) {
      postPayload.user = currentUserId;
    }

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
  <div class="mx-auto max-w-2xl rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
    <h2 class="mb-6 text-2xl font-bold tracking-tight text-gray-900">Create new post</h2>
    <form @submit.prevent="createPost" class="space-y-6">
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-700">Title</label>
        <input type="text" class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" v-model="title" required placeholder="What's on your mind?" />
      </div>
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-700">Content</label>
        <textarea rows="4" class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" v-model="content" required placeholder="Write your post here..."></textarea>
      </div>
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-700">Attachment (Optional)</label>
        <input type="file" ref="fileInput" @change="handleFileChange" class="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-gray-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-100" />
      </div>
      <button
        type="submit"
        class="w-full rounded-lg bg-black px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
      >
        Publish Post
      </button>
    </form>
  </div>
</template>
