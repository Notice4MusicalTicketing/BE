import {CreateCommentDto} from "../dtos/comment.dto";
import {Member} from "../../member/entities/member.entity";
import prisma from "../../config/database";
import {Post} from "../../post/entities/post.entity";
import {Comment, CommentSchema} from "../entities/comment.entity";
import {CommentRepository} from "../repository/comment.repository";
import {CommentConverter} from "../entities/comment.converter";

const commentRepository = new CommentRepository();

export class CommentService {
    async createComment(request: CreateCommentDto, member: Member) {
        const commentSchema = await prisma.comment.create({
            data: {
                postId: request.postId,
                content: request.content,
                memberId: member.memberId,
                parentId: request.parentId,
            },
        });
    }

    async getCommentsByPostId(postId: number): Promise<Comment []> {
        if (isNaN(postId) || postId === null || postId === undefined) {
            throw new Error("Invalid postId");
        }
        const commentSchemas = await commentRepository.findCommentsByPostId(postId);

        if (commentSchemas === null || commentSchemas.length === 0) {
            throw new Error("게시물이 존재하지 않음");
        }

        const comments = commentSchemas.map(commentSchema => CommentConverter.toEntity(commentSchema));

        return comments;
    }

    async deleteComment(commentId: number, postId: number, memberId: number): Promise<void> {
        if (isNaN(postId) || postId === null || postId === undefined) {
            throw new Error("Invalid postId");
        }

        const commentSchema = await prisma.comment.findFirst({
            where: {
                commentId: BigInt(commentId),
                postId: BigInt(postId),
                memberId: BigInt(memberId),
                isDeleted: false,
                post: {
                    isDeleted: false,
                }
            },
            include: {
                post: true,
            },
        });

        if (commentSchema === null) {
            throw new Error("게시물 또는 댓글이 존재하지 않음");
        }

        await prisma.comment.update({
            where: {
                commentId: BigInt(commentId),
            },
            data: {
                isDeleted: true,
            },
        });
    }

    async addLikeCount(commentId: number, postId: number) {
        const commentSchema = await prisma.comment.findFirst({
            where: {
                commentId: BigInt(commentId),
                postId: BigInt(postId),
                isDeleted: false,
                post: {
                    isDeleted: false,
                }
            },
            include: {
                post: true,
            }
        });

        if (commentSchema === null) {
            throw new Error("게시물 또는 댓글이 존재하지 않음");
        }

        await prisma.comment.update({
            where: {
                commentId: BigInt(commentId),
                postId: BigInt(postId),
            },
            data: {
                likeCount: {
                    increment: 1,
                }
            },
        });
    }

    async addWarningCount(commentId: number, postId: number) {
        const commentSchema = await prisma.comment.findFirst({
            where: {
                commentId: BigInt(commentId),
                postId: BigInt(postId),
                isDeleted: false,
                post: {
                    isDeleted: false,
                }
            },
            include: {
                post: true,
            }
        });

        if (commentSchema === null) {
            throw new Error("게시물 또는 댓글이 존재하지 않음");
        }

        await prisma.comment.update({
            where: {
                commentId: BigInt(commentId),
                postId: BigInt(postId),
            },
            data: {
                warningCount: {
                    increment: 1,
                }
            },
        });
    }
}