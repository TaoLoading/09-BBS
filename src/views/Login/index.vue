<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到者也</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules" v-model="emailData"
          placeholder="请输入邮箱地址"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="passwordData"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import ValidateInput, { RulesProp } from '../../components/ValidateInput.vue'
import ValidateForm from '../../components/ValidateForm.vue'
export default defineComponent({
  name: '',
  props: {
  },
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    // 邮箱模拟数据
    const emailData = ref('Taoloading@taoloading.com')
    // 密码模拟数据
    const passwordData = ref('123123')
    const router = useRouter()
    const emailRules: RulesProp = [
      { type: 'required', message: '邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的邮箱' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const onFormSubmit = (result:boolean) => {
      if (result) {
        router.push({ name: 'column', params: { id: 1 } })
      }
    }
    return {
      emailRules,
      passwordRules,
      onFormSubmit,
      emailData,
      passwordData
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
