import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: '15A7028B2AE56E27' }
  return config
})

// createApp(App).mount('#app')
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
