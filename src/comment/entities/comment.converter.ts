import {Comment, CommentSchema} from "./comment.entity";


export const CommentConverter = {
    toEntity(commentSchema: CommentSchema): Comment {
        return {
            commentId: Number(commentSchema.commentId),
            postId: Number(commentSchema.postId),
            memberId: Number(commentSchema.memberId),

            content: commentSchema.content,
            isDeleted: commentSchema.isDeleted,
            likeCount: commentSchema.likeCount,
            warningCount: commentSchema.warningCount,
            replyCount: commentSchema.replyCount,
            parentId: commentSchema.parentId !== undefined ? Number(commentSchema.parentId) : null,

            createdAt: commentSchema.createdAt,
            updatedAt: commentSchema.updatedAt || undefined,


            replies: commentSchema.replies ? commentSchema.replies.map(reply => this.toEntity(reply)) : [],
        };
    },
};
