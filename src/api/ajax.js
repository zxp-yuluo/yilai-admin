import axios from 'axios';
import router from "../router/router"
import { ElMessage } from 'element-plus';
import { useApp } from '../pinia/modules/useApp'
import { useAccount } from '~/pinia/modules/useAccount'
import { storeToRefs } from 'pinia'


const instance = axios.create({
  baseURL: '/api'
});


// 添加请求拦截器
instance.interceptors.request.use(config => {
  const { token } = storeToRefs(useApp())
  config.headers.token = token.value
  // 在发送请求之前做些什么 
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(response => {
  const res = response.data
  const app = useApp()
  const {setActiveMenu, setToken, resetCrumb } = app
  const { setUserInfo } = useAccount()
  // code为208，是用户没登陆
  if (res.code == 208) {
    // const redirect = encodeURIComponent(window.location.href)  // 当前地址栏的url
    // router.push(`/login?redirect=${redirect}`)
    // 删除本地和pinia中的token和个人信息
    localStorage.removeItem("token")
    localStorage.removeItem("userInfo")
    localStorage.removeItem("activeMenu")
    localStorage.removeItem("crumbList")
    setToken("")
    setUserInfo(null)
    setActiveMenu({
      label: "首页",
      path: "/admin"
    })
    resetCrumb({
      label: "首页",
      path: "/admin"
    })
    router.push(`/login`)
    ElMessage.error(res.message)
    return new Promise(() => { })
    // return Promise.reject(new Error(res.message || 'Error'))
  }
  // 对响应数据做点什么
  return res;
}, error => {
  // 对响应错误做点什么
  ElMessage.error("服务器问题：" + error.message)
  return new Promise(() => { })
});


export default instance;