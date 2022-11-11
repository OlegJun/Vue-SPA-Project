import { createRouter, createWebHashHistory } from "vue-router";

import Main from "@/pages/Main";

import PostPages from "@/pages/PostPages"

import About from "@/pages/About"

import PostIdPages from "@/pages/PostIdPage"

import PostPageWithVue from "@/pages/PostPageWithVue"

const routes = [
   {
      path: '/',
      component: Main,
   },
   {
      path: '/posts',
      component: PostPages,
   },
   {
      path: '/about',
      component: About,
   },
   {
      path: '/posts/:id',
      component: PostIdPages,
   },
   {
      path: '/storege',
      component: PostPageWithVue
   }
]


const router = createRouter({
   routes,
   history: createWebHashHistory(process.env.BASE_URL)
})

export default router;