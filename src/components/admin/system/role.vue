<script setup>
import { ref, reactive, onMounted } from 'vue'
import { keywordSearch, addRole, updateRole, deleteRole, getRoleMenuIds, assignRoleMenu } from "~/api/role/role"
import { ElMessage, ElMessageBox } from 'element-plus'

// ----------------- 定义数据模型 -----------------
// 角色列表
const roleList = ref([])
// 总记录数
const total = ref(0)
// 分页数据
const pageParams = reactive({
  page: 1,  // 当前页
  limit: 6  // 每页记录数
})
// 搜索内容
const keyword = reactive({
  roleName: ""
})
// 是否显示添加角色的弹框
const dialogVisible = ref(false)

// form表单数据
const sysRole = reactive({
  roleName: "",
  roleCode: "",
  description: ""
})

// 新增/修改
const operate = ref("add")

// ----------------- 钩子函数 -----------------
onMounted(() => {
  keywordSearchRequest()
})


// ----------------- 操作方法 -----------------

// 点击搜索
const searchSysRole = () => {
  keywordSearchRequest()
}

// 获取列表请求
const keywordSearchRequest = async () => {
  const { code, data } = await keywordSearch(pageParams.page, pageParams.limit, keyword)
  if (code == 200) {
    roleList.value = data.list
    total.value = data.total
  }
}

// 点击重置
const resetData = () => {
  keyword.roleName = ""
  keywordSearchRequest()
}

// 点击页码
const handleCurrentChange = () => {
  keywordSearchRequest()
}

// 点击添加，显示弹框
const addShow = () => {
  sysRole.roleName = ""
  sysRole.roleCode = ""
  sysRole.description = ""
  sysRole.id = ""
  operate.value = 'add'
  dialogVisible.value = true
}
// 点击提交
const handleAddRole = async () => {
  let result;
  // 判断是修改还是添加操作
  if (operate.value == 'add') {
    result = await addRole(sysRole)
  } else if (operate.value == 'update') {
    result = await updateRole(sysRole)
  }
  const { code, message } = result
  if (code == 200) {
    // 关闭弹框
    dialogVisible.value = false
    // 提示信息
    ElMessage.success(operate.value == 'add' ? "添加成功！" : "修改成功")
    pageParams.page = 1
    // 刷新页面
    keywordSearchRequest()
  } else {
    ElMessage.error(message)
  }
}

// 点击修改按钮
const handleClickUpdateRole = async item => {
  sysRole.id = item.id
  sysRole.roleName = item.roleName
  sysRole.roleCode = item.roleCode
  sysRole.description = item.description
  operate.value = 'update'
  dialogVisible.value = true
}

// 点击删除按钮 
const handleClickDeleteRole = async id => {
  console.log(id);
  ElMessageBox.confirm(
    "此操作将永久删除该记录，是否继续？",
    "warning",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  ).then(async () => {
    const { code } = await deleteRole(id)
    if (code == 200) {
      // 提示信息
      ElMessage.success("删除成功！")
      // 刷新页面
      keywordSearchRequest()
    } else {
      ElMessage.error("删除失败！")
    }
  }).catch(() => {
    ElMessage.error("删除失败！")
  })
}
// ---------------- 分配菜单 ---------------- 
// 被分配的角色id
const roleId = ref() 
const treeRef = ref()
// 是否显示分配菜单的弹框
const dialogAssign = ref(false)
const props = {
  label: 'title',
  children: 'children',
}
const roleMenu = ref([])
// 点击分配菜单
const handleClickAssignMenu = (row) => {
  roleMenuData(row.id)
  roleId.value = row.id
  dialogAssign.value = true
}
// 点击分配菜单弹框的提交
const handleAssignMenu = () => {
  const checkedNodes = treeRef.value.getCheckedNodes(); // 获取选中的节点
  const checkedNodesIds = checkedNodes.map(node => {  // 获取选中的节点的id
    return {
      id: node.id,
      isHalf: 0
    }
  })

  // 获取半选中的节点数据，当一个节点的子节点被部分选中时，该节点会呈现出半选中的状态
  const halfCheckedNodes = treeRef.value.getHalfCheckedNodes();
  const halfCheckedNodesIds = halfCheckedNodes.map(node => {   // 获取半选中节点的id
    return {
      id: node.id,
      isHalf: 1
    }
  })
  // 将选中的节点id和半选中的节点的id进行合并
  const menuIds = [...checkedNodesIds, ...halfCheckedNodesIds]
  console.log(menuIds);
  // 构建请求数据
  const assignMenuDto = {
    roleId: roleId.value,
    menuIdList: menuIds
  }

  // 发送请求
  assignRoleMenuData(assignMenuDto) ;
  dialogAssign.value = false
}

// 角色菜单请求
const roleMenuData = async id => {
  const { code, data } = await getRoleMenuIds(id)
  console.log(code, data);
  if (code == 200) {
    roleMenu.value = data.menuList
    // 数据回显
    treeRef.value.setCheckedKeys(data.roleMenuIds)
  }
}

// 给角色分配菜单请求
const assignRoleMenuData = async data => {
  const { code } = await assignRoleMenu(data)
  if (code == 200) {
    dialogAssign.value = false
    ElMessage.success("分配成功！")
    keywordSearchRequest()
  }
}
</script>

<template>
  <el-card class="box-card">
    <!-- 关键字搜索 -->
    <el-form label-width="70px" size="small">
      <el-form-item label="角色名称">
        <el-input v-model="keyword.roleName" style="width: 100%" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-row style="display:flex">
        <el-button type="primary" size="small" @click="searchSysRole">
          搜索
        </el-button>
        <el-button size="small" @click="resetData">重置</el-button>
      </el-row>
    </el-form>
    <div class="add-role-warp">
      <!-- 添加角色 -->
      <div class="add-role-btn">
        <el-button @click="addShow" size="small">添加</el-button>
      </div>
      <!-- 表单 -->
      <el-table border :data="roleList" style="width: 100%">
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="roleCode" label="角色" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="修改时间" />
        <el-table-column prop="" label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleClickUpdateRole(scope.row)">修改</el-button>
            <el-button type="danger" @click="handleClickDeleteRole(scope.row.id)" size="small">删除</el-button>
            <el-button type="warning" @click="handleClickAssignMenu(scope.row)" size="small">分配菜单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination class="pagination" v-model:current-page="pageParams.page" v-model:page-size="pageParams.limit" small
        layout="total, prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange" />

      <!-- 添加/修改角色弹框 -->
      <el-dialog v-model="dialogVisible" title="添加或修改角色" width="30%">
        <el-form label-width="120px">
          <el-form-item label="角色名称">
            <el-input v-model="sysRole.roleName" />
          </el-form-item>
          <el-form-item label="角色Code">
            <el-input v-model="sysRole.roleCode" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAddRole">提交</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 分配菜单弹框 -->
      <el-dialog v-model="dialogAssign" title="分配菜单" width="30%">
        <el-tree ref="treeRef" :data="roleMenu" :check-on-click-node="true" :props="props" default-expand-all node-key="id" show-checkbox :height="208" />
        <div class="btns">
          <el-button size="small" type="primary" @click="handleAssignMenu">提交</el-button>
          <el-button size="small" @click="dialogAssign = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<style scoped>
.el-card {
  max-height: 100%;
}

.add-role-warp {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.add-role-btn {
  margin: 20px 0;
}

.pagination {
  margin-top: 20px;
}

.btns {
  margin-top: 20px;
}
</style>