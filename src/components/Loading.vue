<template>
  <teleport to="#back">
    <div class="d-flex justify-content-center align-items-center h-100 w-100 loading-container">
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
        </div>
        <p v-if="text" class="text-primary">{{text}}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
export default defineComponent({
  props: {
    text: {
      type: String
    }
  },
  setup() {
    // 使用teleport将新添加的loading组件移动到back节点中，并在卸载时移出
    // 因为随着组件的引入loading组件会放到被引入的组件中，容易受其影响
    const node = document.createElement('div')
    node.id = 'back'
    document.body.appendChild(node)
    onUnmounted(() => {
      document.body.removeChild(node)
    })
  }
})
</script>

<style scoped>
.loading-container {
  background: rgba(255, 255, 255, .5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
}
</style>
