<template>
  <div class="container">
    <global-header :user="userData"></global-header>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GolbalHeader.vue'
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
// 用户模拟数据
const userData: UserProps = {
  isLogin: true,
  name: 'TaoLoading'
}

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader
  },
  setup() {
    return {
      list: columnData,
      userData
    }
  }
})
</script>

<style></style>
