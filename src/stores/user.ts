import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core';
import client from '@/services/pocketbase';

export const useUserStore = defineStore('user', () => {
  // useLocalStorage already returns a ref — do NOT wrap in ref() again
  const userID = useLocalStorage("userID", "");
  const userEmail = useLocalStorage("userEmail", "");
  const userName = useLocalStorage("userName", "");

  // Auto-sync with PocketBase authStore on init (covers page reload)
  const record = client?.authStore?.record;
  if (record) {
    userID.value = record.id || '';
    userEmail.value = record.email || '';
    userName.value = record.name || '';
  }

  function setFromRecord(rec: any) {
    userID.value = rec.id || '';
    userEmail.value = rec.email || '';
    userName.value = rec.name || '';
  }

  function clear() {
    userID.value = '';
    userEmail.value = '';
    userName.value = '';
  }

  return { userID, userEmail, userName, setFromRecord, clear }
})
