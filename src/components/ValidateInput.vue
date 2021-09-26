<template>
    <div class="validate-input-container pb-3">
      <input v-if="tag!='textarea'" class="form-control" v-model="inputRef.val" @blur="validateInput"
        :class="{'is-invalid': inputRef.error}" v-bind="$attrs">
      <textarea v-else class="form-control" v-model="inputRef.val"
        @blur="validateInput" :class="{'is-invalid': inputRef.error}" v-bind="$attrs"></textarea>
      <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted, computed } from 'vue'
import { emitter } from './ValidateForm.vue'

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RuleProp {
  type: 'required' | 'email' | 'custom'
  message: string
  // 自定义规则函数
  validator?: () => boolean
}
export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea'
export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    // 用于确定传入输入框的类型
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  // inheritAttrs: false禁用继承，与v-bind="$attrs"配合实现修改继承位置
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      val: computed({
        get: () => props.modelValue || '',
        set: val => {
          context.emit('update:modelValue', val)
        }
      }),
      error: false,
      message: ''
    })
    // 验证输入格式
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
              // 自定义规则
            case 'custom':
              passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    /* // 通过自定义v-model的方式更新输入的值
    const updateValue = (e:KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      // 向外发送更新的事件，值为targetValue
      context.emit('update:modelValue', targetValue)
    } */
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
