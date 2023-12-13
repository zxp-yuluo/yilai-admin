import { defineStore } from 'pinia'
import { reactive, ref } from "vue"

export const useApp = defineStore('app', () => {
  let activeMenuForm = JSON.parse(localStorage.getItem("activeMenu"))
  let crumbListForm = JSON.parse(localStorage.getItem("crumbList"))
  activeMenuForm = activeMenuForm ? activeMenuForm : {
    label: "首页",
    path: "/admin"
  }
  crumbListForm = crumbListForm ? crumbListForm : [{
    label: "首页",
    path: "/admin"
  }]
  const token = ref(localStorage.getItem("token"));
  const sidebar = ref(false)
  const activeMenu = reactive(activeMenuForm)
  const crumbList = reactive(crumbListForm)

  // 侧边栏的菜单展开/隐藏
  function setSidebar(b) {
    sidebar.value = b
  }

  // 添加crumbList元素
  const addCrumb = (object) => {
    let temp = crumbList.filter(item => item.path == object.path)
    // 有就退出
    if (temp.length) return
    // 没有就添加
    crumbList.push(object)
  }
  // 删除crumbList元素
  const delCrumb = (path) => {
    let findIndex = crumbList.findIndex(item => item.path == path)
    crumbList.splice(findIndex, 1)
  }

  // 重置crumbList
  const resetCrumb = (item) => {
    crumbList.length = 1
    crumbList[0].label = item.label
    crumbList[0].path = item.path
  }

  // 设置当前激活菜单
  const setActiveMenu = (menu) => {
    activeMenu.label = menu.label
    activeMenu.path = menu.path
  }

  function setToken(t) {
    token.value = t
  }
  return {
    token,
    sidebar,
    activeMenu,
    crumbList,
    setSidebar,
    addCrumb,
    delCrumb,
    resetCrumb,
    setToken,
    setActiveMenu
  }
})