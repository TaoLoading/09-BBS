<template>
  <div class="post-detail-page">
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { GlobalDataProps, PostProps, ImageProps, UserProps, ResponseType } from '../../store/index'
import UserProfile from '../components/UserProfile.vue'
import createMessage from '../../components/createMessage'
export default defineComponent({
  components: {
  },
  setup() {
    return {
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
