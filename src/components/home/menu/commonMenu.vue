<script setup>
import {
  Location,
  Grid,
  HomeFilled,
  Avatar,
  Setting,
} from '@element-plus/icons-vue'
import { useApp } from "../../../pinia/modules/useApp"

const app = useApp()
const sidebar = app.app.sidebar
const { addCrumb,setActiveMenu } = app
const mapIcon = {
  Setting,
  Avatar,
  Grid,
  HomeFilled,
  Location
}

const menu = [
  {
    "path": "/home",
    "name": "home",
    "label": "首页",
    "icon": "HomeFilled",
    "url": "Home/Home"
  },
  {
    "path": "/home/system",
    "name": "system",
    "label": "系统管理",
    "icon": "Location",
    "children": [
      {
        "path": "/home/system/user",
        "name": "user",
        "label": "用户管理",
        "url": "SystemManage/User"
      },
      {
        "path": "/home/system/role",
        "name": "role",
        "label": "角色管理",
        "url": "SystemManage/Role"
      },
      {
        "path": "/home/system/menu",
        "name": "menu",
        "label": "菜单管理",
        "url": "SystemManage/Menu"
      }
    ]
  }
]
// {
//   "path": "/home/other",
//   "label": "其它",
//   "icon": "Location",
//   "children": [
//     {
//       "path": "/home/other/page1",
//       "name": "page1",
//       "label": "页面1",
//       "url": "Othere/PageOne"
//     },
//     {
//       "path": "/home/other/page2",
//       "name": "page2",
//       "label": "页面2",
//       "url": "Othere/PageTwo"
//     }
//   ]
// }

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClickMenu = (menuItem) => {
  addCrumb({lable: menuItem.label,path: menuItem.path})
  setActiveMenu(menuItem.label)
}
</script>
<!-- <el-icon>
  <component :is="son.icon"></component>
</el-icon> -->
<template>
  <header class="head">{{ sidebar.isCollapse ? "衣赖" : "YILAI衣赖" }}</header>
  <el-menu router collapse-transition :collapse="sidebar.isCollapse" default-active="/home" class="el-menu-vertical-demo"
    @open="handleOpen" @close="handleClose">
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

<style scoped>
.head {
  height: 60px;
  font-size: 16px;
  text-align: center;
  line-height: 60px;
  background: #ffffff;
  word-wrap: break-word;
}
.el-menu {
  border: none;
}
</style>