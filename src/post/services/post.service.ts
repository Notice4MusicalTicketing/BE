import {CreatePostDto} from "../dtos/post.dto";
import {Post, PostPreview} from "../entities/post.entity";
import prisma from "../../config/database";
import {Member} from "../../member/entities/member.entity";
import {PostConverter} from "../entities/post.converter";

export class PostService {
    // post create - 게시글 작성
    async createPost(request: CreatePostDto, member: Member): Promise<void> {
        const postSchema = await prisma.post.create({
            data: {
                member_id: member.member_id,
                title: request.title,
                content: request.content,
                category: request.category,
            },
        });
    }

    // post create - 추천수
    // todo : 나중에 테이블 추가해서 사람당 1명 기록 관리하기
    async addLikeCount(postId: number): Promise<void> {
        const postSchema = await prisma.post.findFirst({
            where: {
                post_id: BigInt(postId),
                is_deleted: false,
            }
        });

        if (postSchema === null){
            throw new Error("게시물이 존재하지 않음");
        }

        await prisma.post.update({
            where: {
                post_id: BigInt(postId),
            },
            data: {
                like_count: {
                    increment: 1,
                }
            },
        });
    }

    // post create - 신고하기
    // todo : 나중에 테이블 추가해서 사람당 1명 기록 관리하기
    async addWarningCount(postId: number): Promise<void> {
        const postSchema = await prisma.post.findFirst({
            where: {
                post_id: BigInt(postId),
                is_deleted: false,
            }
        });

        if (postSchema === null){
            throw new Error("게시물이 존재하지 않음");
        }

        await prisma.post.update({
            where: {
                post_id: BigInt(postId),
            },
            data: {
                warning_count: {
                    increment: 1,
                }
            },
        });
    }

    // post delete
    async deletePost(postId: number, memberId: number): Promise<void> {
        const postSchema = await prisma.post.findFirst({
            where: {
                post_id: BigInt(postId),
                member_id: BigInt(memberId),
                is_deleted: false,
            }
        });

        if (postSchema === null){
            throw new Error("게시물이 존재하지 않음");
        }

        await prisma.post.update({
            where: {
                post_id: BigInt(postId),
            },
            data: {
                is_deleted: true,
            },
        });
    }

    // 게시글 조회 ( post_id 기반 )
    async getPostByPostId(postId: number): Promise<Post> {
        if (isNaN(postId) || postId === null || postId === undefined) {
            throw new Error("Invalid postId");
        }
        const postSchema = await prisma.post.findFirst({
            where: {
                post_id: BigInt(postId),
                is_deleted: false,
            }
        });

        if (postSchema === null){
            throw new Error("게시물이 존재하지 않음");
        }

        const post = PostConverter.toEntity(postSchema);

        return post;
    }

    // 전체 게시글 조회 (미리보기 조회)
    async getAllPosts(): Promise<PostPreview[]> {
        const postSchemas = await prisma.post.findMany({
            where: {
                is_deleted: false,
            },
            select: {
                post_id: true,
                title: true,
                like_count: true,
                reply_count: true,
                category: true,
                member: {
                    select: {
                        nickname: true,
                    }
                }
            },
        });

        const postPreviews: PostPreview[] = postSchemas.map(postSchema => ({
            post_id: Number(postSchema.post_id),
            nickname: postSchema.member.nickname,
            title: postSchema.title,
            like_count: postSchema.like_count,
            reply_count: postSchema.reply_count,
            category: postSchema.category,
        }));

        return postPreviews;
    }

    // category 별 게시글 조회 (미리보기 조회)
    async getPostsByCategory(category: string): Promise<PostPreview[]> {
        const postSchemas = await prisma.post.findMany({
            where: {
                category: category,
                is_deleted: false,
            },
            select: {
                post_id: true,
                title: true,
                like_count: true,
                reply_count: true,
                category: true,
                member: {
                    select: {
                        nickname: true,
                    }
                }
            }
        });

        const postPreviews: PostPreview[] = postSchemas.map(postSchema => ({
            post_id: Number(postSchema.post_id),
            nickname: postSchema.member.nickname,
            title: postSchema.title,
            like_count: postSchema.like_count,
            reply_count: postSchema.reply_count,
            category: postSchema.category,
        }));

        return postPreviews;
    }

    async updatePost(postId: number, request: CreatePostDto, member: Member): Promise<void> {
        const postSchema = await prisma.post.findFirst({
            where: {
                post_id: BigInt(postId),
                member_id: BigInt(member.member_id),
                is_deleted: false,
            }
        });

        if (postSchema === null){
            throw new Error("게시물이 존재하지 않음");
        }

        await prisma.post.update({
            where: {
                post_id: BigInt(postId),
                member_id: BigInt(member.member_id),
            },
            data: {
                title: request.title,
                content: request.content,
                category: request.category,
            },
        });
    }
}