import ajax from "../ajax";

const BASE_URL = "/admin/product/category/"

/**
 * 获取分类列表
 * @param {number} id 
 * @returns 
 */
export const getCategoryList = id => ajax.get(`${BASE_URL}findCategoryList/${id}`)

/**
 * 导出分类数据
 * @returns 
 */
export const exportCategoryData = () => ajax.get(`${BASE_URL}exportData`,{
  responseType: 'blob'
})
