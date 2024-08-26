export interface Comment {
    commentId: number;
    postId: number;
    memberId: number;

    content: string;
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
    commentId: bigint;
    postId: bigint;
    memberId: bigint;

    content: string;
    isDeleted: boolean;
    likeCount: number;
    warningCount: number;
    replyCount: number;
    parentId?: bigint | null;
    replies?: CommentSchema[];

    createdAt: Date;
    updatedAt?: Date | null;
}