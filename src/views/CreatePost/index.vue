<template>
  <div class="create-post-page">
    <h4>{{isEdit ? '编辑文章' : '新建文章'}}</h4>
    <upload action="/upload" class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      :beforeUpload="uploadCheck" @upload-success="handleFileFileUpload" :uploaded="uploadedData">
      <h2>点击上传banner</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status"></div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="slotProps">
        <img :src="slotProps.uploadedData.data.url" width="500">
      </template>
    </upload>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text"/>
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input rows="10" tag="textarea" placeholder="请输入文章详情" :rules="contentRules" v-model="contentVal"/>
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">{{isEdit ? '更新文章' : '发表文章'}}</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { GlobalDataProps, PostProps, ResponseType, ImageProps } from '../../store/index'
import ValidateInput, { RulesProp } from '../../components/ValidateInput.vue'
import ValidateForm from '../../components/ValidateForm.vue'
import Upload from '../../components/Upload.vue'
import { beforeUploadCheck } from '../../hook/helper'
import createMessage from '../../components/createMessage'

export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm,
    Upload
  },
  setup() {
    const uploadedData = ref()
    const titleVal = ref('')
    const router = useRouter()
    const route = useRoute()
    // 通过类型转换判断是否是编辑状态
    const isEdit = !!route.query.id
    const store = useStore<GlobalDataProps>()
    let imgId = ''
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    // 上传成功的事件，获取imgId
    const handleFileFileUpload = (newData:ResponseType<ImageProps>) => {
      if (newData.data._id) {
        imgId = newData.data._id
      }
    }
    onMounted(() => {
      // 当处于编辑状态时，异步获取当前被编辑文章的数据填充到页面中
      if (isEdit) {
        store.dispatch('fetchPost', route.query.id).then((newData:ResponseType<PostProps>) => {
          const currentPost = newData.data
          if (currentPost.image) {
            uploadedData.value = { data: currentPost.image }
          }
          titleVal.value = currentPost.title
          contentVal.value = currentPost.content || ''
        })
      }
    })
    // 提交文章
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user
        if (column) {
          const newPost:PostProps = {
            _id: new Date().getTime().toString(),
            title: titleVal.value,
            content: contentVal.value,
            column,
            author: _id,
            createdAt: new Date().toLocaleString()
          }
          if (imgId) {
            newPost.image = imgId
          }
          const actionName = isEdit ? 'updatePost' : 'createPost'
          const sendData = isEdit ? {
            id: route.query.id,
            params: newPost
          } : newPost
          store.dispatch(actionName, sendData).then(() => {
            createMessage('发表成功，正在跳转到文章专栏页面...', 'success')
            setTimeout(() => {
              router.push({ name: 'column', params: { id: column } })
            }, 2000)
          })
        }
      }
    }
    // 传统上传表单的实现
    /* const handleFileChange = (e:Event) => {
      // 获取上传的文件
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        const uploadedFile = files[0]
        // 将文件信息转换为表单信息，以便上传
        const formData = new FormData()
        formData.append(uploadedFile.name, uploadedFile)
        // 上传文件。第三个参数在响应头中设置传递数据的格式
        axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res)
        })
      }
    } */
    // 校验上传数据是否合法
    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/jpg', 'image/png'], size: 1 })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('上传图片只能是JPG/JPEG/PNG格式!', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片大小不能超过1Mb', 'error')
      }
      return passed
    }
    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      onFormSubmit,
      uploadedData,
      isEdit,
      uploadCheck,
      handleFileFileUpload
    }
  }
})
</script>
<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  /* object-fit：指定内容如何适应其使用的高度和宽度确认的框 */
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
