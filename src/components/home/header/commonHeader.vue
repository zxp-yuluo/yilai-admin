<script setup>
import {computed} from "vue"
import { useRouter } from "vue-router"
import { Menu } from '@element-plus/icons-vue'
import { useApp } from "@/pinia/modules/useApp"
import { logout } from "@/api/user/user"
import { useAccount } from "@/pinia/modules/useAccount"

const app = useApp()
const account = useAccount()
const router = useRouter()
const activeMenu = computed(() => app.app.activeMenu)
const { sidebar,crumbList } = app.app
const { setIsCollapse,setActiveMenu } = app
const { setToken, setUserInfo } = account

// 侧边栏展开/隐藏
const collapseTabHandler = () => {
  setIsCollapse(!sidebar.isCollapse)
}

// 退出登录
const exitLogin = () => {
  ElMessageBox.confirm(
    '是否退出登录?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
    }
  )
    .then(() => {
      logout().then(res => {
        console.log(res);
        if (res.code == 200) {
          localStorage.setItem("token", "")
          setToken("")
          setUserInfo(null)
          router.replace("/login")
          ElMessage({
            type: 'success',
            message: 'Delete completed',
          })
        }
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

// 点击面包屑选项
const handleClickCrumb = (label) => {
  setActiveMenu(label)
}

</script>

<template>
  <div class="header">
    <div class="h-left">
      <el-button type="primary" :icon="Menu" @click="collapseTabHandler" size="small" />
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="crumb">
        <template v-for="item in crumbList">
          <el-breadcrumb-item
            @click="handleClickCrumb(item.lable)"
            :class="activeMenu == item.lable ? 'crumbActive' : ''"
            :to="{ path: `${item.path}` }"
          >{{ item.lable }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="h-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="avatar" src="../../../assets/images/avatar.jpg" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item @click="exitLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.h-left {
  display: flex;
  align-items: center;
}

.crumb {
  margin-left: 10px;
}

.el-breadcrumb__item.crumbActive .el-breadcrumb__inner.is-link {
  font-weight: normal !important;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>