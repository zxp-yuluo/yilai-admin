<script setup>
import { useRouter } from 'vue-router'
import { Menu } from '@element-plus/icons-vue'
import { useApp } from "~/pinia/modules/useApp"
import { useAccount } from '~/pinia/modules/useAccount'
import { ElMessage, ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia'
import { logout } from "~/api/user/user.js"

// ---------------- 定义数据模型 ----------------
const router = useRouter()
const app = useApp()
const { crumbList, setSidebar, setActiveMenu, setToken } = app
const { sidebar, activeMenu } = storeToRefs(app)
const { setUserInfo } = useAccount()


// ---------------- 操作方法 ----------------

// 侧边栏展开/隐藏
const collapseTabHandler = () => {
  setSidebar(!sidebar.value)
}

// 退出登录
const exitLogin = () => {
  ElMessageBox.confirm(
    '确定退出登陆吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'info'
    }
  )
    .then(async () => {
      const { code, message } = await logout()
      console.log(code, message);
      if (code != 200) {
        ElMessage({
          type: 'error',
          message: '退出失败！',
        })
        return
      }
      // 删除本地和pinia中的token和个人信息
      localStorage.removeItem("token")
      localStorage.removeItem("userInfo")
      setToken("")
      setUserInfo(null)
      // 返回登录页面
      router.replace('/login')
      ElMessage({
        type: 'success',
        message: '退出成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消退出登录',
      })
    })
}

// 点击面包屑选项
const handleClickCrumb = (label) => {
  if (activeMenu.value == label) return
  setActiveMenu(label)
}
</script>

<template>
  <div class="header">
    <div class="header-left">
      <el-button type="primary" :icon="Menu" @click="collapseTabHandler" size="small" />
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="crumb">
        <template v-for="item in crumbList">
          <el-breadcrumb-item @click="handleClickCrumb(item.label)" :class="activeMenu == item.label ? 'crumbActive' : ''"
            :to="{ path: `${item.path}` }">{{ item.label
            }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="header-right">
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

<style scoped lang="scss">
.header {
  @include flex($jc: space-between);
  height: 60px;

  &-left {
    display: flex;
    align-items: center;

    .crumb {
      margin-left: 10px;

      :deep(.el-breadcrumb__inner.is-link) {
        font-weight: normal;
        cursor: pointer;

        &:hover {
          color: $base-color;
        }
      }

      .crumbActive :deep(.el-breadcrumb__inner.is-link) {
        font-weight: bold;
        cursor: auto;

        &:hover {
          color: black;
        }
      }
    }
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>