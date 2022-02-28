import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入进度条包 nprogress
import Nprogress from 'nprogress'
// 使用路由懒加载
const Login = () => import('@/views/login')
const Home = () => import('@/views/home')
const Layout = () => import('@/views/layout')
const Article = () => import('@/views/article')
const Image = () => import('@/views/image')
const Comment = () => import('@/views/comment')
const Publish = () => import('@/views/publish')
const Settings = () => import('@/views/settings')
const Account = () => import('@/views/account')
const Fans = () => import('@/views/fans')
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
    component: Layout,
    children: [
      // HOME路由
      {
        path: '', // 不设置路径， 主页面就展示这个， 一个路由只能使用一次
        name: 'home',
        component: Home
      },
      // 内容
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      // 素材
      {
        path: '/image',
        name: 'image',
        component: Image
      },
      // 发布
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      },
      // 评论
      {
        path: '/comment',
        name: 'comment',
        component: Comment
      },
      // 粉丝
      {
        name: 'fans',
        path: '/fans',
        component: Fans
      },
      // 个人设置
      {
        path: '/settings',
        name: 'settings',
        component: Settings
      }
    ]
  },
  // 账户设置
  {
    path: '/account',
    name: 'account',
    component: Account
  }
]

const router = new VueRouter({
  routes
})

// 配置路由导航守卫
// 守卫页面的导航的
// to：要去的路由信息
// from：来自哪里的路由信息
// next：放行方法
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login，校验登录状态
  // 如果没有登录，则跳转到登录页面
  // 如果登录了，则允许通过
  // 允许通过
  // next()

  // 开启顶部进度条
  Nprogress.start()

  const user = JSON.parse(window.localStorage.getItem('user'))

  // 校验非登录的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 已登录， 允许通过
      next()
    } else {
      // 没有登录跳转登录页面
      next('/login')
    }
  } else {
    // 登录页面， 允许通过
    next()
  }
})

// 在路由的全局后置钩子中，关闭进度条特效
router.afterEach((to, from) => {
  // 结束顶部的导航进度条
  Nprogress.done()
})

export default router
