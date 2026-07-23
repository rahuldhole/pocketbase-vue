import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/index.css';

// Import PocketBase client service
import client from '@/services/pocketbase';

// Import PocketBase injection symbol
import { pocketBaseSymbol } from '@/types';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.provide(pocketBaseSymbol, client);

app.mount('#app');
