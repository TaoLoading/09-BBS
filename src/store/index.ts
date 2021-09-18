import axios from 'axios'
import { createStore, Commit } from 'vuex'
// import { testData, testPosts } from '../testData'

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
  column: string;
}
export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  column?: string
  email?: string
  description?: string
}
export interface GlobalDataProps {
  loading:boolean
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}
// 提交请求函数
const getAndCommit = async (url:string, mutationName:string, commit:Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}
const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: true, name: 'TaoLoading', column: '1' }
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
    },
    setLoading(state, status) {
      state.loading = status
    }
  },
  actions: {
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
