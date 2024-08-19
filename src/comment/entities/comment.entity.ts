export interface Comment {
    commentId: number;
    postId: number;
    memberId: number;

    comment: string;
    isDeleted: boolean;
    likeCount: number;
    warningCount: number;
    replyCount: number;
    parentId?: number | null;
    replies?: Comment[];

    createdAt: Date;
    updatedAt?: Date;
}

export interface CommentSchema {
    comment_id: bigint;
    post_id: bigint;
    member_id: bigint;

    comment: string;
    is_deleted: boolean;
    like_count: number;
    warning_count: number;
    reply_count: number;
    parent_id?: bigint | null;

    created_at: Date;
    updated_at?: Date;
}