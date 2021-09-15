<template>
  <div class="container">
    <global-header :user="userData"></global-header>
    <column-list :list="list"></column-list>
    <!-- 测试表单 -->
    <vaildate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <vaildate-input :rules="emailRules" placeholder="请输入邮箱地址" type="text" ref="inputRef"></vaildate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <vaildate-input :rules="passwordRules" placeholder="请输入密码" type="password"></vaildate-input>
      </div>
    </vaildate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GolbalHeader.vue'
import VaildateInput, { RulesProp } from './components/ValidateInput.vue'
import VaildateForm from './components/ValidateForm.vue'

// 专栏模拟数据
const columnData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1专栏',
    description: '这是test1专栏',
    avatar: 'https://cn.vuejs.org/images/logo.svg'
  },
  {
    id: 2,
    title: 'test2专栏',
    description: '这是test2专栏',
    avatar: 'https://cn.vuejs.org/images/logo.svg'
  },
  {
    id: 3,
    title: 'test3专栏',
    description: '这是test3专栏',
    avatar: 'https://cn.vuejs.org/images/logo.svg'
  },
  {
    id: 4,
    title: 'test4专栏',
    description: '这是test4专栏'
    // avatar: 'https://cn.vuejs.org/images/logo.svg'
  }
]
// 用户模拟数据
const userData: UserProps = {
  isLogin: true,
  name: 'TaoLoading'
}
// 邮箱模拟数据
const emailData = ref('Taoloading@taoloading.com')
// 密码模拟数据
const passwordData = ref('123123')

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    VaildateInput,
    VaildateForm
  },
  setup() {
    const emailRules:RulesProp = [
      { type: 'required', message: '邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的邮箱' }
    ]
    const passwordRules:RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const inputRef = ref<any>()
    const onFormSubmit = (result:boolean) => {
      console.log('提交成功', inputRef.value.validateInput())
      // console.log('提交成功', result)
    }
    return {
      list: columnData,
      userData,
      emailRules,
      passwordRules,
      emailData,
      passwordData,
      onFormSubmit,
      inputRef
    }
  }
})
</script>

<style></style>
