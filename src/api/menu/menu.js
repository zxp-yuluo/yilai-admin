import ajax from "../ajax";

const BASE_URL = "/admin/system/menu/"

/**
 * 获取菜单列表
 * @returns 
 */
export const findMenu = () => ajax.get(`${BASE_URL}findMenu`)

/**
 * 添加菜单
 * @param {*} data 
 * @returns 
 */
export const addMenu = data => ajax.post(`${BASE_URL}addMenu`, data)

/**
 * 修改菜单
 * @param {*} data 
 * @returns 
 */
export const updateMenu = data => ajax.put(`${BASE_URL}updateMenu`, data)

/**
 * 删除菜单
 * @param {number} id 
 * @returns 
 */
export const deleteMenu = id => ajax.delete(`${BASE_URL}deleteMenu/${id}`)