import { createRouter, createWebHistory } from "vue-router";
import Moisted from "@/views/MoistedView.vue";
import Kalkulaator from '@/views/KalkulaatorView.vue'

const routes = [
    {
        path: "/",
        name: "kalkulaator",
        component: Kalkulaator,
    },
    {
        path: "/moisted",
        name: "mõisted",
        component: Moisted,
    },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
