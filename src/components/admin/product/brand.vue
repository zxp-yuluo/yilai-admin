<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getBrandList, addBrand, deleteBrand, updateBrand } from "~/api/brand/brand"
import { ElMessage, ElMessageBox } from "element-plus"
import { useApp } from "../../../pinia/modules/useApp"
import { Plus } from '@element-plus/icons-vue'

onMounted(() => {
  fetchData()
})

// 点击删除按钮
const handleClickDelete = (row) => {
  ElMessageBox.confirm(
    '此操作将永久删除该记录，是否继续？',
    '警告',
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  ).then(async () => {
    const { code, message } = await deleteBrand(row.id);
    if (code == 200) {
      fetchData("删除成功！")
    } else {
      ElMessage.error(message)
    }
  })
    .catch(() => {
      ElMessage.error(message)
    })
}

//#region 品牌添加/修改

// 控制添加/修改弹框显示
const dialogVisible = ref(false)

// 添加/修改的判断标志,0：添加，1：修改
const operate = ref(0)

// 设置图片上传时herder中的token
const headers = {
  token: useApp().token
}

// form表单
const dialogForm = reactive({
  name: "",
  logo: ""
})

// 点击添加按钮
const handleClickAdd = () => {
  // 标志修改为添加
  operate.value = 0
  // 显示弹框
  dialogVisible.value = true
  // 清楚form数据
  dialogForm.logo = ""
  dialogForm.name = ""
}

// 点击修改按钮
const handleClickUpdate = (row) => {
  // 标志修改为修改
  operate.value = 1
  // 显示弹框
  dialogVisible.value = true
  // 数据回显
  dialogForm.name = row.name
  dialogForm.logo = row.logo
  dialogForm.id = row.id
}

// 图片上传成功的回调
const handleAvatarSuccess = (response) => {
  if (response.code == 200) {
    dialogForm.logo = response.data
    ElMessage.success("上传成功！")
  } else {
    ElMessage.error(response.message)
  }
}

// 点击弹框提交按钮
const handleClickSubmit = async () => {
  let code, message
  switch (operate.value) {
    // 添加操作
    case 0:
      ({ code, message } = await addBrand(dialogForm))
      break;
    // 修改操作
    case 1:
      ({ code, message } = await updateBrand(dialogForm))
      break;
  }
  if (code == 200) {
    // 关闭弹框
    dialogVisible.value = false
    // 重新请求数据
    operate.value == 0 ? fetchData("添加成功！") : fetchData("修改成功！")
  } else {
    ElMessage.error(message)
  }
}

//#endregion

//#region 表格数据
// 品牌列表
const tableList = ref([])

// 品牌列表请求
const fetchData = async (tip) => {
  const { code, data, message } = await getBrandList(pageParams.page, pageParams.limit)
  if (code == 200) {
    total.value = data.total
    tableList.value = data.list
    tip ? ElMessage.success(tip) : ""
  } else {
    ElMessage.error(message);
  }
}
//#endregion

//#region 分页数据

// 分页条数据模型
const total = ref(0)

// 分页数据
const pageParams = reactive({
  page: 1,  // 当前页
  limit: 10  // 每页记录数
})

// 手动改变每页显示数据个数
const handleSizeChange = (limit) => {
  pageParams.limit = limit
}

// 当前页改变
const handleCurrentChange = (page) => {
  pageParams.page = page
}
//#endregion

</script>


<template>
  <!-- 添加按钮 -->
  <div class="tools-div">
    <el-button type="success" size="small" @click="handleClickAdd">添 加</el-button>
  </div>

  <!-- 品牌列表表格 -->
  <el-table max-height="450" :data="tableList" style="width: 100%">
    <el-table-column prop="name" label="品牌名称" />
    <el-table-column prop="logo" label="品牌图标" #default="scope">
      <img :src="scope.row.logo" width="50" />
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column label="操作" align="center" width="200">
      <template #default="scope">
        <el-button type="primary" size="small" @click="handleClickUpdate(scope.row)">
          修改
        </el-button>
        <el-button type="danger" size="small" @click="handleClickDelete(scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination small style="margin-top: 10px" v-model:current-page="pageParams.page"
    v-model:page-size="pageParams.limit" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper"
    :total=total @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  <!-- 添加/修改弹框 -->
  <el-dialog v-model="dialogVisible" title="添加/修改" width="30%">
    <el-form label-width="120px">
      <el-form-item label="品牌名称">
        <el-input v-model="dialogForm.name" />
      </el-form-item>
      <el-form-item label="品牌图标">
        <el-upload class="avatar-uploader" action="http://localhost:1992/admin/system/fileUpload" :show-file-list="false"
          :on-success="handleAvatarSuccess" :headers="headers">
          <img v-if="dialogForm.logo" :src="dialogForm.logo" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleClickSubmit">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="scss">
.tools-div {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}

:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;

}

.avatar {
  width: 100px;
  height: 100px;
}
</style>