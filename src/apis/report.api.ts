
import http from 'src/utils/http'
import { ListBaseResponse } from 'src/@types/response'

const reportAPI = {
  getAllReport: ({page, size} : {page: number, size: number}) =>
    http.get<ListBaseResponse<Report>>(
      `api/reports?status=ALL&page=${page}&size=${size}&direction=ASC&properties=id`
    ),


}

export default reportAPI
