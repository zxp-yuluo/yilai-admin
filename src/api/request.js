import axios from 'axios'
import { storeToRefs } from 'pinia'
import {useAccount} from "@/pinia/modules/useAccount"
const instance = axios.create({
  baseURL: "/api"
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 获取本地仓库的token
    // const token = localStorage.getItem("token")
    // console.log("获取本地仓库的token",token);
    const {account} = useAccount()
    const {token} = account
    if(token) {
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
    return response.data;
  }, () => {
    return new Promise(() => { })
  })

export default instance