import {Comment, CommentSchema} from "./comment.entity";


export const CommentConverter = {
    toEntity(commentSchema: CommentSchema): Comment {
        return {
            commentId: Number(commentSchema.comment_id),
            postId: Number(commentSchema.post_id),
            memberId: Number(commentSchema.member_id),

            comment: commentSchema.comment,
            isDeleted: commentSchema.is_deleted,
            likeCount: commentSchema.like_count,
            warningCount: commentSchema.warning_count,
            replyCount: commentSchema.reply_count,
            parentId: Number(commentSchema.parent_id) || null,

            createdAt: commentSchema.created_at,
            updatedAt: commentSchema.updated_at || undefined,
        };
    },

};
