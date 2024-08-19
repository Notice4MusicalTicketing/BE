export interface CreateCommentDto {
    content: string;
    parentId?: number;
    postId: number;
}