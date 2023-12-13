<script setup>
import CommonAside from '../components/common/aside/aside.vue'
import CommonHeader from '../components/common/header/header.vue'
import CommonNav from "../components/common/nav/nav.vue"
import Main from '../components/admin/main.vue';
import { useApp } from "~/pinia/modules/useApp"
import { storeToRefs } from 'pinia'
const { sidebar } = storeToRefs(useApp())
</script>

<template>
  <el-container class="common-layout">
    <el-aside :width="sidebar ? 'auto' : '200px'" class="aside">
      <common-aside />
    </el-aside>
    <el-container>
      <el-header class="header">
        <common-header />
      </el-header>
      <common-nav />
      <el-main class="main">
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.common-layout {
  height: 100%;
  width: 100%;

  .header {
    background: #fff;
  }
}
</style>