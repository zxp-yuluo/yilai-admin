<script setup>
import { useRouter } from "vue-router"
import { useApp } from "~/pinia/modules/useApp"
import { storeToRefs } from 'pinia'


// -------------- 定义数据模型 --------------
const app = useApp()
const router = useRouter()
const { crumbList, delCrumb, setActiveMenu, activeMenu } = app


// -------------- 操作方法 --------------

// 点击 tag
const HandleClickTag = (tag) => {
  if (activeMenu.label == tag.label) return
  setActiveMenu({
    label: tag.label,
    path: tag.path,
  })
  localStorage.setItem("activeMenu", JSON.stringify({
    label: tag.label,
    path: tag.path,
  }))
  router.push(tag.path)
}

// 点击删除 tag
const handleClose = (path) => {
  // 删除操作后，路由跳转crumbList数组的最后一个组件页面，防止组件删除后，还在显示被删除的页面
  delCrumb(path)
  const length = crumbList.length
  router.push(crumbList[length - 1].path)
  setActiveMenu({
    label: crumbList[length - 1].label,
    path: crumbList[length - 1].path
  })
  localStorage.setItem("activeMenu", JSON.stringify({
    label: crumbList[length - 1].label,
    path: crumbList[length - 1].path
  }))
  localStorage.setItem("crumbList", JSON.stringify(crumbList.value))
}
</script>

<template>
  <div class="nav">
    <el-tag v-for="tag in crumbList" :key="tag.label" class="tag"
      :effect="activeMenu.label == tag.label ? 'dark' : 'light'" :closable="tag.path != '/admin'"
      :disable-transitions="false" @close="handleClose(tag.path)" @click="HandleClickTag(tag)">
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<style scoped lang="scss">
.nav {
  padding: 0 20px 20px 20px;
  background: #fff;

  .tag {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>