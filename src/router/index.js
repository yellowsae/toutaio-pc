import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用路由懒加载
const Login = () => import('@/views/login')
const Home = () => import('@/views/home')
const Layout = () => import('@/views/layout')
Vue.use(VueRouter)

const routes = [
  // 设置登录的路由
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // 主页面
  // layout 布局页面
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      // HOME路由
      {
        path: '', // 不设置路径， 主页面就展示这个， 一个路由只能使用一次
        name: 'home',
        component: Home
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
