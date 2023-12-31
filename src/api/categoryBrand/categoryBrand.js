import ajax from "../ajax";

const BASE_URL = "/admin/product/categoryBrand/"

/**
 * 分类品牌分页查询
 * @param {number} page 
 * @param {number} limit 
 * @param {Object} param 
 * @returns 
 */
export const getCategoryBrandList = (page,limit,params) => ajax.get(`${BASE_URL}getCategoryBrandList/${page}/${limit}`,{params})

/**
 * 添加分类品牌
 * @param {*} data 
 * @returns 
 */
export const addCategoryBrandList = data => ajax.post(`${BASE_URL}addCategoryBrand`,data)

/**
 * 修改分类品牌
 * @param {*} data 
 * @returns 
 */
export const updateCategoryBrandList = data => ajax.put(`${BASE_URL}updateCategoryBrand`,data)

/**
 * 删除分类品牌
 * @param {number} id 
 * @returns 
 */
export const deleteCategoryBrandList = id => ajax.delete(`${BASE_URL}deleteCategoryBrand/${id}`)

/**
 * 根据分类的id获取品牌数据
 * @param {number} id 
 * @returns 
 */
export const FindBrandByCategoryId = id => ajax.get(`${BASE_URL}findBrandByCategoryId/${id}`)





