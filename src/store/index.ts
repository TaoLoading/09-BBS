import Axios from 'axios'
import { createStore } from 'vuex'

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}
export interface ColumnProps {
  _id?: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id: string;
  title: string;
  content?: string;
  excerpt?:string;
  image?: ImageProps;
  createdAt: string;
  columnId: string;
}
export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: string
  email?: string
  description?: string
}
export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: { isLogin: true, name: 'TaoLoading', columnId: '1' }
  },
  mutations: {
    // 登录
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'TaoLoading' }
    },
    // 新建文章
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns(state, newData) {
      state.columns = newData.data.list
    },
    fetchColumn(state, newData) {
      state.columns = [newData.data]
    },
    fetchPosts(state, newData) {
      state.posts = newData.data.list
      console.log('新的posts是', state.posts)
    }
  },
  actions: {
    // 获取首页“发现精彩”内容
    fetchColumns({ commit }) {
      Axios.get('/columns').then(res => {
        commit('fetchColumns', res.data)
      })
    },
    // 获取专栏页头部内容
    fetchColumn({ commit }, pid) {
      Axios.get(`/columns/${pid}`).then(res => {
        commit('fetchColumn', res.data)
      })
    },
    // 获取专栏页文章内容
    fetchPosts({ commit }, pid) {
      Axios.get(`/columns/${pid}/posts`).then(res => {
        commit('fetchPosts', res.data)
      })
    }
  }
})

export default store
