<template>
  <teleport to='#message'>
    <div class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2" :class="classObject" v-if="isVisible">
      <span>{{message}}</span>
      <button type="button" class="btn-close" aria-label="Close" @click.prevent="hide">
      </button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import useDOMCreate from '../hook/useDOMCreate'
export type MessageType = 'success' | 'error' | 'default'

export default defineComponent({
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  emits: ['close-message'],
  setup(props, context) {
    useDOMCreate('message')
    const isVisible = ref(true)
    // 自定义Message的类型
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }
    // 隐藏Message
    const hide = () => {
      isVisible.value = false
      context.emit('close-message', true)
    }
    return {
      classObject,
      isVisible,
      hide
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
