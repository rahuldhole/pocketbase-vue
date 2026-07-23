<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from 'vue';
import PostCard from '@/components/posts/PostCard.vue';
import { pocketBaseSymbol, type Post } from '@/types';

const $pb = inject(pocketBaseSymbol);
const posts = ref<Post[]>([]);

const getPostList = async () => {
  try {
    const list = await $pb?.collection('posts').getFullList<Post>({
      expand: 'user'
    });
    if (list) {
      posts.value = list;
    }
  } catch (error) {
    console.error('Error fetching post feed:', error);
  }
};

const subscribeToAllPosts = async () => {
  await $pb?.collection('posts').subscribe('*', async () => {
    await getPostList();
  });
};

const unsubscribeToAllPosts = async () => {
  await $pb?.collection('posts').unsubscribe('*');
};

onMounted(async () => {
  await getPostList();
  await subscribeToAllPosts();
});

onUnmounted(async () => {
  await unsubscribeToAllPosts();
});
</script>

<template>
  <div>
    <h1 class="mb-3 text-2xl font-bold">Home - Feed</h1>
    <div v-if="posts.length" class="grid grid-cols-1 md:grid-cols-3">
      <div v-for="post in posts" :key="post.id" class="md:col-start-2 md:col-span-1">
        <PostCard :post-data="post" />
      </div>
    </div>
  </div>
</template>
