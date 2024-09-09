import HttpStatusCode from "src/constants/httpStatusCode.enum"

export interface ItemBaseResponse<T> {
    status: HttpStatusCode
    message: string
    data: T
}

export interface ListBaseResponse<T> {
    status: HttpStatusCode
    message: string
    size: number
    page: number
    totalSize: number
    totalPage: number
    data: T[]
}