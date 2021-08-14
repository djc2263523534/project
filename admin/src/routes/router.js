import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home/Home.vue'

const Login = () => import('views/login/Login')
const Welcome = () => import('views/home/pages/Welcome')
const User = () => import('views/home/pages/User')
const Roles = () => import('views/home/pages/Roles')
const Rights = () => import('views/home/pages/Rights')
const Categories = () => import('views/home/pages/Categories')

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
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: Welcome
      },
      {
        path: '/users',
        name: 'user',
        component: User
      },
      {
        path: '/roles',
        name: 'roles',
        component: Roles
      },
      {
        path: '/rights',
        name: 'rights',
        component: Rights
      },
      {
        path: "/categories",
        name: 'categories',
        component: Categories

      }
    ]
  }

]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, form, next) => {
  //如果用户访问的路径是登录页，直接放行
  if (to.path === '/login') return next()
  //获取保存的 seccionStorage 值
  const tokenStr = sessionStorage.getItem('token')
  //没有token 强制跳转登录页
  if (!tokenStr) return next('/login')
  next()

})

export default router
