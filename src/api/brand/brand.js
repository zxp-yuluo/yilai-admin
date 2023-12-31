import ajax from "../ajax";

const BASE_URL = "/admin/product/brand/"

/**
 * 获取品牌分页列表数据
 * @param {number} page 
 * @param {number} limit 
 * @returns 
 */
export const getBrandList = (page,limit) => ajax.get(`${BASE_URL}getBrandList/${page}/${limit}`)

/**
 * 获取所有品牌数据列表
 * @returns 
 */
export const getAllBrandList = () => ajax.get(`${BASE_URL}getAllBrand`)

/**
 * 品牌添加
 * @param {*} data 
 * @returns 
 */
export const addBrand = data => ajax.post(`${BASE_URL}addBrand`,data)

/**
 * 品牌修改
 * @param {*} data 
 * @returns 
 */
export const updateBrand = data => ajax.put(`${BASE_URL}updateBrand`,data)

/**
 * 品牌删除
 * @param {number} id 
 * @returns 
 */
export const deleteBrand = id => ajax.delete(`${BASE_URL}deleteBrand/${id}`)



