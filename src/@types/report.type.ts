// Existing Report Interface
export interface Report {
    id: string
    reporterId: string
    reportedId: string
    orderId: string
    description?: string
    attachment: string
    status: string
    createdBy: string
    createdAt: string
    updatedBy: string
    updatedAt: string
  }
  
  // Simplified view of Report type for lists
  export type ReportList = Pick<Report, "id" | "reporterId" | "reportedId" | "orderId" | "description" | "attachment" | "status" | "createdAt" | "updatedAt">
  
  // Fields required to create a new Report
  export type CreateReport = Pick<Report, "reporterId" | "reportedId" | "orderId" | "description" | "attachment">
  
  // Configuration type for pagination and size
  export interface ReportListConfig {
    size?: number | string
    page?: number | string
    totalSize?: number | string
    totalPage?: number | string
  }
  