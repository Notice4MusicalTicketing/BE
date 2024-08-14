export interface Comment {
    comment_id: number;
    post_id: number;
    member_id: number;
    comment: string;
    created_at: Date;
    updated_at?: Date | null;
    is_deleted: boolean;
    like_count: number;
    warning_count: number;
    reply_count: number;
    parent_id?: number | null;
}

export interface CommentSchema {
    comment_id: bigint;
    post_id: bigint;
    member_id: bigint;
    comment: string;
    created_at: Date;
    updated_at?: Date | null;
    is_deleted: boolean;
    like_count: number;
    warning_count: number;
    reply_count: number;
    parent_id?: bigint | null;
}