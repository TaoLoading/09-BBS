<template>
  <div class="container">
    <global-header :user="userData"></global-header>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 TaoLoading BBS</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from './components/GolbalHeader.vue'

// 用户模拟数据
const userData: UserProps = {
  isLogin: true,
  name: 'TaoLoading'
}

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  },
  setup() {
    return {
      userData
    }
  }
})
</script>

<style></style>
