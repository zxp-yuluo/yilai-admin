<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus';
import { GetOrderStatisticsData } from "~/api/order/orderInfo"

const searchObj = ref({
  createTimeBegin: '',
  createTimeEnd: '',
})

const createTimes = ref([])

const show = ref([])

onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  if (createTimes.value.length == 2) {
    searchObj.value.createTimeBegin = createTimes.value[0]
    searchObj.value.createTimeEnd = createTimes.value[1]
  }
  const { code, data, message } = await GetOrderStatisticsData(searchObj.value)
  if (code == 200) {
    console.log(data);
    show.value = data
  } else {
    ElMessage.error(message)
  }
}
</script>

<template>
  <div class="search-div">
    <el-form label-width="90px" size="small">
      <el-row>
        <el-col :span="22">
          <el-form-item label="订单日期">
            <el-date-picker v-model="createTimes" type="daterange" range-separator="To" start-placeholder="开始日期"
              end-placeholder="截止日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="1">
          <el-button type="primary" size="small" @click="fetchData()">
            搜索
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <div>
    {{ show }}
  </div>
</template>

<style scoped>
.search-div {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}
</style>