<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a
      href="#"
      class="navbar-brand"
    >BBS</a>
    <ul
      v-if="!user.isLogin"
      class="list-inline mb-0"
    >
      <li class="list-inline-item">
        <a
          href="#"
          class="btn btn-outline-light my-2"
        >登陆</a>
      </li>
      <li class="list-inline-item">
        <a
          href="#"
          class="btn btn-outline-light my-2"
        >注册</a>
      </li>
    </ul>
    <ul
      v-else
      class="list-inline mb-0"
    >
      <li class="list-inline-item">
        <a
          href="#"
          class="btn btn-outline-light my-2"
        >你好 {{user.name}}</a>
      </li>
    </ul>
  </nav>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
export interface UserProps {
  isLogin: boolean
  name?: string
  _id?: string
  column?: string
  email?: string
  avatar?: string
  description?: string
}
export default defineComponent({
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  components: {}
})
</script>

<style lang="scss" scoped>
</style>
