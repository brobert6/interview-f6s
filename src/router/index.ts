import { createRouter, createWebHistory } from "vue-router";
import Conversation from "../components/pages/Conversation.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Conversation,
    },
  ],
});

export default router;
