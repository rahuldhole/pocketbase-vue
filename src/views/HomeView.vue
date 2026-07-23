<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from 'vue';
import PostCard from '@/components/posts/PostCard.vue';
import { pocketBaseSymbol, type Post } from '@/types';

const $pb = inject(pocketBaseSymbol);
const posts = ref<Post[]>([]);

const getPostList = async () => {
  try {
    const list = await $pb?.collection('posts').getFullList<Post>({
      expand: 'user',
      sort: '-created'
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
    <div v-if="posts.length" class="mx-auto max-w-2xl space-y-6">
      <PostCard v-for="post in posts" :key="post.id" :post-data="post" />
    </div>
    <div v-else class="py-12 text-center text-gray-500">
      No posts yet. Be the first to post!
    </div>
  </div>
</template>
