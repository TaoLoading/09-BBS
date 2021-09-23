<template>
  <div class="container">
    <global-header :user="userData"></global-header>
    <loading v-if="isLoading" text="加载中"></loading>
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
import { computed, defineComponent, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GolbalHeader.vue'
import Loading from './components/Loading.vue'
import { GlobalDataProps } from './store/index'
import createMessage from './components/createMessage'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loading
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const userData = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    // 监视error状态，并根据错误值进行提示
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error')
      }
    })
    return {
      userData,
      isLoading,
      error
    }
  }
})
</script>

<style></style>
