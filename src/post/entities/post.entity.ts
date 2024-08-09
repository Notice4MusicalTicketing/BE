export interface Post {
    post_id: number;
    member_id: number;
    title: string;
    content: string;
    created_at: Date;
    updated_at?: Date | null;
    is_deleted: boolean;
    like_count: number;
    warning_count: number;
    reply_count: number;
    views: number;
    category: string;
}

export interface PostSchema {
    post_id: bigint;
    member_id: bigint;
    title: string;
    content: string;
    created_at: Date;
    updated_at?: Date | null;
    is_deleted: boolean;
    like_count: number;
    warning_count: number;
    reply_count: number;
    views: number;
    category: string;
}

export interface PostPreview {
    post_id: number;
    nickname: string;
    title: string;
    like_count: number;
    reply_count: number;
    category: string;
}