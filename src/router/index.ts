import client from '@/services/pocketbase';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/new-post',
      name: 'new-post',
      meta: { requiresAuth: true },
      component: () => import('../views/NewPostView.vue')
    }
  ]
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !client?.authStore.token) {
    return {
      path: '/auth'
    };
  }
});

export default router;
