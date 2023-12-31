<script setup>
import { ref, reactive, onMounted } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { findProductSpec, addProductSpec, updateProductSpec, deleteProductSpec } from "~/api/product/productSpce.js"

onMounted(() => {
  fetchData()
})

//#region ------------- 网络请求 -------------
const fetchData = async (tip) => {
  const { code, data, message } = await findProductSpec(pageParams.page, pageParams.limit)
  console.log(data.list);
  if (code == 200) {
    const temp = data.list
    temp.map(item => item.specValue = JSON.parse(item.specValue))
    tableList.value = temp
    total.value = data.total
    tip ? ElMessage.success(tip) : ''
  } else {
    ElMessage.error(message)
  }
}

// 删除分类品牌
const deleteCategoryBrandListData = async (id) => {
  const { code, message } = await deleteProductSpec(id)
  if (code == 200) {
    ElMessage.success("删除成功！")
    fetchData()
  } else {
    ElMessage.error(message)
  }
}

//#endregion


//#region ------------- 添加/修改 -------------

// 点击添加按钮
const handleClickAdd = () => {
  productSpec.specName = ""
  productSpec.id = ""
  productSpec.specValue = []
  dialogVisible.value = true
}
//#endregion

//#region ------------- 表格 -------------

// 表格数据
const tableList = ref([])

// 点击修改按钮
const handelClickUpdate = row => {
  console.log(row);
  productSpec.id = row.id
  productSpec.specValue = row.specValue
  productSpec.specName = row.specName
  dialogVisible.value = true
}

// 点删除改按钮
const handelClickDelete = row => {
  ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteCategoryBrandListData(row.id)
  }).catch(() => {
    ElMessage.error("删除失败！")
  })
}

//#endregion

//#region ------------- 分页 -------------

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



//#region ------------- 弹框 -------------

// 添加表单数据模型
const productSpec = reactive({
  id: '',
  specName: '',
  specValue: []
})

// 控制弹框是否显示
const dialogVisible = ref(false)


// 点击添加新规格
const handleClickAddNewSpec = () => {
  productSpec.specValue.push({
    key: "",
    valueList: []
  })
}

// 点击删除
const delSpec = (item) => {
  console.log(item);
  productSpec.specValue = productSpec.specValue.filter(el => el.key != item.key )
}

// 点击提交
const handleClickSubmit = async () => {
  let code,message
  productSpec.specValue.map(item => {
    if(typeof item.valueList === 'string') {
      return  item.valueList = item.valueList.split(",")
    }
  })
  productSpec.specValue = JSON.stringify(productSpec.specValue)
  if(productSpec.id) {
    ({code,message} = await updateProductSpec(productSpec))
  }else {
    ({code,message} = await addProductSpec(productSpec))
  }
  if(code == 200) {
    productSpec.specValue = []
    dialogVisible.value = false
    productSpec.id ? ElMessage.success("修改成功！") : ElMessage.success("添加成功！")
    fetchData()
  }else {
    ElMessage.error(message)
  }
}


//#endregion

</script>

<template>
  <!-- 添加 -->
  <div class="add">
    <el-button type="primary" size="small" @click="handleClickAdd">添加</el-button>
  </div>

  <!-- 表格  -->
  <el-table max-height="450" :data="tableList" style="width: 100%">
    <el-table-column prop="specName" label="规格名称" />
    <el-table-column label="规格值" #default="scope">
      <template v-for="spec in scope.row.specValue">
        <div style="padding: 5px; margin: 0;width: 100%;">
          {{ spec.key }}：
          <span v-for="(attr) in spec.valueList" class="div-atrr">
            {{ attr }}
          </span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" />

    <el-table-column label="操作" align="center" width="200" #default="scope">
      <el-button type="primary" size="small" @click="handelClickUpdate(scope.row)">
        修改
      </el-button>
      <el-button type="danger" size="small" @click="handelClickDelete(scope.row)">
        删除
      </el-button>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-pagination style="margin-top: 10px;" v-model:current-page="pageParams.page" v-model:page-size="pageParams.limit"
    :page-sizes="[10, 20, 30, 40]" small layout="total, sizes, prev, pager, next, jumper" :total=total
    @size-change="handleSizeChange" @current-change="handleCurrentChange" />

  <!-- 添加/修改弹框 -->
  <el-dialog v-model="dialogVisible" title="添加或修改" width="40%">
    <el-form label-width="120px" height="400">
      <el-form-item label="规格名称">
        <el-input v-model="productSpec.specName" />
      </el-form-item>
      <el-form-item>
        <el-button size="default" type="success" @click="handleClickAddNewSpec">
          添加新规格
        </el-button>
      </el-form-item>
      <el-form-item label="" v-for="item in productSpec.specValue" :key="item.key">
        <el-row>
          <el-col :span="10">
            <el-input v-model="item.key" placeholder="规格" style="width: 90%;" />
          </el-col>
          <el-col :span="10">
            <el-input v-model="item.valueList" placeholder="规格值(如:白色,红色)" style="width: 90%;" />
          </el-col>
          <el-col :span="4">
            <el-button size="default" type="danger" @click="delSpec(item)">删除</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleClickSubmit">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>


<style scoped>
.add {
  margin-bottom: 10px;
  padding: 10px;
  background: #fff;
}

.div-atrr {
  padding: 5px 10px;
  margin: 0 10px;
  background-color: powderblue;
  border-radius: 10px;
}
</style>