import {CreateCommentDto} from "../dtos/comment.dto";
import {Member} from "../../member/entities/member.entity";
import prisma from "../../config/database";
import {Post} from "../../post/entities/post.entity";
import {Comment, CommentSchema} from "../entities/comment.entity";
import {CommentRepository} from "../repository/comment.repository";
import {CommentConverter} from "../entities/comment.converter";

const commentRepository = new CommentRepository();

export class CommentService {
    async createComment(request: CreateCommentDto, member: Member){
        const commentSchema = await prisma.comment.create({
            data: {
                post_id: request.postId,
                content: request.content,
                member_id: member.member_id,
                parent_id: request.parentId,
            },
        });
    }

    async getCommentsByPostId(postId: number): Promise<void> {
        if (isNaN(postId) || postId === null || postId === undefined) {
            throw new Error("Invalid postId");
        }
        const commentSchemas = await commentRepository.findCommentsByPostId(postId);

        if (commentSchemas === null){
            throw new Error("게시물이 존재하지 않음");
        }
        //
        // commentSchemas.map((schema: CommentSchema) => {
        //     // schema의 replies 도 변환
        //      // 그다음에 루트도 변호니
        // })

        console.log(commentSchemas);

        console.log(commentSchemas[0].replies)
        //
        // const comments = CommentConverter.toEntity(commentSchemas);
        //
        // return comments;


    }
}