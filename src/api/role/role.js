import ajax from "../ajax";

const BASE_URL = "/admin/system/role/"

/**
 * 根据关键字获取角色列表，为空获取所有
 * @param {number} current 当前页数
 * @param {number} limit 一页多少条数据
 * @param {*} data 关键字 {roleName："""}
 * @returns 
 */
export const keywordSearch = (current,limit,data) => ajax.post(BASE_URL + `keywordSearch/${current}/${limit}`,data)

/**
 * 添加角色
 * @param {*} data 
 * @returns 
 */
export const addRole = data => ajax.post(BASE_URL + 'addRole',data)

/**
 * 修改角色
 * @param {*} data 
 * @returns 
 */
export const updateRole = data => ajax.put(BASE_URL + 'updateRole',data)

/**
 * 删除角色
 * @returns 
 */
export const deleteRole = id => ajax.delete(BASE_URL + `deleteRole/${id}`)

/**
 * 获取角色
 * @returns 
 */
export const getRole = id => ajax.get(BASE_URL + `getRole/${id}`)