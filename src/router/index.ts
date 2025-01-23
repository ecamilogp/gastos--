import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../components/Home.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/table-actions",
    name: "table",
    component: () => import("../components/TableActions.vue"),
  },
  {
    path: "/delete-cuenta",
    name: "cuenta",
    component: () => import("../components/Cuenta.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
