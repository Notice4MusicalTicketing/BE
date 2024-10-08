import {HotPost, Post, PostPreview, PostSchema} from "./post.entity"

export const PostConverter = {

    // PostSchema를 Post 엔티티로 변환
    toEntity(postSchema: PostSchema): Post {
        return {
            postId: Number(postSchema.postId),
            memberId: Number(postSchema.memberId),
            title: postSchema.title,
            content: postSchema.content,
            sample: postSchema.sample,
            createdAt: postSchema.createdAt,
            updatedAt: postSchema.updatedAt,
            isDeleted: postSchema.isDeleted,
            likeCount: postSchema.likeCount,
            warningCount: postSchema.warningCount,
            replyCount: postSchema.replyCount,
            views: postSchema.views,
            category: postSchema.category,
            musicalId: postSchema.musicalId != null ? Number(postSchema.musicalId) : null,
        };
    },

    // Post 엔티티를 PostSchema로 변환
    toSchema(post: Post): PostSchema {
        return {
            postId: BigInt(post.postId),
            memberId: BigInt(post.memberId),
            title: post.title,
            content: post.content,
            sample: post.sample,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            isDeleted: post.isDeleted,
            likeCount: post.likeCount,
            warningCount: post.warningCount,
            replyCount: post.replyCount,
            views: post.views,
            category: post.category,
            musicalId: post.musicalId != null ? BigInt(post.musicalId) : null,
        };
    }
};

export const HotPostConverter = {
    toEntity(postSchema: PostSchema): HotPost {
        return {
            postId: Number(postSchema.postId),
            title: postSchema.title,
        };
    }
}

export const PostPreviewConverter = {
    fromSchema(postSchema: any): PostPreview {
        return {
            postId: Number(postSchema.postId),
            nickname: postSchema.member.nickname,
            title: postSchema.title,
            sample: postSchema.sample,
            likeCount: postSchema.likeCount,
            replyCount: postSchema.replyCount,
            category: postSchema.category,
            createdAt: postSchema.createdAt,
        }
    }
}