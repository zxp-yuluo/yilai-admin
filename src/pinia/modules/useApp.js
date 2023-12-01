import { defineStore } from 'pinia'
import { reactive,toRaw } from "vue"

export const useApp = defineStore('app', () => {
  let app = reactive({
    sidebar: {
      isCollapse: false
    },
    crumbList: [
      {
        lable: "首页",
        path: "/home"
      }
    ],
    activeMenu: "首页" ,  // 当前激活菜单
  })

  // 侧边栏的菜单展开/隐藏
  function setIsCollapse(b) {
    app.sidebar.isCollapse = b
  }

  // 添加crumbList元素
  const addCrumb = (object) => {
    let temp = app.crumbList.filter(item => item.path == object.path)
    // 有就退出
    if(temp.length) return
    // 没有就添加
    app.crumbList.push(object)
  }
  // 删除crumbList元素
  const delCrumb = (path) => {
    let findIndex = app.crumbList.findIndex(item => item.path == path)
    app.crumbList.splice(findIndex,1)
  }

  // 设置当前激活菜单
  const setActiveMenu = (lable) => {
    app.activeMenu = lable
  }
  return {
    app,
    setIsCollapse,
    addCrumb,
    delCrumb,
    setActiveMenu
  }
})