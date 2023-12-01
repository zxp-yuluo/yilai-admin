<script setup>
import { useRouter } from "vue-router"
import { useApp } from "@/pinia/modules/useApp"
import { computed } from "vue"

const app = useApp()
const crumbList = app.app.crumbList
const { delCrumb, setActiveMenu } = app
const router = useRouter()
const activeMenu = computed(() => app.app.activeMenu)

const HandleClickTag = (tag) => {
  router.push(tag.path)
  setActiveMenu(tag.lable)
}
const handleClose = (path) => {
  if (path == '/home') return
  delCrumb(path)
  // 删除操作后，路由跳转crumbList数组的最后一个组件页面，防止组件删除后，还在显示被删除的页面
  const length = crumbList.length
  router.push(crumbList[length - 1].path)
  setActiveMenu(crumbList[length - 1].lable)
}
</script>

<template>
  <div class="tagWarp">
    <el-tag v-for="tag in crumbList" :key="tag.lable" class="tag" :effect="activeMenu == tag.lable ? 'dark' : 'light'"
      :closable="tag.path != '/home'" :disable-transitions="false" @close="handleClose(tag.path)"
      @click="HandleClickTag(tag)">
      {{ tag.lable }}
    </el-tag>
  </div>
</template>

<style scoped>
.tagWarp {
  padding: 20px 0 0 20px;
  display: flex;
}
.tag {
  margin-right: 10px;
  cursor: pointer;
}
</style>