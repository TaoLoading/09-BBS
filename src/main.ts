import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  // 配置后端访问码
  config.params = { ...config.params, icode: '0C46BA6BC011515F' }
  // 发起请求时开启loading
  store.commit('setLoading', true)
  // 重置错误状态
  store.commit('setError', { status: false, message: '' })
  return config
})
axios.interceptors.response.use(config => {
  // 拿到响应时关闭loading
  store.commit('setLoading', false)
  return config
}, e => {
  // 错误处理
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})

// createApp(App).mount('#app')
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
