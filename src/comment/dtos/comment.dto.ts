export interface CreateCommentDto {
    content: string;
    parent_id: number | null;
}