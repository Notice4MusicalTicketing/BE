import {category} from "../types/post.type";

export interface CreatePostDto {
    title: string;
    content: string;
    category: category
}