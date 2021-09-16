<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar" :alt="column.title" class="rounded-circle border border-light w-25 my-3" />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <!-- <a href="#" class="btn btn-outline-primary">进入专栏</a> -->
          <router-link :to="`/column/${column.id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
export interface ColumnProps {
  id: number
  title: string
  avatar?: string
  description: string
}
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      // 使用PropType将构造函数断言成ColumnProps规定的类型
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props) {
    // 当没有头像时显示默认头像
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = require('@/assets/avatar.jpg')
        }
        return column
      })
    })
    return {
      columnList
    }
  }
})
</script>

<style scoped></style>
