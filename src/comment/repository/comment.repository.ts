import prisma from "../../config/database";

export class CommentRepository {
    async findCommentsByPostId(postId: number) {
        const comments = await prisma.comment.findMany({
            where: {
                postId: BigInt(postId),
            },
            include: {
                replies: true // 댓글에 대한 대댓글도 포함하고 싶다면
            },
            orderBy: {
                createdAt: 'asc' // 생성일 기준으로 오름차순 정렬 (최신순은 'desc')
            }
        });

        return comments;
    }
}
