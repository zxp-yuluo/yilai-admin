<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Lock, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { login, getUserinfo } from '../api/user/user'
import { useAccount } from '../pinia/modules/useAccount'
import { useApp } from '../pinia/modules/useApp'


// ------------------ pinia数据 ------------------
const { setUserInfo } = useAccount()
const { setToken } = useApp()

// ------------------ router ------------------
const router = useRouter()

// ------------------ 定义数据模型 ------------------

// 表单数据
const form = reactive({
  userName: "admin",
  password: "111111"
})
// 表单对象
const ruleFormRef = ref()
// 校验规则
const rules = reactive({
  userName: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 2, max: 20, message: '长度2-20', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度6-20', trigger: 'blur' },
    { pattern: /[^\u4e00-\u9fa5]/, message: '不能包含中文字符', trigger: 'blur' }
  ]
})




// ------------------ 操作方法 ------------------

// 点击提交
const onSubmit = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // 登录提交
      const loginResult = await login(form);
      // console.log(loginResult);
      const { code: loginCode, data: loginData, message: loginMsg } = loginResult
      if (loginCode != 200) {
        ElMessage.error(loginMsg)
        return
      }
      // 成功把token存到本地和pinia中
      // console.log(loginData);
      localStorage.setItem('token', loginData.token)
      setToken(loginData.token)
      // 发送请求，获取用户信息
      const userInfoResult = await getUserinfo();
      // console.log(userInfoResult);
      const { code: userInfoCode, data: userInfoData, message: userInfoMsg } = userInfoResult
      // console.log(userInfoCode,userInfoData,userInfoMsg);
      if (userInfoCode != 200) {
        ElMessage.error(userInfoMsg)
        return
      }
      // 成功把用户信息存到本地和pinia中
      localStorage.setItem('userInfo', JSON.stringify(userInfoData))
      setUserInfo(userInfoData)
      // 登录成功，页面跳转
      // router.replace('/admin')
      router.push('/admin')
      ElMessage.success(loginMsg)
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <div class='login'>
    <el-form class="form" :model="form" :rules="rules" ref="ruleFormRef">
      <el-form-item prop="userName">
        <el-input :prefix-icon="User" placeholder="请输入账号" v-model="form.userName" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input :prefix-icon="Lock" placeholder="请输入密码" type="password" show-password v-model="form.password" />
      </el-form-item>
      <el-button class="btn" type="primary" @click="onSubmit(ruleFormRef)">登录</el-button>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.login {
  height: 100%;
  width: 100%;
  background: center / cover no-repeat url('../assets/images/bgi.jpg');

  .form {
    @include center;
    padding: 30px;
    width: 260px;
    background: #fff;
    border-radius: 10px;

    .btn {
      width: 100%;
    }
  }
}
</style>