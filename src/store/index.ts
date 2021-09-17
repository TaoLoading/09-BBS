import { createStore } from 'vuex'
import { testData, testPosts } from '../testData'

export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}
export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: number
  email?: string
  description?: string
}
export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}
const store = createStore({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: true, name: 'TaoLoading', columnId: 1 }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'TaoLoading' }
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
    }
  }
})

export default store
