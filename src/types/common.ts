export type ID = string;

export type ApiResponse<T> = {
    success: boolean;
    message?: string;
    date: T; 
}

export type PaginationMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export type PaginatedResponse<T> = {
    items: T[];
    pagination: PaginationMeta;
};