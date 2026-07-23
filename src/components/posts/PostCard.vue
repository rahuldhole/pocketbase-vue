<script setup lang="ts">
import { inject, computed } from 'vue';
import { pocketBaseSymbol, type Post } from '@/types';

const $pb = inject(pocketBaseSymbol);

const props = defineProps<{
  postData?: Post;
}>();

const authorName = computed(() => {
  if (!props.postData) return 'Unknown user';

  // The 'user' field expands to the user record
  const expandedUser = props.postData.expand?.user;
  if (expandedUser) {
    return expandedUser.name || expandedUser.email || 'Unknown user';
  }

  // Fallback: if current user's ID matches the user field
  const postUserId = props.postData.user;
  const currentUser = $pb?.authStore.record;
  if (currentUser && postUserId === currentUser.id) {
    return currentUser.name || currentUser.email || 'You';
  }

  return 'Unknown user';
});

const authorInitial = computed(() => {
  const name = authorName.value;
  if (!name || name === 'Unknown user') return '?';
  return name.charAt(0).toUpperCase();
});

const fileUrl = computed(() => {
  if (props.postData && props.postData.file && $pb) {
    return $pb.files.getUrl(props.postData, props.postData.file);
  }
  return null;
});
</script>

<template>
  <div class="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
    <div class="p-5">
      <div class="flex items-center gap-3 mb-4">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-bold text-gray-500">
          {{ authorInitial }}
        </div>
        <div>
          <span class="block font-semibold text-gray-900">
            {{ authorName }}
          </span>
          <span class="block text-xs text-gray-400">Posted just now</span>
        </div>
      </div>
      <h2 class="mb-2 text-xl font-bold text-gray-900">{{ props.postData?.title }}</h2>
      <p class="whitespace-pre-wrap text-gray-600" v-html="props.postData?.content"></p>
    </div>
    <img v-if="fileUrl" :src="fileUrl" alt="Post attachment" class="w-full max-h-96 object-cover border-t border-gray-50" />
  </div>
</template>
