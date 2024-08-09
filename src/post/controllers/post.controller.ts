import {PostService} from "../services/post.service";
import {Request, Response} from "express";
import {CreatePostDto} from "../dtos/post.dto";

const postService = new PostService();

export class PostController {
    async createPost(req: Request, res: Response) {
        const createPostDto: CreatePostDto = req.body;
        const member = req.user;

        if (!member){
            res.status(400).json({result: false, message: `로그인 중이 아닙니다.`});
            return;
        }

        try {
            const newPost = await postService.createPost(createPostDto, member);
            res.status(201).json({result: true, message: "SUCCESS"});
        } catch (err) {
            console.error(err);
            res.status(500).json({result: false, error: "게시물 작성에 실패함"});
        }
    }

    async deletePost(req: Request, res: Response) {
        const member = req.user;

        if (!member){
            res.status(400).json({result: false, message: `로그인 중이 아닙니다.`});
            return;
        }

        const {postId} = req.params;

        try {
            const deletedPost = await postService.deletePost(Number(postId), member.member_id);
            res.status(200).json({result: true, message: "게시물 삭제에 성공함"});
        } catch (err: any) {
            console.error(err);
            res.status(400).json({result: false, message: err.message});
        }
    }

    async getPost(req: Request, res: Response) {
        const member = req.user;

        if (!member){
            res.status(400).json({result: false, message: `로그인 중이 아닙니다.`});
            return;
        }

        const {postId} = req.params;

        try {
            const post = await postService.getPostByPostId(Number(postId));
            res.status(200).json({result: true, post});
        } catch (err: any) {
            console.error(err);
            res.status(400).json({result: false, message: err.message});
        }
    }

    async getPreviewPosts(req: Request, res: Response) {
        const member = req.user;

        if (!member){
            res.status(400).json({result: false, message: `로그인 중이 아닙니다.`});
            return;
        }

        try {
            const posts = await postService.getAllPosts();
            res.status(200).json({result: true, posts});
        } catch (err: any) {
            console.error(err);
            res.status(400).json({result: false, message: err.message});
        }
    }
}