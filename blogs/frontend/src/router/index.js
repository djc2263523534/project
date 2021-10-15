import { createRouter, createWebHistory } from 'vue-router'
import Home from 'views/home/Home.vue'


const routes = [
  {
    path: '/',
    redirect: Home,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router