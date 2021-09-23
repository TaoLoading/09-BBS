<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/create" class="btn btn-primary my-2">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>
    <upload action="/upload" :beforeUpload="beforeUpload">
      <template #uploaded="slotProps">
        <img :src="slotProps.uploadedData.data.url" width="500">
      </template>
    </upload>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import ColumnList from '../../components/ColumnList.vue'
import { GlobalDataProps } from '../../store/index'
import createMessage from '../../components/createMessage'
import Upload from '../../components/Upload.vue'

export default defineComponent({
  components: {
    ColumnList,
    Upload
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    // 拿到store中的columns
    const list = computed(() => store.state.columns)
    // 校验图片格式的函数
    const beforeUpload = (file:File) => {
      const isJPG = (file.type === 'image/jpg' || file.type === 'image/jpeg')
      if (!isJPG) {
        createMessage('上传图片只能为jpg或jpeg格式', 'error')
      }
      return isJPG
    }
    return {
      list,
      beforeUpload
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
