import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用路由懒加载
const Login = () => import('@/views/login')
Vue.use(VueRouter)

const routes = [
  // 设置登录的路由
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
