<script setup lang="ts">
import type { Post } from '@/types';

const props = defineProps<{
  postData?: Post;
}>();
</script>

<template>
  <div class="mb-8 rounded bg-blue-50 p-4">
    <h2 class="text-2xl font-bold">{{ props.postData?.title }}</h2>
    <span class="text-gray-400">
      {{ props.postData?.expand?.user?.username || 'Unknown user' }}
    </span>
    <p class="mt-2">{{ props.postData?.content }}</p>
  </div>
</template>
