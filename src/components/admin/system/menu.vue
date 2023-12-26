<script setup>
import { ref, onMounted } from "vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  findMenu,
  addMenu,
  updateMenu,
  deleteMenu
} from "~/api/menu/menu"

// ---------- 钩子函数 ----------
onMounted(() => {
  fetchData()
})

//#region ---------- 获取菜单 ----------

// 列表数据
const menuList = ref([])



//#endregion



//#region ---------- 添加菜单 ----------

// 弹框的显示隐藏
const dialogVisible = ref(false)

// 弹框的显示隐藏
const dialogTitle = ref("添加")

// 添加/修改的表单数据
const menuForm = ref({
  id: '',
  parentId: 0,
  title: '',
  url: '',
  component: '',
  icon: '',
  sortValue: 1,
  status: 1,
})

// 点击添加按钮
const handleClickAdd = () => {
  // 一级添加
  dialogTitle.value = "添加"
  // 清空表单数据
  menuForm.value = {}
  // 点击添加，插入的数据都是第一层的数据
  menuForm.value.parentId = 0
  // 显示弹框
  dialogVisible.value = true
}

// 点击添加下级节点按钮
const handleClickAddNode = (row) => {
  // 子级添加
  dialogTitle.value = "添加下级"
  // 清空表单数据
  menuForm.value = {}
  // 把子节点的parentId设为父节点的id
  menuForm.value.parentId = row.id
  // 显示弹框
  dialogVisible.value = true
}

// 点击弹框的提交按钮
const handleClickSubmit = () => {
  const value = menuForm
  switch (dialogTitle.value) {
    case "添加":
      addData(value)
      break;
    case "修改":
      updateData(value)
      break;
    default:
      addData(value)
      break;
  }
}

//#endregion

//#region ---------- 修改菜单 ----------
const handelClickUpdate = (row) => {
  // 数据回显
  menuForm.value = row
  // 弹框标题修改
  dialogTitle.value = "修改"
  // 弹框
  dialogVisible.value = true
}


//#endregion

//#region ---------- 删除菜单 ----------
const handelClickDelete = (row) => {
  deleteData(row.id)
}

//#endregion 

//#region ---------- 请求方法 ----------
// 菜单列表请求
const fetchData = async (msg) => {
  const { code, data } = await findMenu();
  console.log(code, data);
  if (code == 200) {
    menuList.value = data
    msg ? ElMessage.success(msg) : ""
  }
}

// 菜单添加请求
const addData = async (data) => {
  const { code } = await addMenu(data);
  if (code == 200) {
    dialogVisible.value = false
    fetchData("添加成功！")
  }
}

// 菜单修改请求
const updateData = async (data) => {
  const { code } = await updateMenu(data);
  if (code == 200) {
    dialogVisible.value = false
    fetchData("修改成功！")
  }
}

// 菜单删除请求
const deleteData = async (id) => {
  ElMessageBox.confirm(
    '此操作将永久删除该记录，是否继续？',
    'Warning',
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  )
    .then(async () => {
      const { code, message } = await deleteMenu(id);
      if (code == 200) {
        fetchData("删除成功！")
      } else {
        ElMessage.error(message)
      }
    })
    .catch(() => {
    })

}

//#endregion 

</script>

<template>
  <div class='menu'>
    <!-- 添加按钮 -->
    <div class="addBtn">
      <el-button type="success" size="small" @click="handleClickAdd">添加</el-button>
    </div>

    <!-- 菜单表格 -->
    <el-card class="box-card">
      <el-table :data="menuList" max-height="450" style="width: 100%" row-key="id" border>
        <el-table-column prop="title" label="菜单标题" />
        <el-table-column prop="component" label="路由名称" />
        <el-table-column align="center" width="120px" prop="sortValue" label="排序" />
        <el-table-column align="center" width="120px" prop="status" label="状态" />
        <el-table-column align="center" width="180px" prop="createTime" label="创建时间" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="warning" size="small" @click="handleClickAddNode(scope.row)">
              添加下级节点
            </el-button>
            <el-button size="small" @click="handelClickUpdate(scope.row)">
              修改
            </el-button>
            <el-button type="danger" size="small" @click="handelClickDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 修改/添加菜单的弹框 -->
    <el-dialog v-model="dialogVisible" width="30%" :title="dialogTitle">
      <el-form :model="menuForm" label-width="120px">
        <el-form-item label="菜单标题">
          <el-input v-model="menuForm.title" />
        </el-form-item>
        <el-form-item label="路由名称">
          <el-input v-model="menuForm.component" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="menuForm.sortValue" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="menuForm.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleClickSubmit">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.menu {
  height: 100%;

  .addBtn {
    margin-bottom: 20px;
    padding: 15px 20px;
    background: #fff;
    border-radius: 4px;
    box-shadow: var(--el-box-shadow);
  }
}
</style>