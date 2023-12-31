import ajax from "../ajax";

const BASE_URL = "/admin/product/productUnit/"

// 获取全部信息
export const FindAllProductUnit = () => ajax.get(`${BASE_URL}findAll`)