<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  Location,
  Setting,
  Grid,
  HomeFilled,
  Avatar
} from '@element-plus/icons-vue'
import { useApp } from "~/pinia/modules/useApp"
import { storeToRefs } from 'pinia'
import {getUserMenuById} from "~/api/user/user"

// ---------------- 定义数据模型 ----------------
const { path } = useRoute()
const { addCrumb, setActiveMenu } = useApp()
// 控制菜单是否展开
const { sidebar, activeMenu,crumbList } = storeToRefs(useApp())
// 菜单选项
const menuList = ref([])
const menu = [
  {
    "path": "/admin/home",
    "name": "admin",
    "label": "首页",
    "icon": "HomeFilled",
  },
  {
    "path": "/admin/system",
    "name": "system",
    "label": "系统管理",
    "icon": "Location",
    "children": [
      {
        "path": "/admin/system/user",
        "name": "user",
        "label": "用户管理"
      },
      {
        "path": "/admin/system/role",
        "name": "role",
        "label": "角色管理"
      },
      {
        "path": "/admin/system/menu",
        "name": "menu",
        "label": "菜单管理"
      }
    ]
  }
]
// 字体图标映射
const mapIcon = {
  Setting,
  Avatar,
  Grid,
  HomeFilled,
  Location
}
// ---------------- 钩子函数 ----------------
onMounted(() => {
  getPathItem(menu, path)
  if (temp) {
    setActiveMenu({
      label: temp.label,
      path: temp.path,
    })
    localStorage.setItem("activeMenu", JSON.stringify({
      label: temp.label,
      path: temp.path,
    }))
  }
  getUserMenuByIdData()
})
// ---------------- 操作方法 ----------------

// 过滤
let temp;
const getPathItem = (array, path) => {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element.children) {
      getPathItem(element.children, path)
    } else {
      if (element.path == path) {
        temp = element
      }
    }
  }
}

// 点击菜单选项
const handleClickMenu = (item) => {
  addCrumb(item)
  setActiveMenu({
    label: item.label,
    path: item.path,
  })
  localStorage.setItem("activeMenu", JSON.stringify({
    label: item.label,
    path: item.path,
  }))
  localStorage.setItem("crumbList", JSON.stringify(crumbList.value))
}
// 菜单列表请求
const getUserMenuByIdData = async () => {
  const {code,data} = await getUserMenuById()
  console.log(code,data);
  if(code == 200) {
    menuList.value = data
  }
}
</script>

<template>
  <el-menu class="menu" router :default-active="activeMenu.path" :collapse="sidebar" collapse-transition>
    <header class="head">衣赖</header>
    <template v-for="son in menu" :key="son.name">
      <template v-if="son.children">
        <el-sub-menu :index="son.path">
          <template #title>
            <el-icon>
              <component :is="mapIcon[son.icon]"></component>
            </el-icon>
            <span>{{ son.label }}</span>
          </template>
          <el-menu-item @click="handleClickMenu(grandson)" v-for="grandson in son.children" :index="grandson.path">{{
            grandson.label }}</el-menu-item>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="son.path" @click="handleClickMenu(son)">
          <el-icon>
            <component :is="mapIcon[son.icon]"></component>
          </el-icon>
          <template #title>{{ son.label }}</template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<style scoped lang="scss">
.head {
  height: 60px;
  font-size: 16px;
  text-align: center;
  line-height: 60px;
  background: #ffffff;
  word-wrap: break-word;
}

.menu {
  border: none;
}
</style>