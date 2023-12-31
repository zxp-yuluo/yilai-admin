<script setup>
import { ref, onMounted } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { getCategoryList, exportCategoryData } from "~/api/category/category"
import {useApp} from "../../../pinia/modules/useApp"
import { storeToRefs } from "pinia";

// 构造函数
onMounted(() => {
  fetchData()
})

// 点击导出按钮
const exportDate = async () => {
  const result = await exportCategoryData()
  // 创建 Blob 对象，用于包含二进制数据
  const blob = new Blob([result]);
  // 创建 a 标签元素，并将 Blob 对象转换成 URL
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  // 设置下载文件的名称
  link.download = '分类数据.xlsx';
  // 模拟点击下载链接
  link.click();
}

//#region 导入

// 控制弹框是否显示
const dialogImportVisible = ref(false)
// 从pinia中获取token，在进行文件上传的时候将token设置到请求头中
const { token } = storeToRefs(useApp())
const headers = {
  token: token.value     
}

// 上传文件成功以后要执行方法
const onUploadSuccess = async (response, file) => {
  ElMessage.success('操作成功')
  dialogImportVisible.value = false
  fetchData()
}

// // 点击导入按钮
const importDate = async () => {
  dialogImportVisible.value = true
}

//#endregion

//#region 表格相关
// 分类的父级id，第一层默认为0
const parentId = ref(0)
// 表格数据
const tableList = ref([])

// 获取表格列表数据请求
const fetchData = async (row, treeNode, resolve) => {
  if (row) {
    parentId.value = row.id
  }
  const { code, data, message } = await getCategoryList(parentId.value);
  if (code == 200) {
    row ? resolve(data) : tableList.value = data
  } else {
    ElMessage.success(message)
  }


  // 不为空代表，点击了加载子级数据
  // if (row) {
  //   parentId.value = row.id
  //   const { code, data, message } = await getCategoryList(parentId.value);
  //   if(code == 200) {
  //     resolve(data)
  //   } else {
  //     ElMessage.success(message)
  //   }
  // } else {
  //   // 页面加载，请求第一层数据
  //   const { code, data, message } = await getCategoryList(parentId.value);
  //   if (code == 200) {
  //     tableList.value = data
  //   } else {
  //     ElMessage.success(message)
  //   }
  // }
}
//#endregion

</script>

<template>
  <div class="tools-div">
    <el-button type="success" size="small" @click="exportDate">导出</el-button>
    <el-button type="primary" size="small" @click="importDate">导入</el-button>
  </div>
  <!---懒加载的树形表格-->
  <el-table height="500" :data="tableList" row-key="id" border lazy :load="fetchData"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
    <el-table-column prop="name" label="分类名称" />
    <el-table-column prop="imageUrl" label="图标">
      <template #default="scope">
        <img :src="scope.row.imageUrl" width="50" />
      </template>
    </el-table-column>
    <el-table-column prop="orderNum" label="排序" />
    <el-table-column prop="status" label="状态" #default="scope">
      {{ scope.row.status == 1 ? '正常' : '停用' }}
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" />
  </el-table>

  <!-- 导入弹框 -->
  <el-dialog v-model="dialogImportVisible" title="导入" width="30%">
    <el-form label-width="120px">
      <el-form-item label="分类文件">
        <el-upload
          class="upload-demo"
          action="http://localhost:5173/api/admin/product/category/importData"
          :on-success="onUploadSuccess"
          :headers="headers"
        >
          <el-button type="primary">上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>
.tools-div {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}

.search-div {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}
</style>