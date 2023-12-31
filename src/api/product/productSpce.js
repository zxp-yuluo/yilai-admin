import ajax from "../ajax";

const BASE_URL = "/admin/product/productSpec/"

/**
 * 获取商品规格列表
 * @param {number} page 
 * @param {number} limit 
 * @returns 
 */
export const findProductSpec = (page,limit) => ajax.get(`${BASE_URL}selectProductSpec/${page}/${limit}`)

/**
 * 添加商品规格
 * @param {*} data 
 * @returns 
 */
export const addProductSpec = data => ajax.post(`${BASE_URL}add`, data)

/**
 * 修改商品规格
 * @param {*} data 
 * @returns 
 */
export const updateProductSpec = data => ajax.put(`${BASE_URL}update`, data)

/**
 * 删除商品规格
 * @param {number} id 
 * @returns 
 */
export const deleteProductSpec = id => ajax.delete(`${BASE_URL}delete/${id}`)

/**
 * 查询所有的产品规格数据
 * @returns 
 */
export const FindAllProductSpec = () => ajax.get(`${BASE_URL}findAll`)