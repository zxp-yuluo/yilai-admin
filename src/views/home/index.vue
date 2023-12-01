<script setup>
import CommonMenu from "@/components/home/menu/commonMenu.vue"
import CommonHeader from "@/components/home/header/commonHeader.vue"
import CommonNav from "@/components/home/nav/commonNav.vue"
import {useApp} from "../../pinia/modules/useApp"
import {computed} from "vue"

const app = useApp()
const {sidebar} = app.app

const width = computed(() => sidebar.isCollapse ? "auto":"200px")

</script>

<template>
  <div class="common-layout">
    <el-container class="container">
      <el-aside :width="width" class="aside">
        <CommonMenu />
      </el-aside>
      <el-container>
        <el-header class="header">
          <CommonHeader />
        </el-header>
        <CommonNav />
        <el-main class="main">
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  height: 100%;
}
.container {
  height: 100%;
}

.header {
  background: #fff;
}
</style>