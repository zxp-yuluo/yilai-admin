import request from "../request";

const urlHead = "/admin/system/user/"

// export const login = data => {
//   return request({
//     url: "/admin/system/user/login",
//     method: "POST",
//     data 
//   })
// }

// export const login = data => request({
//   url: "/admin/system/user/login",
//   method: "POST",
//   data 
// })

export const login = data => request.post(urlHead + "login",data)
export const logout = () => request.get(urlHead + "logout")
export const getUserinfo = () => request.get(urlHead + "getUserInfo")