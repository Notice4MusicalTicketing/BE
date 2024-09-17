export interface Pagination<T> {
    data: T;
    cursorInfo: Cursor;
}

export interface Cursor {
    cursor: string | null;
    pageSize: number;
    elementCount: number;
    hasNext: boolean;
    totalCount: number;
}