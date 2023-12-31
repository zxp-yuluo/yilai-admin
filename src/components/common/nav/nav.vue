<script setup>
import { useRouter, useRoute } from "vue-router"
import { useApp } from "~/pinia/modules/useApp"
import { storeToRefs } from 'pinia'


// -------------- 定义数据模型 --------------
const app = useApp()
const router = useRouter()
const route = useRoute()
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
const handleClose = (tag) => {
  const { path } = tag
  // 判断点的是否是最后一个
  const length = crumbList.length - 1
  const index = crumbList.findIndex(item => item.label == tag.label)
  if (length == index) {
    // 删除操作后，路由跳转crumbList数组的最后一个组件页面，防止组件删除后，还在显示被删除的页面
    delCrumb(path)
    // 删除列表后的长度
    const length = crumbList.length - 1
    router.push(crumbList[length].path)
    setActiveMenu({
      label: crumbList[length].label,
      path: crumbList[length].path
    })
    localStorage.setItem("activeMenu", JSON.stringify({
      label: crumbList[length].label,
      path: crumbList[length].path
    }))
    localStorage.setItem("crumbList", JSON.stringify(crumbList))
  } else {
    delCrumb(path)
    localStorage.setItem("crumbList", JSON.stringify(crumbList))
  }
}
</script>

<template>
  <div class="nav">
    <el-tag v-for="tag in crumbList" :key="tag.label" class="tag"
      :effect="activeMenu.label == tag.label ? 'dark' : 'light'" :closable="tag.path != '/admin/home'"
      :disable-transitions="false" @close="handleClose(tag)" @click="HandleClickTag(tag)">
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