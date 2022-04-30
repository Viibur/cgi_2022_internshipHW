import { createRouter, createWebHistory } from "vue-router";
import Definitions from "@/views/DefinitionView.vue";
import Calculator from '@/views/CalculatorView.vue'

const routes = [
    {
        path: "/",
        name: "calculator",
        component: Calculator,
    },
    {
        path: "/moisted",
        name: "definitions",
        component: Definitions,
    },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
