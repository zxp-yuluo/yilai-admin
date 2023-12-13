<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { 
  getUserListByPage,
  addUser,
  updateUser,
  deleteUser,
  assign
} from "~/api/user/user"
import { getRole } from "~/api/role/role"
import { ElMessage, ElMessageBox } from 'element-plus'
import { useApp } from '~/pinia/modules/useApp'

// ------------- 分配角色 -------------
const dialogAllocationRoleVisible = ref(false)
const userRoleIds = ref([])
const allRoles = ref([
  { "id": 1, "roleName": "管理员" },
  { "id": 2, "roleName": "业务人员" },
  { "id": 3, "roleName": "商品录入员" },
])

// 点击分配
const handleClickAllocation = async (row) => {
  console.log("点击分配");
  user.value = {...row}
  const {code,data} = await getRole(row.id)
  if(code == 200) {
    allRoles.value = data.allRolesList
    userRoleIds.value = data.userRoles
  }
  dialogAllocationRoleVisible.value = true
}

// 点击分配角色的提交
const handleClickAssignSubmit = async () => {
  let tempObj = {
    userId: user.value.id,
    roleIdList: userRoleIds.value
  }
  const {code,data} = await assign(tempObj)
  console.log(code,data);
  if(code == 200) {
    // 取消弹框
    dialogAllocationRoleVisible.value = false
    // 提示消息
    ElMessage.success("分配成功！")
    // 重新请求数据
    fetchData()
  }
}


//#region  ------------- 上传所用到的数据 -------------
// 请求的headers中设置token
const headers = {
  token: useApp().token
}

// 上传成功后的事件处理函数
const handleAvatarSuccess = (response, uploadFile) => {
  user.value.avatar = response.data
}
//#endregion

// ------------- 钩子函数 -------------
onMounted(() => {
  // 数据请求
  fetchData()
})

//#region ------------- 关键字搜索 -------------
// 创建时间
const createTime = ref([])
// 点击搜索
const handleClickSearch = () => {
  fetchData()
  console.log("------ 点击搜索 ------");
}
// 点击重置
const handleClickReset = () => {
  console.log("------ 点击重置 ------");
}
//#endregion

//#region ------------- 表格 -------------
const queryDto = reactive({
  keyword: '',
  createTimeBegin: '',
  createTimeEnd: ''
})
// 用户列表
const userList = ref([])
// 表格数据请求
const fetchData = async () => {
  if (createTime.value.length == 2) {
    queryDto.createTimeBegin = createTime.value[0]
    queryDto.createTimeEnd = createTime.value[1]
  }
  const { code, data } = await getUserListByPage(pageParams.page, pageParams.limit, queryDto)
  if (code == 200) {
    userList.value = data.list
    total.value = data.total
  }
}
// 点击修改
const handleClickUpdate = (row) => {
  user.value = { ...row }
  dialogVisible.value = true
  console.log("点击修改", row);
}
// 点击删除
const handleClickDelete = (id) => {
  ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const { code } = await deleteUser(id)
    if (code == 200) {
      // 提示信息
      ElMessage.success("删除成功！")
      // 请求数据
      fetchData()
    }
  }).catch(() => {
    ElMessage.error("删除失败！")
  })

  console.log("点击删除", id);
}
//#endregion

//#region ------------- 分页 -------------

// 总记录数
const total = ref(12)
// 分页数据
const pageParams = reactive({
  page: 1,  // 当前页
  limit: 2  // 每页记录数
})
// 点击页码
const handleCurrentChange = (val) => {
  fetchData()
}

//#endregion

//#region ------------- 用户的添加/修改/删除 -------------
// 
// 控制弹框的显示/隐藏
const dialogVisible = ref(false)
// 用户信息
const user = ref({
  userName: "",
  name: "",
  phone: "",
  password: "",
  description: "",
  avatar: ""
})

// 点击添加
const handleClickAdd = () => {
  user.value = {}
  dialogVisible.value = true
}

// 点击提交
const handleClickSubmit = async () => {
  let result
  // 没有id是添加操作，有id是修改操作
  if (user.value.id) {
    result = await updateUser(user.value)
  } else {
    result = await addUser(user.value)
  }
  let { code, message } = result
  if (code == 200) {
    // 关闭弹框
    dialogVisible.value = false
    // 提示信息
    ElMessage.success(user.value.id ? "修改成功！" : "添加成功！")
    // 请求数据
    fetchData();
  } else {
    ElMessage.error(message)
  }
  console.log("---------------- 点击提交 ----------------");
}
//#endregion

</script>

<template>
  <!-- 关键字搜索 -->
  <el-form class="search-div" label-width="70px" size="small">
    <el-row>
      <el-col :span="12">
        <el-form-item label="关键字">
          <el-input v-model="queryDto.keyword" style="width: 100%" placeholder="角色名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="创建时间">
          <el-date-picker v-model="createTime" type="daterange" range-separator="-" start-placeholder="开始时间"
            end-placeholder="结束时间" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row style="display:flex">
      <el-button type="primary" size="small" @click="handleClickSearch">
        搜索
      </el-button>
      <el-button size="small" @click="handleClickReset">重置</el-button>
    </el-row>
  </el-form>

  <div class="tools-div">
    <el-button type="success" size="small" @click="handleClickAdd">添 加</el-button>
  </div>
  <el-card class="box-card">
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="phone" label="手机" />
      <el-table-column prop="avatar" label="头像" #default="scope">
        <img :src="scope.row.avatar" width="50" />
      </el-table-column>
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="status" label="状态" #default="scope">
        {{ scope.row.status == 1 ? '正常' : '停用' }}
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" align="center" width="280">
        <template #default="scope">
          <el-button size="small" @click="handleClickUpdate(scope.row)">
            修改
          </el-button>
          <el-button type="danger" @click="handleClickDelete(scope.row.id)" size="small">
            删除
          </el-button>
          <el-button type="warning" @click="handleClickAllocation(scope.row)" size="small">
            分配角色
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination class="pagination" v-model:current-page="pageParams.page" v-model:page-size="pageParams.limit" small
      layout="total, prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange" />
  </el-card>
  <!-- 添加/修改用户弹框 -->
  <el-dialog v-model="dialogVisible" title="添加或修改" width="30%">
    <el-form label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="user.userName" />
      </el-form-item>
      <el-form-item label="密　码">
        <el-input type="password" v-model="user.password" />
      </el-form-item>
      <el-form-item label="姓　名">
        <el-input v-model="user.name" />
      </el-form-item>
      <el-form-item label="手　机">
        <el-input v-model="user.phone" />
      </el-form-item>
      <el-form-item label="头　像">
        <el-upload class="avatar-uploader" action="http://localhost:1992/admin/system/fileUpload" :show-file-list="false"
          :on-success="handleAvatarSuccess" :headers="headers">
          <img v-if="user.avatar" :src="user.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="描　述">
        <el-input v-model="user.description" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleClickSubmit">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!--分配角色的弹框--->
  <el-dialog v-model="dialogAllocationRoleVisible" title="分配角色">
    <el-form-item label="用户名">
      <el-input disabled :value="user.userName"></el-input>
    </el-form-item>

    <el-form-item label="角色列表">
      <el-checkbox-group v-model="userRoleIds">
        <el-checkbox v-for="role in allRoles" :key="role.id" :label="role.id">
          {{ role.roleName }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleClickAssignSubmit">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-dialog>
</template>

<style scoped lang="scss">
.search-div {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}

.tools-div {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}

.pagination {
  margin-top: 20px;
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