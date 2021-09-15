<template>
    <form class="validate-form-container">
    <slot></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
// 创建事件监听器
export const emitter = mitt()
export default defineComponent({
  emits: ['form-submit'],
  name: 'ValidateForm',
  setup(props, context) {
    const submitForm = () => {
      context.emit('form-submit', true)
    }
    const callback = (test?:string) => {
      console.log(test)
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
    })
    return {
      submitForm
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
