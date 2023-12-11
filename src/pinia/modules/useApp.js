import { defineStore } from 'pinia'
import { reactive, ref } from "vue"

export const useApp = defineStore('app', () => {
  const token = ref(localStorage.getItem("token"));
  const sidebar = ref(false)
  const activeMenu = ref('首页')
  const crumbList = reactive([
    {
      label: "首页",
      path: "/admin"
    }
  ])

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

  // 设置当前激活菜单
  const setActiveMenu = (label) => {
    activeMenu.value = label
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
    setToken,
    setActiveMenu
  }
})