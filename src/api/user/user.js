import ajax from '../ajax'

const BASE_URL = "/admin/system/user/"

/**
 * 登录接口
 * @param {*} data userName：用户名，password：密码 
 * @returns 
 */
export const login = data => ajax.post(BASE_URL + "login",data)

/**
 * 获取用户信息
 * @returns 
 */
export const getUserinfo = () => ajax.get(BASE_URL + "getUserInfo")

/**
 * 退出登录
 * @returns 
 */
export const logout = () => ajax.get(BASE_URL + "logout")
