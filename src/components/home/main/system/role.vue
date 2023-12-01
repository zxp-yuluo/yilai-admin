<script setup>
import { ref } from 'vue'

// 搜索内容
const keyword = ref("")
// 是否显示弹框
const isVisible = ref(false)
const currentPage4 = ref(4)
const pageSize4 = ref(100)

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }
]

// 点击搜索
const searchSysRole = () => {

}
// 点击重置
const resetData = () => {
  keyword.value = ""
}

// 显示/隐藏弹框
const dialogVisible = () => {
  console.log(isVisible.value);
  isVisible.value = !isVisible.value
}

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}

</script>

<template>
  <el-card class="box-card">
    <el-form label-width="70px" size="small">
      <el-form-item label="角色名称">
        <el-input v-model="keyword" style="width: 100%" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-row style="display:flex">
        <el-button type="primary" size="small" @click="searchSysRole">
          搜索
        </el-button>
        <el-button size="small" @click="resetData">重置</el-button>
      </el-row>
    </el-form>
    <el-button @click="dialogVisible" size="small">
      添加
    </el-button>

    <el-dialog v-model="isVisible" title="Tips" width="30%">
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
    <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[100, 200, 300, 400]"
      small layout="total, sizes, prev, pager, next, jumper"
      :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </el-card>
</template>

<style scoped>
.el-card {
  max-height: 100%;
}
</style>