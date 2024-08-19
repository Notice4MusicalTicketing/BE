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
                memberId: member.memberId,
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
                postId: BigInt(postId),
                isDeleted: false,
            }
        });

        if (postSchema === null){
            throw new Error("게시물이 존재하지 않음");
        }

        await prisma.post.update({
            where: {
                postId: BigInt(postId),
            },
            data: {
                likeCount: {
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
                postId: BigInt(postId),
                isDeleted: false,
            }
        });

        if (postSchema === null){
            throw new Error("게시물이 존재하지 않음");
        }

        await prisma.post.update({
            where: {
                postId: BigInt(postId),
            },
            data: {
                warningCount: {
                    increment: 1,
                }
            },
        });
    }

    // post delete
    async deletePost(postId: number, memberId: number): Promise<void> {
        const postSchema = await prisma.post.findFirst({
            where: {
                postId: BigInt(postId),
                memberId: BigInt(memberId),
                isDeleted: false,
            }
        });

        if (postSchema === null){
            throw new Error("게시물이 존재하지 않음");
        }

        await prisma.post.update({
            where: {
                postId: BigInt(postId),
            },
            data: {
                isDeleted: true,
            },
        });
    }

    // 게시글 조회 ( postId 기반 )
    async getPostByPostId(postId: number): Promise<Post> {
        if (isNaN(postId) || postId === null || postId === undefined) {
            throw new Error("Invalid postId");
        }
        const postSchema = await prisma.post.findFirst({
            where: {
                postId: BigInt(postId),
                isDeleted: false,
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
                isDeleted: false,
            },
            select: {
                postId: true,
                title: true,
                sample: true,
                likeCount: true,
                replyCount: true,
                category: true,
                member: {
                    select: {
                        nickname: true,
                    }
                }
            },
        });

        const postPreviews: PostPreview[] = postSchemas.map(postSchema => ({
            postId: Number(postSchema.postId),
            nickname: postSchema.member.nickname,
            title: postSchema.title,
            sample: postSchema.sample,
            likeCount: postSchema.likeCount,
            replyCount: postSchema.replyCount,
            category: postSchema.category,
        }));

        return postPreviews;
    }

    // category 별 게시글 조회 (미리보기 조회)
    async getPostsByCategory(category: string): Promise<PostPreview[]> {
        const postSchemas = await prisma.post.findMany({
            where: {
                category: category,
                isDeleted: false,
            },
            select: {
                postId: true,
                title: true,
                sample: true,
                likeCount: true,
                replyCount: true,
                category: true,
                member: {
                    select: {
                        nickname: true,
                    }
                }
            }
        });

        const postPreviews: PostPreview[] = postSchemas.map(postSchema => ({
            postId: Number(postSchema.postId),
            nickname: postSchema.member.nickname,
            title: postSchema.title,
            sample: postSchema.sample,
            likeCount: postSchema.likeCount,
            replyCount: postSchema.replyCount,
            category: postSchema.category,
        }));

        return postPreviews;
    }

    async updatePost(postId: number, request: CreatePostDto, member: Member): Promise<void> {
        const postSchema = await prisma.post.findFirst({
            where: {
                postId: BigInt(postId),
                memberId: BigInt(member.memberId),
                isDeleted: false,
            }
        });

        if (postSchema === null){
            throw new Error("게시물이 존재하지 않음");
        }

        await prisma.post.update({
            where: {
                postId: BigInt(postId),
                memberId: BigInt(member.memberId),
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
                likeCount: true,
            },
            where: {
                isDeleted: false,
            }
        });

        if (maxLikeCount._max.likeCount === null || maxLikeCount._max.likeCount === undefined) {
            throw new Error("게시물이 존재하지 않음");
        }

        console.log(maxLikeCount._max.likeCount);

        const posts = await prisma.post.findMany({
            where: {
                isDeleted: false,
                likeCount: maxLikeCount._max.likeCount,
            },
            orderBy: {
                postId: 'desc',
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
                isDeleted: false,
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
                postId: true,
                title: true,
                sample: true,
                likeCount: true,
                replyCount: true,
                category: true,
                member: {
                    select: {
                        nickname: true,
                    }
                }
            },
        });

        const postPreviews: PostPreview[] = postSchemas.map(postSchema => ({
            postId: Number(postSchema.postId),
            nickname: postSchema.member.nickname,
            title: postSchema.title,
            sample: postSchema.sample,
            likeCount: postSchema.likeCount,
            replyCount: postSchema.replyCount,
            category: postSchema.category,
        }));

        return postPreviews;
    }
}

