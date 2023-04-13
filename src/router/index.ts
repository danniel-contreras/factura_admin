import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [{
    name: "Home",
    path: "",
    component: () => import("../pages/home/Home.vue")
}, {
    name: "Pages",
    path: "/pages",
    component: () => import("../pages/menus/Pages.vue")
},{
    name: "Menus",
    path: "/menus",
    component: () => import("../pages/menus/Menus.vue")
}]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;