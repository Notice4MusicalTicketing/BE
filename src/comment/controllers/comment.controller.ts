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
            res.status(200).json({result: true, comments});
        } catch (err: any) {
            console.error(err);
            res.status(500).json({result: false, message: err.message});
        }
    }

    async deleteComment(req: Request, res: Response) {
        const member = req.user;
        const {postId} = req.params;
        const {commentId} = req.params;

        if (!member){
            res.status(400).json({result: false, message: `로그인 중이 아닙니다.`});
            return;
        }

        try {
            const deletedComment = await commentService.deleteComment(Number(commentId), Number(postId), member.memberId);
            res.status(200).json({result: true, message: "댓글이 삭제됨"});
        } catch (err: any) {
            console.error(err);
            res.status(500).json({result: false, message: err.message});
        }
    }

    async addLikeCount(req: Request, res: Response) {
        const member = req.user;
        const {postId} = req.params;
        const {commentId} = req.params;

        if (!member){
            res.status(400).json({result: false, message: `로그인 중이 아닙니다.`});
            return;
        }

        try {
            const addLike = await commentService.addLikeCount(Number(commentId), Number(postId));
            res.status(200).json({result: true, message: "댓글 추천하기 성공"});
        } catch (err: any) {
            console.error(err);
            res.status(500).json({result: false, message: err.message});
        }
    }

    async addWarningCount(req: Request, res: Response) {
        const member = req.user;
        const {postId} = req.params;
        const {commentId} = req.params;

        if (!member){
            res.status(400).json({result: false, message: `로그인 중이 아닙니다.`});
            return;
        }

        try {
            const addWarning = await commentService.addWarningCount(Number(commentId), Number(postId));
            res.status(200).json({result: true, message: "댓글 신고하기 성공"});
        } catch (err: any) {
            console.error(err);
            res.status(500).json({result: false, message: err.message});
        }
    }
}