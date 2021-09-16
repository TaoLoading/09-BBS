import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import Login from './views/Login/index.vue'
import Home from './views/Home/index.vue'
import ColumnDetail from './views/ColumnDetail/index.vue'
import App from './App.vue'

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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    }
  ]
})

// createApp(App).mount('#app')
const app = createApp(App)
app.use(router)
app.mount('#app')
