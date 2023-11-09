<script setup>
import { reactive,ref } from 'vue'
import { User, Lock,Hide } from '@element-plus/icons-vue'
const form = reactive({
  username: "",
  password: "",
})
const ruleFormRef = ref()
const validatePwd = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if(6>value.length || value.length > 24) {
    callback(new Error('密码6到24位'))
  }else {
    callback()
  }
}
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 16, message: '用户名2到16位', trigger: 'blur' },
  ],
  password: [{ validator: validatePwd, trigger: 'blur' }],
})

const onSubmit = async (formEl) => {
  console.log(formEl);
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!',valid,form)
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <div class='login'>
    <el-form class="form" :model="form" ref="ruleFormRef" :rules="rules" label-width="auto">
      <el-form-item prop="username">
        <el-input placeholder="用户名" :prefix-icon="User" v-model="form.username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" type="password" :prefix-icon="Lock" v-model="form.password"  />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">登录</el-button>
      </el-form-item>
      
    </el-form>
  </div>
  
</template>

<style scoped>
@import './login.css';
</style>