import axios from 'axios'
import { createStore, Commit } from 'vuex'

export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
}
export interface ColumnProps {
  _id?: string
  title: string
  avatar?: ImageProps
  description: string
}
export interface PostProps {
  _id: string
  title: string
  content?: string
  excerpt?: string
  image?: ImageProps
  createdAt: string
  column: string
}
export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
  description?: string
}
export interface GlobalErrorProps {
  status: boolean
  message?: string
}
export interface GlobalDataProps {
  error:GlobalErrorProps
  token: string
  loading: boolean
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}
// get请求函数
const getAndCommit = async (url:string, mutationName:string, commit:Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}
// post请求函数
const postAndCommit = async (url:string, mutationName:string, commit:Commit, params:any) => {
  const { data } = await axios.post(url, params)
  commit(mutationName, data)
  return data
}
const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: false }
  },
  mutations: {
    // 登录
    login(state, newData) {
      const { token } = newData.data
      state.token = token
      localStorage.setItem('token', token)
      // 设置请求头，每次请求都在Authorization中携带token
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
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
    },
    // 设置loading
    setLoading(state, status) {
      state.loading = status
    },
    fetchCurrentUser(state, newData) {
      state.user = { isLogin: true, ...newData.data }
    },
    // 修改错误状态
    setError(state, e:GlobalErrorProps) {
      state.error = e
    }
  },
  actions: {
    // 登录
    login({ commit }, params) {
      return postAndCommit('/user/login', 'login', commit, params)
    },
    // 获取首页“发现精彩”内容
    fetchColumns({ commit }) {
      getAndCommit('/columns', 'fetchColumns', commit)
    },
    // 获取专栏页头部内容
    fetchColumn({ commit }, cid) {
      getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    // 获取专栏页文章内容
    fetchPosts({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    // 获取用户信息
    fetchCurrentUser({ commit }) {
      getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    // 组合action(login和fetchCurrentUser)
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  }
})

export default store
