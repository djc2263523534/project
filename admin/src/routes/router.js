import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home/Home.vue'

const Login = () => import('views/Login')

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }

]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
