export interface PaginatedResult<T> {
    page: number,
    per_page: number,
    total: number,
    total_pages: number
    data: T[],
}

export interface User {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}