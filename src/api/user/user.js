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

/**
 * 条件分页查询
 * @param {number} pageNum 
 * @param {number} pageSize 
 * @param {*} param 
 * @returns 
 */
export const getUserListByPage = (pageNum,pageSize,params) => ajax.get(BASE_URL + `getUserListByPage/${pageNum}/${pageSize}`,{params})

/**
 * 添加用户
 * @param {*} data 
 * @returns 
 */
export const addUser = data => ajax.post(BASE_URL + "addUser",data)

/**
 * 修改用户
 * @param {*} data 
 * @returns 
 */
export const updateUser = data => ajax.put(BASE_URL + "updateUser",data)

/**
 * 删除用户
 * @param {number} id 用户id
 * @returns 
 */
export const deleteUser = id => ajax.delete(BASE_URL + `deleteUser/${id}`)

/**
 * 分配角色
 * @param {*} data 
 * @returns 
 */
export const assign = data => ajax.post(BASE_URL + `assign`,data)
