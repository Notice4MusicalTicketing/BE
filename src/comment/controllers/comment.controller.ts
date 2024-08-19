import {Request, Response} from "express";
import {CreateCommentDto} from "../dtos/comment.dto";
import {CommentService} from "../services/comment.service";

const commentService = new CommentService();

export class CommentController {
    async createComment(req: Request, res: Response) {
        const createCommentDto: CreateCommentDto = req.body;
        const member = req.user;

        if (!member){
            res.status(400).json({result: false, message: `로그인 중이 아닙니다.`});
            return;
        }

        try {
            const newComment = await commentService.createComment(createCommentDto, member);
            res.status(201).json({result: true, message: "댓글 작성 완료"});
        } catch (err: any) {
            console.error(err);
            res.status(500).json({result: false, message: "댓글 작성에 실패함"});
        }
    }

    async fetchCommentsByPostId(req: Request, res: Response) {
        const member = req.user;
        const {postId} = req.params;

        if (!member){
            res.status(400).json({result: false, message: `로그인 중이 아닙니다.`});
            return;
        }

        try {
            const comments = await commentService.getCommentsByPostId(Number(postId));
            res.status(200).json({result: true, message: "댓글 작성 완료"});
        } catch (err: any) {
            console.error(err);
            res.status(500).json({result: false, message: "댓글 작성에 실패함"});
        }
    }
}