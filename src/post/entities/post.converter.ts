import {Post, PostSchema} from "./post.entity"

export const PostConverter = {

    // PostSchema를 Post 엔티티로 변환
    toEntity(postSchema: PostSchema): Post {
        return {
            post_id: Number(postSchema.post_id),
            member_id: Number(postSchema.member_id),
            title: postSchema.title,
            content: postSchema.content,
            sample: postSchema.sample,
            created_at: postSchema.created_at,
            updated_at: postSchema.updated_at,
            is_deleted: postSchema.is_deleted,
            like_count: postSchema.like_count,
            warning_count: postSchema.warning_count,
            reply_count: postSchema.reply_count,
            views: postSchema.views,
            category: postSchema.category,
        };
    },

    // Post 엔티티를 PostSchema로 변환
    toSchema(post: Post): PostSchema {
        return {
            post_id: BigInt(post.post_id),
            member_id: BigInt(post.member_id),
            title: post.title,
            content: post.content,
            sample: post.sample,
            created_at: post.created_at,
            updated_at: post.updated_at,
            is_deleted: post.is_deleted,
            like_count: post.like_count,
            warning_count: post.warning_count,
            reply_count: post.reply_count,
            views: post.views,
            category: post.category,
        };
    }
};