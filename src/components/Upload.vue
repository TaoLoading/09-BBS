<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input type="file" class="file-input d-none" ref="fileInput" @change.prevent="handleFileChange">
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import axios from 'axios'
import creatMessage from './createMessage'

// 声明上传文件时的状态
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
// 声明检查文件是否合法的函数
type CheckFunction = (file:File) => boolean
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    }
  },
  inheritAttrs: false,
  setup(props) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    // 上传成功后服务器端返回的数据，用于向父组件中传递
    const uploadedData = ref()
    // 点击上传
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    // 上传文件过程
    const handleFileChange = (e:Event) => {
      const target = e.target as HTMLInputElement
      if (target.files) {
        // 获取上传的文件。target.files是一个列表，上传文件是它里面的第一个元素
        const files = Array.from(target.files)
        // 校验文件是否合法
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) {
            return
          }
        }
        fileStatus.value = 'loading'
        // 将文件信息转换为表单信息，以便上传
        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('icode', '15A7028B2AE56E27')
        // 上传文件。第三个参数在响应头中设置传递数据的格式
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          fileStatus.value = 'success'
          creatMessage('上传成功', 'success')
          uploadedData.value = res.data
        }).catch(e => {
          fileStatus.value = 'error'
          creatMessage(`上传失败，原因是：${e}`, 'error')
        }).finally(() => {
          // 复原fileInput
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        })
      }
    }
    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange,
      uploadedData
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
