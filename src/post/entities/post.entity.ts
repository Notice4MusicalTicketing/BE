export interface Post {
    postId: number;
    memberId: number;
    musicalId?: number | null;
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
    musicalId?: bigint | null;
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
    createdAt: Date;
}

export interface HotPost {
    postId: number;
    title: string;
}