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
    const list = await $pb?.collection('posts').getFullList<Post>({
      filter: `user = '${userStore.userID}'`,
      expand: 'user'
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
  <div>
    <h1 class="mb-3 text-2xl font-bold">New Post & My Posts</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div v-for="post in posts" :key="post.id">
          <PostCard :post-data="post" />
        </div>
      </div>
      <div>
        <PostForm @new-post-created="getOwnedPostList" />
      </div>
    </div>
  </div>
</template>
