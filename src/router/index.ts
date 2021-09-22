
import { createWebHistory, createRouter } from 'vue-router'
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
  if (to.meta.requireLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router
