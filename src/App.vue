<script setup>
import {useRouter} from "vue-router";
const router = useRouter()
console.log(router);

const tabHandle1 = () => {
  router.push({ path: '/test1' })
}
const tabHandle2 = () => {
  router.push({ path: '/test2' })
}
</script>

<template>
  <div>
    <el-row>
      <el-button @click="tabHandle1">test1</el-button>
      <el-button @click="tabHandle2">test2</el-button>
    </el-row>
  </div>
  <router-view></router-view>
</template>

<style scoped></style>
