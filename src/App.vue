<script setup>
import {useRouter} from "vue-router";
import {test} from "~/api/test.js"
const router = useRouter()

const tabHandle1 = () => {
  router.push({ path: '/test1' })
}
const tabHandle2 = () => {
  router.push({ path: '/test2' })
}

const testRequestHandle = async () => {
  const result = await test()
  console.log(result);
}
</script>

<template>
  <div>
    <el-row>
      <el-button @click="tabHandle1">test1</el-button>
      <el-button @click="tabHandle2">test2</el-button>
      <el-button @click="testRequestHandle">Request</el-button>
    </el-row>
  </div>
  <router-view></router-view>
</template>

<style scoped></style>
