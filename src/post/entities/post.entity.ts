export interface Post {
    postId: number;
    memberId: number;
    title: string;
    content: string;
    sample: string;
    createdAt: Date;
    updatedAt?: Date | null;
    isDeleted: boolean;
    likeCount: number;
    warningCount: number;
    replyCount: number;
    views: number;
    category: string;
}

export interface PostSchema {
    postId: bigint;
    memberId: bigint;
    title: string;
    content: string;
    sample: string;
    createdAt: Date;
    updatedAt?: Date | null;
    isDeleted: boolean;
    likeCount: number;
    warningCount: number;
    replyCount: number;
    views: number;
    category: string;
}

export interface PostPreview {
    postId: number;
    nickname: string;
    title: string;
    sample: string;
    likeCount: number;
    replyCount: number;
    category: string;
}

export interface HotPost {
    postId: number;
    title: string;
}