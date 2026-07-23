<script setup lang="ts">
import { inject, computed } from 'vue';
import { pocketBaseSymbol, type Post } from '@/types';

const $pb = inject(pocketBaseSymbol);

const props = defineProps<{
  postData?: Post;
}>();

const fileUrl = computed(() => {
  if (props.postData && props.postData.file && $pb) {
    // pocketbase requires record object to have id, collectionId/collectionName
    return $pb.files.getUrl(props.postData, props.postData.file);
  }
  return null;
});
</script>

<template>
  <div class="mb-8 rounded bg-blue-50 p-4">
    <h2 class="text-2xl font-bold">{{ props.postData?.title }}</h2>
    <span class="text-gray-400">
      {{ props.postData?.expand?.user?.username || 'Unknown user' }}
    </span>
    <img v-if="fileUrl" :src="fileUrl" alt="Post attachment" class="mt-4 max-h-96 w-full rounded object-cover" />
    <p class="mt-2">{{ props.postData?.content }}</p>
  </div>
</template>
