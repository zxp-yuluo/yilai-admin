import ajax from "../ajax";

const BASE_URL = "/admin/order/orderInfo/"

export const GetOrderStatisticsData = params => ajax.get(`${BASE_URL}getOrderStatisticsData`,{params})