import axios from 'axios'

const instance = axios.create({
  baseURL: "http://localhost:5173/api"
})

instance.interceptors.request.use(
  config => {
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