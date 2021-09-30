import axios, { AxiosRequestConfig } from 'axios'
import { createStore, Commit } from 'vuex'

// eslint-disable-next-line @typescript-eslint/ban-types
export interface ResponseType<P = {}> {
  code: number
  msg: string
  data: P
}
export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
  fitUrl?: string
}
export interface ColumnProps {
  _id?: string
  title: string
  avatar?: ImageProps
  description: string
}
export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
  avatar?: ImageProps
  description?: string
}
export interface PostProps {
  _id: string
  title: string
  content?: string
  excerpt?: string
  image?: ImageProps | string
  createdAt: string
  column: string
  author?: string | UserProps
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
// 发起访问请求函数(组合get/post等请求)
const asyncAndCommit = async (url:string, mutationName:string, commit:Commit, config:AxiosRequestConfig = { method: 'get' }) => {
  const { data } = await axios(url, config)
  commit(mutationName, data)
  return data
}
export const store = createStore<GlobalDataProps>({
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
    },
    // 登出
    logout(state) {
      state.token = ''
      state.user = { isLogin: false }
      localStorage.remove('token')
      delete axios.defaults.headers.common.Authorization
    },
    fetchPost(state, newData) {
      state.posts = newData.data
    },
    updatePost(state, { data }) {
      // console.log('state.posts的类型是', typeof state.posts)
      // console.log('state.posts是', state.posts)
      state.posts = state.posts.map(post => {
        if (post._id === data.id) {
          return data
        } else {
          return post
        }
      })
    },
    deletePost(state, { data }) {
      state.posts = state.posts.filter(post => post._id !== data._id)
    }
  },
  actions: {
    // 登录
    login({ commit }, params) {
      return asyncAndCommit('/user/login', 'login', commit, {
        method: 'post',
        data: params
      })
    },
    // 获取首页“发现精彩”内容
    fetchColumns({ commit }) {
      return asyncAndCommit('/columns', 'fetchColumns', commit)
    },
    // 获取专栏页头部内容
    fetchColumn({ commit }, cid) {
      return asyncAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    // 获取专栏页文章内容
    fetchPosts({ commit }, cid) {
      return asyncAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    // 获取某一文章内容
    fetchPost({ commit }, id) {
      return asyncAndCommit(`/posts/${id}`, 'fetchPost', commit)
    },
    // 获取用户信息
    fetchCurrentUser({ commit }) {
      return asyncAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    // 组合action(login和fetchCurrentUser)
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    // 新建文章
    createPost({ commit }, params) {
      return asyncAndCommit('/posts', 'createPost', commit, {
        method: 'post',
        data: params
      })
    },
    // 更新文章
    updatePost({ commit }, { id, params }) {
      return asyncAndCommit(`/posts/${id}`, 'updatePost', commit, {
        method: 'patch',
        data: params
      })
    },
    // 删除文章
    deletePost({ commit }, id) {
      return asyncAndCommit(`/posts/${id}`, 'deletePost', commit, {
        method: 'delete',
        data: id
      })
    }
  },
  getters: {
    // 获取当前专栏信息
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    // 获取当前专栏内文章
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    },
    // 获取当前文章
    getCurrentPost: (state) => (id: string) => {
      return state.posts
      return state.posts.find(post => post._id === id)
    }
  }
})

export default store
