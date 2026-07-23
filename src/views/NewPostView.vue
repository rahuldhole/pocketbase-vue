<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import PostForm from '@/components/posts/PostForm.vue';
import PostCard from '@/components/posts/PostCard.vue';
import { useUserStore } from '@/stores/user';
import { pocketBaseSymbol, type Post } from '@/types';

const $pb = inject(pocketBaseSymbol);
const userStore = useUserStore();

const posts = ref<Post[]>([]);

const getOwnedPostList = async () => {
  try {
    const userId = userStore.userID || $pb?.authStore.record?.id;
    if (!userId) {
      posts.value = [];
      return;
    }
    const list = await $pb?.collection('posts').getFullList<Post>({
      filter: `user = "${userId}"`,
      expand: 'user',
      sort: '-created'
    });
    if (list) {
      posts.value = list;
    }
  } catch (error) {
    console.error('Error fetching owned posts:', error);
  }
};

onMounted(() => {
  getOwnedPostList();
});
</script>

<template>
  <div class="py-8">
    <div class="mb-8 flex items-center justify-between border-b border-gray-200 pb-5">
      <h1 class="text-2xl font-bold tracking-tight text-gray-900">New Post</h1>
    </div>
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div class="lg:col-span-5 lg:col-start-8">
        <div class="sticky top-24">
          <PostForm @new-post-created="getOwnedPostList" />
        </div>
      </div>
      <div class="lg:col-span-7 lg:col-start-1 lg:row-start-1">
        <h2 class="mb-6 text-xl font-semibold text-gray-900">My Posts</h2>
        <div class="space-y-6" v-if="posts.length">
          <div v-for="post in posts" :key="post.id">
            <PostCard :post-data="post" />
          </div>
        </div>
        <div v-else class="rounded-xl border border-gray-100 bg-white p-12 text-center shadow-sm">
          <p class="text-gray-500">You haven't created any posts yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>
