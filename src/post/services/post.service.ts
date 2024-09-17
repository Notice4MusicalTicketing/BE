import {CreatePostDto} from "../dtos/post.dto";
import {HotPost, Post, PostPreview} from "../entities/post.entity";
import prisma from "../../config/database";
import {Member} from "../../member/entities/member.entity";
import {HotPostConverter, PostConverter} from "../entities/post.converter";
import {Pagination} from "../../utils/pagination";
import {PostRepository} from "../repository/post.repository";

const postRepository = new PostRepository();


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
                musicalId: request.musicalId,
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
    async getAllPosts(
        cursor: string | null = null,
        pageSize: number = 20,
    ): Promise<Pagination<PostPreview[]>> {
        const postPreviews = await postRepository
            .findPostPreviewsByRecent(cursor, pageSize);

        return postPreviews;
    }

    // category 별 게시글 조회 (미리보기 조회)
    async getPostsByCategory(
        category: string,
        cursor: string | null = null,
        pageSize: number = 20,
    ): Promise<Pagination<PostPreview[]>> {
        const postPreviews = await postRepository
            .findPostPreviewsByCategory(category, cursor, pageSize)

        return postPreviews;
    }

    async searchPosts(
        criteria: string,
        cursor: string | null = null,
        pageSize: number = 20,
    ): Promise<Pagination<PostPreview[]>> {
        const postPreview = await postRepository
            .findPostPreviewsByCriteria(criteria, cursor, pageSize);

        return postPreview;
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


}