import http from 'src/utils/http'
import { ListBaseResponse } from 'src/@types/response'
import { Report, CreateReport } from 'src/@types/report.type'

const reportAPI = {
  // Fetch all reports with pagination
  getAllReport: ({ page, size }: { page: number; size: number }) =>
    http.get<ListBaseResponse<Report>>(`api/reports?status=ALL&page=${page}&size=${size}&direction=DESC&properties=createdAt`),

  // Update a report status
  updateReport: (body: CreateReport) => http.put<ListBaseResponse<{}>>('api/reports/process', body)
}

export default reportAPI
