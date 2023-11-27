<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from "vue-router"
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { login, getUserinfo } from "../../api/user/user";
import { useAccount } from "@/pinia/modules/useAccount.js"

const account = useAccount()
const { setUserInfo, setToken } = account
const router = useRouter()
const form = reactive({
  userName: "",
  password: "",
})
const ruleFormRef = ref()
const validatePwd = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (6 > value.length || value.length > 24) {
    callback(new Error('密码6到24位'))
  } else {
    callback()
  }
}
const rules = reactive({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 16, message: '用户名2到16位', trigger: 'blur' },
  ],
  password: [{ validator: validatePwd, trigger: 'blur' }],
})

const onSubmit = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      login(form).then(res => {
        console.log(res);
        if (res.data == null) {
          ElMessage.error(res.message)
        } else {
          ElMessage.success(res.message)
          localStorage.setItem("token", res.data.token)
          setToken(res.data.token)
          // 调用获取用户信息接口
          getUserinfo().then(res => {
            // 获取成功
            // 存放daopinia
            setUserInfo(res.data)
            // 跳转页面
            router.replace('/home')
          })
        }
      })
    } else {
      console.log('error submit!', fields)
      ElMessage.success('error submit!')
    }
  })
}
</script>

<template>
  <div class='login'>
    <el-form class="form" :model="form" ref="ruleFormRef" :rules="rules">
      <el-form-item prop="userName">
        <el-input placeholder="用户名" :prefix-icon="User" v-model="form.userName" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" type="password" :prefix-icon="Lock" v-model="form.password" />
      </el-form-item>
      <el-button type="primary" @click="onSubmit(ruleFormRef)">登录</el-button>
    </el-form>
  </div>
</template>

<style scoped>
@import './login.css';
</style>