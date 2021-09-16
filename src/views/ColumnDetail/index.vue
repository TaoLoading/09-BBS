<template>
    <div>
      <pre>{{route}}</pre>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  components: {
  },
  setup() {
    const route = useRoute()
    return {
      route
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
