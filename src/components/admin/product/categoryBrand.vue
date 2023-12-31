<script setup>
import { ref, reactive, onMounted } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { getCategoryBrandList, addCategoryBrandList, updateCategoryBrandList, deleteCategoryBrandList } from "~/api/categoryBrand/categoryBrand"
import { getAllBrandList } from "~/api/brand/brand"
import { getCategoryList } from "~/api/category/category"

onMounted(() => {
  fetchData()
  getAllBrandListData()
})

//#region 请求数据

// 分类品牌数据分页请求 
const fetchData = async (tip) => {
  const { code, data, message } = await getCategoryBrandList(pageParams.page, pageParams.limit, categoryBrand)
  if (code == 200) {
    list.value = data.list
    total.value = data.total
    tip ? ElMessage.success(tip) : ""
  } else {
    ElMessage.error(message)
  }
}

// 获取所有品牌数据的请求
const getAllBrandListData = async () => {
  const { code, data, message } = await getAllBrandList()
  if (code == 200) {
    brandList.value = data
  } else {
    ElMessage.error(message)
  }
}

// 删除分类品牌
const deleteCategoryBrandListData = async (id) => {
  const { code, message } = await deleteCategoryBrandList(id)
  if (code == 200) {
    ElMessage.success("删除成功！")
    fetchData()
  } else {
    ElMessage.error(message)
  }
}

//#endregion

//#region 搜索相关

// 品牌列表数据
const brandList = ref([])

// cascader对象
const cascader = ref()

// 选择的分类品牌
const categoryBrand = reactive({
  brandId: "",
  categoryId: ""
})

// cascader配置选项
const props = {
  value: "id",
  label: "name",
  leaf: 'leaf',
  lazy: true,
  async lazyLoad(node, resolve) {
    if (typeof node.value == 'undefined') {
      node.value = 0
    }
    const { data } = await getCategoryList(node.value)
    data.forEach((item) => {       //hasChildren判断是否有子节点
      item.leaf = !item.hasChildren
    })
    resolve(data)
  },
}

// 分类列表数据
const categoryProps = ref(props)

// 选择分类改变
const handleChange = (value) => {
  if (Array.isArray(value) && value.length > 0) {
    categoryBrand.categoryId = value[value.length - 1]
  }
}
// 点击搜索
const handleClickSearch = () => {
  fetchData()
}

// 点击重置
const handleClickReset = () => {
  categoryBrand.brandId = ""
  categoryBrand.categoryId = ""
  cascader.value.cascaderPanelRef.clearCheckedNodes()
  fetchData()
}

//#endregion

//#region 表格相关

// 列表数据
const list = ref([])

// 点击修改
const handleClickUpdate = (row) => {
  dialogForm.id = row.id
  dialogForm.brandId = row.brandId
  dialogForm.categoryId = row.categoryId
  dialogVisible.value = true
}
// 点击删除
const handleClickDelete = (row) => {
  ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteCategoryBrandListData(row.id)
    fetchData()
  }).catch(() => {
    ElMessage.error("删除失败！")
  })
}

//#endregion

//#region 分页相关
// 总记录数
const total = ref(0)

// 分页数据
const pageParams = reactive({
  page: 1,  // 当前页
  limit: 10  // 每页记录数
})

// 每页记录数改变
const handleSizeChange = (limit) => {
  pageParams.limit = limit
}

// 手动改变当前页
const handleCurrentChange = (size) => {
  pageParams.size = size
}

//#endregion

//#region 添加/修改

const formCascader = ref()

// 控制弹框显示
const dialogVisible = ref(false)

// 
const dialogForm = reactive({
  brandId: "",
  categoryId: ""
})

// 点击添加按钮显示弹框
const handleClickAdd = () => {
  dialogVisible.value = true
  dialogForm.brandId = ""
  dialogForm.categoryId = ""
  dialogForm.id = ""
}

// 选择分类改变
const handleChangeFormCascader = (value) => {
  if (Array.isArray(value) && value.length > 0) {
    dialogForm.categoryId = value[value.length - 1]
  }
}

// 关闭弹框
const handleClose = () => {
  dialogVisible.value = false
  formCascader.value.cascaderPanelRef.clearCheckedNodes()
}

// 点击取消
const handleClickEsc = () => {
  handleClose()
}

// 点击提交按钮
const handleClickSubmit = async () => {
  let code, message
  if (!dialogForm.brandId) {
    ElMessage.warning("请选择品牌")
    return
  }
  if (!dialogForm.categoryId) {
    ElMessage.warning("请选择分类")
    return
  }
  // 判断是否有id，没有为添加，有为修改
  if (!dialogForm.id) {
    ({ code, message } = await addCategoryBrandList(dialogForm))
  } else {
    ({ code, message } = await updateCategoryBrandList(dialogForm))
  }
  if (code == 200) {
    fetchData()
    dialogForm.id ? ElMessage.success("修改成功！") : ElMessage.success("添加成功！")
    dialogVisible.value = false
    formCascader.value.cascaderPanelRef.clearCheckedNodes()
  } else {
    ElMessage.error(message)
  }
}

//#endregion

</script>

<template>
  <!-- 搜索 -->
  <div class="search-div">
    <el-form size="small">
      <el-row class="selectAttributeWarp">
        <el-col :span="12" class="selectAttribute" style="padding-right: 10px;">
          <el-form-item label="品牌">
            <el-select placeholder="选择品牌" style="width: 100%" v-model="categoryBrand.brandId">
              <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="selectAttribute" style="padding-left: 10px;">
          <el-form-item label="分类">
            <el-cascader ref="cascader" :props="categoryProps" @change="handleChange" :show-all-levels="false"
              style="width: 100%" />
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
  </div>

  <!-- 添加 -->
  <div class="add">
    <el-button size="small" @click="handleClickAdd">添加</el-button>
  </div>

  <!-- 表格 -->
  <el-table max-height="360" :data="list" style="width: 100%">
    <el-table-column prop="categoryName" label="分类" />
    <el-table-column prop="brandName" label="品牌" />
    <el-table-column prop="logo" label="品牌图标" #default="scope">
      <img :src="scope.row.logo" width="50" />
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column label="操作" align="center" width="200" #default="scope">
      <el-button type="primary" size="small" @click="handleClickUpdate(scope.row)">
        修改
      </el-button>
      <el-button type="danger" size="small" @click="handleClickDelete(scope.row)">
        删除
      </el-button>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-pagination style="margin-top: 10px;" v-model:current-page="pageParams.page" v-model:page-size="pageParams.limit"
    :page-sizes="[10, 20, 30, 40]" small layout="total, sizes, prev, pager, next, jumper" :total=total
    @size-change="handleSizeChange" @current-change="handleCurrentChange" />

  <!-- 添加/修改 -->
  <el-dialog class="addUpdate" v-model="dialogVisible" title="添加/修改" width="30%" :before-close="handleClose">
    <el-form label-width="120px">
      <el-form-item label="品牌">
        <el-select placeholder="选择品牌" v-model="dialogForm.brandId">
          <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="分类">
        <el-cascader ref="formCascader" :props="categoryProps" @change="handleChangeFormCascader"
          :show-all-levels="false" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleClickSubmit">提交</el-button>
        <el-button @click="handleClickEsc">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>

<style scoped lang="scss">
.search-div {
  padding: 10px;
  background: #fff;
}

.add {
  margin: 10px 0;
  padding: 10px;
  background: #fff;
}
</style>