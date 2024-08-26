import { PostService } from "../services/post.service";
import { Request, Response } from "express";
import { CreatePostDto } from "../dtos/post.dto";
import { Post, PostPreview } from "../entities/post.entity";

const postService = new PostService();

export class PostController {
  async createPost(req: Request, res: Response) {
    const createPostDto: CreatePostDto = req.body;
    const member = req.user;

    if (!member) {
      res.status(400).json({ result: false, message: `로그인 중이 아닙니다.` });
      return;
    }

    try {
      const newPost = await postService.createPost(createPostDto, member);
      res.status(201).json({ result: true, message: "SUCCESS" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ result: false, error: "게시물 작성에 실패함" });
    }
  }

  async deletePost(req: Request, res: Response) {
    const member = req.user;

    if (!member) {
      res.status(400).json({ result: false, message: `로그인 중이 아닙니다.` });
      return;
    }

    const { postId } = req.params;

    try {
      const deletedPost = await postService.deletePost(Number(postId), member.memberId);
      res.status(200).json({ result: true, message: "게시물 삭제에 성공함" });
    } catch (err: any) {
      console.error(err);
      res.status(400).json({ result: false, message: err.message });
    }
  }

  async getPost(req: Request, res: Response) {
    const member = req.user;

    if (!member) {
      res.status(400).json({ result: false, message: `로그인 중이 아닙니다.` });
      return;
    }

    const { postId } = req.params;

    try {
      const post: Post = await postService.getPostByPostId(Number(postId));
      res.status(200).json({ result: true, post });
    } catch (err: any) {
      console.error(err);
      res.status(400).json({ result: false, message: err.message });
    }
  }

  async getPreviewPosts(req: Request, res: Response) {
    const member = req.user;
    const { category } = req.query;

    if (!member) {
      res.status(400).json({ result: false, message: `로그인 중이 아닙니다.` });
      return;
    }

    try {
      let posts: PostPreview[];
      if (category) {
        if (!(category === "review" || category === "friend" || category === "deal")) {
          res.status(400).send(`카테고리 타입이 유효하지 않음`);
          return;
        }
        posts = await postService.getPostsByCategory(category as string);
      } else {
        posts = await postService.getAllPosts();
      }

      res.status(200).json({ result: true, posts });
    } catch (err: any) {
      console.error(err);
      res.status(400).json({ result: false, message: err.message });
    }
  }

  async addLikeCount(req: Request, res: Response) {
    const member = req.user;

    if (!member) {
      res.status(400).json({ result: false, message: `로그인 중이 아닙니다.` });
      return;
    }

    const { postId } = req.params;

    try {
      const addLike = await postService.addLikeCount(Number(postId));
      res.status(201).json({ result: true, message: "게시글 추천하기 성공" });
    } catch (err: any) {
      console.error(err);
      res.status(400).json({ result: false, message: err.message });
    }
  }

  async addWarningCount(req: Request, res: Response) {
    const member = req.user;

    if (!member) {
      res.status(400).json({ result: false, message: `로그인 중이 아닙니다.` });
      return;
    }

    const { postId } = req.params;

    try {
      const addWarning = await postService.addWarningCount(Number(postId));
      res.status(201).json({ result: true, message: "게시글 신고하기 성공" });
    } catch (err: any) {
      console.error(err);
      res.status(400).json({ result: false, message: err.message });
    }
  }

  async updatePost(req: Request, res: Response) {
    const updatePostDto: CreatePostDto = req.body;
    const member = req.user;

    if (!member) {
      res.status(400).json({ result: false, message: `로그인 중이 아닙니다.` });
      return;
    }

    const { postId } = req.params;

    try {
      const updatePost = await postService.updatePost(Number(postId), updatePostDto, member);
      res.status(200).json({ result: true, message: "게시글 수정 성공" });
    } catch (err: any) {
      console.error(err);
      res.status(400).json({ result: false, message: err.message });
    }
  }
}
