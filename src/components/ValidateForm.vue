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
type ValidateFunc = () => boolean
// 创建事件监听器
export const emitter = mitt()
export default defineComponent({
  // 定义提交事件事件名
  emits: ['form-submit'],
  name: 'ValidateForm',
  setup(props, context) {
    let funcArr: ValidateFunc[] = []
    const submitForm = () => {
      // 当every()中的一个条件不符合时会停止运行直接返回，但由于需要全部提示信息，故使用map()进行修改
      const result = funcArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }
    const callback = (func?: ValidateFunc) => {
      if (func) {
        funcArr.push(func)
      }
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })
    return {
      submitForm
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
