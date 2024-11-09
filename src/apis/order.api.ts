import { ItemBaseResponse } from 'src/@types/response'
import { CreateOrderBody } from 'src/Components/chat/ChatWindow'
import http from 'src/utils/http'

const OrderAPI = {
  createOrder: async (body: CreateOrderBody) => http.post<ItemBaseResponse<{ id: string; chatBoxId: string; status: string }>>('api/orders', body)
}
export default OrderAPI
