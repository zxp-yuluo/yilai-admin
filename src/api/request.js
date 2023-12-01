import axios from 'axios'
import { useAccount } from "@/pinia/modules/useAccount"
import router from "@/router/index"
const instance = axios.create({
  baseURL: "/api"
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 获取本地仓库的token
    // const token = localStorage.getItem("token")
    // console.log("获取本地仓库的token",token);
    const { account } = useAccount()
    const { token } = account
    if (token) {
      config.headers.Authorization = token
      config.headers.token = token
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });
// 响应拦截器
instance.interceptors.response.use(
  response => {

    const res = response.data
    // if (res.code == 208) {
    //   const redirect = encodeURIComponent(window.location.href)  // 当前地址栏的url
    //   router.push(`/login?redirect=${redirect}`)
    //   return Promise.reject(new Error(res.message || 'Error'))
    // }
    return res
  }, () => {
    return new Promise(() => {})
  })

export default instance