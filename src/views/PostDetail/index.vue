<template>
  <div class="post-detail-page">
    <modal title="删除文章" :visible="modalIsVisible" @modal-on-close="modalIsVisible = false" @modal-on-confirm="deletePosts">
      <p>确定删除该文章吗？</p>
    </modal>
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img :src="currentImageUrl" alt="currentPost.title" class="rounded-lg img-fluid my-4" v-if="currentImageUrl">
      <h2 class="mb-4">{{currentPost.title}}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile :user="currentPost.author" v-if="typeof currentPost.author === 'object'"></user-profile>
        </div>
        <span class="text-muted col text-right font-italic">发表于：{{currentPost.createdAt}}</span>
      </div>
      <div v-html="currentHTML"></div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link type="button" class="btn btn-success" :to="{name: 'create', query: { id: currentPost._id}}">
          编辑
        </router-link>
        <button type="button" class="btn btn-danger" @click.prevent="modalIsVisible = true">删除</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { GlobalDataProps, PostProps, ImageProps, UserProps, ResponseType } from '../../store/index'
import UserProfile from '../../components/UserProfile.vue'
import createMessage from '../../components/createMessage'
import Modal from '../../components/Modal.vue'
export default defineComponent({
  components: {
    UserProfile,
    Modal
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const router = useRouter()
    const modalIsVisible = ref(false)
    const currentId = route.params.id
    const md = new MarkdownIt()
    onMounted(() => {
      store.dispatch('fetchPost', currentId)
    })
    const currentPost = computed<PostProps>(() => store.getters.getCurrentPost(currentId))
    // console.log('currentPost是', currentPost)
    // 将md语法转换为html代码
    // eslint-disable-next-line vue/return-in-computed-property
    const currentHTML = computed(() => {
      if (currentPost.value && currentPost.value.content) {
        return md.render(currentPost.value.content)
      }
    })
    // 获取banner图
    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value
        return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
      } else {
        return null
      }
    })
    // 根据比对文章id和登录id判断编辑区域是否显示
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (currentPost.value && currentPost.value.author && isLogin) {
        // 对author属性进阶类型断言，强制为UserProps
        const postAuthor = currentPost.value.author as UserProps
        return postAuthor._id === _id
      } else {
        return false
      }
    })
    // 删除文章
    const deletePosts = () => {
      modalIsVisible.value = false
      // (TODO) 点击删除后，文章已成功删除，服务器返回200，但没有进入then，而是catch捕获
      store.dispatch('deletePost', currentId).then((newData: ResponseType<PostProps>) => {
        createMessage('删除成功，2秒后跳转到专栏首页', 'success')
        setTimeout(() => {
          router.push({ name: 'column', params: { id: newData.data.column } })
        }, 2000)
      }).catch(() => {
        createMessage('删除失败', 'error')
      })
    }
    return {
      currentPost,
      currentHTML,
      currentImageUrl,
      showEditArea,
      modalIsVisible,
      deletePosts
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
