import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [{
    name: "Home",
    path: "",
    component: () => import("../pages/home/Home.vue")
},{
    name: "Menus",
    path: "/menus",
    component: () => import("../pages/menus/Menus.vue")
},
{
    name: "Options",
    path: "/options",
    component: () => import("../pages/menus/Options.vue")
}]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;