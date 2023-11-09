<script setup>
import {computed} from "vue"
import {useRouter} from "vue-router";
import {test} from "~/api/test.js"
import { storeToRefs } from 'pinia'
import {useTestStore} from "./pinia/useTestStore"

const router = useRouter()
const store = useTestStore()
// count是ref对象，直接复制或解构会失去响应式，可以使用计算属性computed，或storeToRefs
// const count = store.count  
// 方法一：computed
const count = computed(() => store.count )
const {increment} = store
// 方法二：storeToRefs
// const { count } = storeToRefs(store)

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

const testPiniaHandle = async () => {
  increment()
}

</script>

<template>
  <div>
    <el-row>
      <el-button @click="tabHandle1">test1</el-button>
      <el-button @click="tabHandle2">test2</el-button>
      <el-button @click="testRequestHandle">Request</el-button>
      <el-button @click="testPiniaHandle">pinia</el-button>
      <h1>count: {{ count }}</h1>
    </el-row>
  </div>
  <router-view></router-view>
</template>

<style scoped></style>
