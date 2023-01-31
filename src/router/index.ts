import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "emails",
      component: () => import("../views/EmailsView.vue"),
    },
    {
      path: "/email",
      name: "emailDetail",
      component: () => import("../views/EmailDetailView.vue"),
    },
  ],
});

export default router;
