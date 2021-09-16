<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList, { ColumnProps } from '../../components/ColumnList.vue'
export default defineComponent({
  name: '',
  props: {
  },
  components: {
    ColumnList
  },
  setup() {
    // 专栏模拟数据
    const columnData: ColumnProps[] = [
      {
        id: 1,
        title: 'test1专栏',
        description: '这是test1专栏',
        avatar: 'https://cn.vuejs.org/images/logo.svg'
      },
      {
        id: 2,
        title: 'test2专栏',
        description: '这是test2专栏',
        avatar: 'https://cn.vuejs.org/images/logo.svg'
      },
      {
        id: 3,
        title: 'test3专栏',
        description: '这是test3专栏',
        avatar: 'https://cn.vuejs.org/images/logo.svg'
      },
      {
        id: 4,
        title: 'test4专栏',
        description: '这是test4专栏'
        // avatar: 'https://cn.vuejs.org/images/logo.svg'
      }
    ]
    return {
      list: columnData
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
