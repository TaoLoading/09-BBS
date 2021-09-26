<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar && column.avatar.url" :alt="column.title" class="rounded-circle border w-50">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import PostList from '../../components/PostList.vue'
import { GlobalDataProps } from '../../store/index'
export default defineComponent({
  components: {
    PostList
  },
  setup() {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    // 将专栏与文章ID对应
    const currentId = route.params.id
    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', currentId)
    })
    // const column = store.state.columns.find(c => c._id === currentId)
    // const list = store.state.posts.filter(post => post.columnId === currentId)
    // 获取当前专栏信息
    const column = computed(() => store.getters.getColumnById(currentId))
    // 获取当前专栏文章
    const list = computed(() => store.getters.getPostsByCid(currentId))
    // console.log('list是', list)
    return {
      column,
      list
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
