import {CreatePostDto} from "../dtos/post.dto";
import {Post, PostPreview} from "../entities/post.entity";
import prisma from "../../config/database";
import {Member} from "../../member/entities/member.entity";
import {PostConverter} from "../entities/post.converter";

export class PostService {
    // post create
    async createPost(request: CreatePostDto, member: Member): Promise<Post> {
        const postSchema = await prisma.post.create({
            data: {
                member_id: member.member_id,
                title: request.title,
                content: request.content,
                category: request.category,
            },
        });

        // 변환 메서드를 사용하여 PostSchema를 Post 엔티티로 변환
        const post = PostConverter.toEntity(postSchema);

        console.log("게시물 저장");

        return post;
    }

    // post update

    // post delete
    async deletePost(postId: number, memberId: number): Promise<void> {
        const postSchema = await prisma.post.findFirst({
            where: {
                post_id: BigInt(postId),
                member_id: BigInt(memberId),
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

    // 전체 게시글 조회
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
}

