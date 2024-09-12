import prisma from "../../config/database";
import {CommentSchema} from "../entities/comment.entity";

export class CommentRepository {
    async findCommentsByPostId(postId: number) {
        const comments: (CommentSchema & { _count?: { replies: number } })[] = await prisma.comment.findMany({
            where: {
                postId: BigInt(postId), // postId를 bigint로 변환
                post: {
                    isDeleted: false,
                },
                parentId: null,
            },
            include: {
                replies: true, // 댓글에 대한 대댓글 포함
                post: true,
                _count: {
                    select: { replies: true },
                },
            },
            orderBy: {
                createdAt: 'asc', // 생성일 기준으로 오름차순 정렬
            },
        });

        const result: { comments: (CommentSchema & { _count?: { replies: number } })[], count: number } = {
            comments: comments,
            count: 0,
        };

        // comments 배열을 순회하면서 count 값 계산
        for (const comment of comments) {
            result.count += 1; // 각 댓글에 대해 count 1 추가
            if (comment._count && comment._count.replies) {
                result.count += comment._count.replies; // 각 댓글에 있는 대댓글의 수 추가
            }
        }

        return result;
    }

}
