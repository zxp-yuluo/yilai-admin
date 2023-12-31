import ajax from "../ajax";

const BASE_URL = "/admin/product/product/"

/**
 * 分页列表
 * @param {number} page 
 * @param {number} limit 
 * @returns 
 */
export const GetProductPageList = (page,limit,params) => ajax.get(`${BASE_URL}${page}/${limit}`,{params})

/**
 * 添加商品
 * @param {*} data 
 * @returns 
 */
export const SaveProduct = data => ajax.post(`${BASE_URL}save`,data)

/**
 * 修改商品信息
 * @param {*} data 
 * @returns 
 */
export const UpdateProductById = data => ajax.put(`${BASE_URL}updateById`,data)

/**
 * 根据id获取商品信息 
 * @param {number} id 
 * @returns 
 */
export const GetProductById = id => ajax.get(`${BASE_URL}getById/${id}`)

/**
 * 删除商品
 * @param {number} id 
 * @returns 
 */
export const DeleteProductById = id => ajax.delete(`${BASE_URL}deleteById/${id}`)

/**
 * 商品审核
 * @param {number} id 
 * @param {number} auditStatus 
 * @returns 
 */
export const UpdateProductAuditStatus = (id,auditStatus) => ajax.get(`${BASE_URL}updateAuditStatus/${id}/${auditStatus}`)

/**
 * 商品上架
 * @param {number} id 
 * @param {number} status 
 * @returns 
 */
export const UpdateProductStatus = (id,status) => ajax.get(`${BASE_URL}updateStatus/${id}/${status}`)





