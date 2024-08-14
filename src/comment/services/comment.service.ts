import {CreateCommentDto} from "../dtos/comment.dto";
import {Member} from "../../member/entities/member.entity";
import prisma from "../../config/database";
import {Post} from "../../post/entities/post.entity";
import {Comment} from "../entities/comment.entity";

export class CommentService {
    async createComment(request: CreateCommentDto, member: Member, post: Post){
        const commentSchema = await prisma.comment.create({
            data: {
                post_id: post.post_id,
                content: request.content,
                member_id: member.member_id,
                parent_id: request.parent_id || null
            },
        });
    }

}