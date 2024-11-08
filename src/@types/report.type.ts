// Existing Report Interface
export interface Report {
    id: string
    reporterName: string
    reportedName: string
    ticketId: string
    ticketName: string
    description: string
    attachment: string
    status: string
    createdBy: string
    createdAt: string
    updatedBy: string
    updatedAt: string
  }
  
  // Simplified view of Report type for lists
  export type ReportList = Pick<Report, "id" | "reporterName" | "reportedName" | "ticketId" | "ticketName" | "description" | "attachment" | "status" | "createdAt" | "updatedAt">
  
  // Fields required to create a new Report
  export type CreateReport = Pick<Report, "id" | "status">
  
  // Configuration type for pagination and size
  export interface ReportListConfig {
    size?: number | string
    page?: number | string
    totalSize?: number | string
    totalPage?: number | string
  }
  