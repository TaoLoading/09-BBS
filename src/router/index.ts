
import { createWebHistory, createRouter } from 'vue-router'
import axios from 'axios'
import Login from '../views/Login/index.vue'
import Register from '../views/Register/index.vue'
import Home from '../views/Home/index.vue'
import ColumnDetail from '../views/ColumnDetail/index.vue'
import CreatePost from '../views/CreatePost/index.vue'
import store from '../store/index'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: { requireLogin: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    // 用户未登录，判断token是否存在
    if (token) {
      // 当用户未进行登陆操作并且token存在时，发起请求获取用户信息
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        console.error(e)
        localStorage.removeItem('token')
        next('login')
      })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    // 用户已登录
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
