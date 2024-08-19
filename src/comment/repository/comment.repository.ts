import prisma from "../../config/database";

export class CommentRepository {
    async findCommentsByPostId(postId: number) {
        const comments = await prisma.comment.findMany({
            where: {
                post_id: BigInt(postId),
            },
            include: {
                replies: true // 댓글에 대한 대댓글도 포함하고 싶다면
            },
            orderBy: {
                created_at: 'asc' // 생성일 기준으로 오름차순 정렬 (최신순은 'desc')
            }
        });

        return comments;
    }
}
