import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from '../testData'

export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  column?: string
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
    user: { isLogin: false, name: '' }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'TaoLoading' }
    }
  }
})

export default store
