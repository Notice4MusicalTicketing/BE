import {CreatePostDto} from "../dtos/post.dto";
import {HotPost, Post, PostPreview} from "../entities/post.entity";
import prisma from "../../config/database";
import {Member} from "../../member/entities/member.entity";
import {HotPostConverter, PostConverter} from "../entities/post.converter";

const MAX_LENGTH = 20;

export class PostService {
    // post create - 게시글 작성
    async createPost(request: CreatePostDto, member: Member): Promise<void> {
        const postSchema = await prisma.post.create({
            data: {
                member_id: member.member_id,
                title: request.title,
                content: request.content,
                sample: this.extractSampleText(request.content),
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
                sample: true,
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
            sample: postSchema.sample,
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
                sample: true,
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
            sample: postSchema.sample,
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
                sample: this.extractSampleText(request.content),
                category: request.category,
            },
        });
    }

    async getHotPost(): Promise<HotPost> {
        const maxLikeCount = await prisma.post.aggregate({
            _max: {
                like_count: true,
            },
            where: {
                is_deleted: false,
            }
        });

        if (maxLikeCount._max.like_count === null || maxLikeCount._max.like_count === undefined) {
            throw new Error("게시물이 존재하지 않음");
        }

        console.log(maxLikeCount._max.like_count);

        const posts = await prisma.post.findMany({
            where: {
                is_deleted: false,
                like_count: maxLikeCount._max.like_count,
            },
            orderBy: {
                post_id: 'desc',
            },
            take: 1,
        });

        console.log(posts[0]);

        if (posts.length === 0 || posts[0] === undefined) {
            throw new Error("게시물이 존재하지 않음");
        }

        const hotPost = HotPostConverter.toEntity(posts[0]);

        return hotPost;
    }

    private extractSampleText(text: string): string {
        const sentences = text.split(`\. | \n`).filter(sentence => sentence.trim().length > 0);

        for (let sentence of sentences) {
            sentence = sentence.trim();
            if (sentence.length > MAX_LENGTH) {
                return sentence.substring(0, MAX_LENGTH);
            } else if (sentence.length > 0) {
                return sentence;
            }
        }
        return "";
    }

    async searchPosts(criteria: string): Promise<PostPreview[]> {
        const postSchemas = await prisma.post.findMany({
            where: {
                is_deleted: false,
                OR: [
                    {
                        content: {
                            contains: criteria,
                        },
                    },
                    {
                        title: {
                            contains: criteria,
                        },
                    },
                ],
            },
            select: {
                post_id: true,
                title: true,
                sample: true,
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
            sample: postSchema.sample,
            like_count: postSchema.like_count,
            reply_count: postSchema.reply_count,
            category: postSchema.category,
        }));

        return postPreviews;
    }
}

