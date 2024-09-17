import {Post, PostPreview} from "../entities/post.entity";
import {Cursor, Pagination} from "../../utils/pagination";
import prisma from "../../config/database";

export class PostRepository {
    async findPostPreviewsByRecent(
        cursor: string | null = null,
        pageSize: number = 20
    ): Promise<Pagination<PostPreview[]>> {
        let cursorDate: Date;
        if (cursor) {
            cursorDate = new Date(cursor);
            if (isNaN(cursorDate.getTime())) {
                console.error(`Invalid cursor date provided: ${cursor}`);
                cursorDate = new Date(); // 유효하지 않은 경우 현재 날짜로 설정
            }
        } else {
            cursorDate = new Date();
        }
        pageSize = 20;

        const postSchemas = await prisma.post.findMany({
            where: {
                isDeleted: false,
                ...(cursorDate && { createdAt: { lt: cursorDate } }),
            },
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                postId: true,
                title: true,
                sample: true,
                likeCount: true,
                replyCount: true,
                category: true,
                member: {
                    select: {
                        nickname: true,
                    }
                },
                createdAt: true,
            },
            take: pageSize,
        });

        const postPreviews: PostPreview[] = postSchemas.map(postSchema => ({
            postId: Number(postSchema.postId),
            nickname: postSchema.member.nickname,
            title: postSchema.title,
            sample: postSchema.sample,
            likeCount: postSchema.likeCount,
            replyCount: postSchema.replyCount,
            category: postSchema.category,
            createdAt: postSchema.createdAt,
        }));

        const elementCount = postPreviews.length;
        const lastCreatedAt = postSchemas[elementCount - 1]?.createdAt;
        const hasNext = lastCreatedAt ?
            (await prisma.post.count({
                where: {
                    isDeleted: false,
                    createdAt: {
                        lt: lastCreatedAt,
                    },
                },
                take: 1,
            })) > 0
            : false;
        const totalCount = await prisma.post.count({
            where: {
                isDeleted: false,
            },
        });

        const cursorInfo: Cursor = {
            cursor: hasNext ? lastCreatedAt.toISOString() : null,
            pageSize: pageSize,
            elementCount: elementCount,
            hasNext: hasNext,
            totalCount: totalCount,
        };

        return {
            data: postPreviews,
            cursorInfo: cursorInfo,
        }
    }

    async findPostPreviewsByCategory(
        category: string,
        cursor: string | null,
        pageSize: number = 20,
        ): Promise<Pagination<PostPreview[]>> {
        const postSchemas = await prisma.post.findMany({
            where: {
                category: category,
                isDeleted: false,
                createdAt: cursor ? { lt: cursor } : undefined,
            },
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                postId: true,
                title: true,
                sample: true,
                likeCount: true,
                replyCount: true,
                category: true,
                member: {
                    select: {
                        nickname: true,
                    }
                },
                createdAt: true,
            },
            take: pageSize,
        });

        const postPreviews: PostPreview[] = postSchemas.map(postSchema => ({
            postId: Number(postSchema.postId),
            nickname: postSchema.member.nickname,
            title: postSchema.title,
            sample: postSchema.sample,
            likeCount: postSchema.likeCount,
            replyCount: postSchema.replyCount,
            category: postSchema.category,
            createdAt: postSchema.createdAt,
        }));

        const elementCount = postPreviews.length;
        const lastCreatedAt = postSchemas[elementCount - 1]?.createdAt;
        const hasNext = lastCreatedAt ?
            (await prisma.post.count({
                where: {
                    isDeleted: false,
                    createdAt: {
                        lt: lastCreatedAt,
                    },
                    category: category,
                },
                take: 1,
            })) > 0
            : false;
        const totalCount = await prisma.post.count({
            where: {
                isDeleted: false,
                category: category,
            },
        });

        const cursorInfo: Cursor = {
            cursor: hasNext ? lastCreatedAt.toISOString() : null,
            pageSize: pageSize,
            elementCount: elementCount,
            hasNext: hasNext,
            totalCount: totalCount,
        };

        return {
            data: postPreviews,
            cursorInfo: cursorInfo,
        }
    }

    async findPostPreviewsByCriteria(
        criteria: string,
        cursor: string | null,
        pageSize: number = 20,
    ): Promise<Pagination<PostPreview[]>> {
        const postSchemas = await prisma.post.findMany({
            where: {
                isDeleted: false,
                createdAt: cursor ? { lt: cursor } : undefined,
                OR: [
                    {
                        content: {
                            contains: criteria,
                        },
                    },
                    {
                        title: {
                            contains: criteria,
                        },
                    },
                ],
            },
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                postId: true,
                title: true,
                sample: true,
                likeCount: true,
                replyCount: true,
                category: true,
                member: {
                    select: {
                        nickname: true,
                    }
                },
                createdAt: true,
            },
            take: pageSize,
        });

        const postPreviews: PostPreview[] = postSchemas.map(postSchema => ({
            postId: Number(postSchema.postId),
            nickname: postSchema.member.nickname,
            title: postSchema.title,
            sample: postSchema.sample,
            likeCount: postSchema.likeCount,
            replyCount: postSchema.replyCount,
            category: postSchema.category,
            createdAt: postSchema.createdAt,
        }));

        const elementCount = postPreviews.length;
        const lastCreatedAt = postSchemas[elementCount - 1]?.createdAt;
        const hasNext = lastCreatedAt ?
            (await prisma.post.count({
                where: {
                    isDeleted: false,
                    createdAt: {
                        lt: lastCreatedAt,
                    },
                    OR: [
                        {
                            content: {
                                contains: criteria,
                            },
                        },
                        {
                            title: {
                                contains: criteria,
                            },
                        },
                    ],
                },
                take: 1,
            })) > 0
            : false;
        const totalCount = await prisma.post.count({
            where: {
                isDeleted: false,
                OR: [
                    {
                        content: {
                            contains: criteria,
                        },
                    },
                    {
                        title: {
                            contains: criteria,
                        },
                    },
                ],
            },
        });

        const cursorInfo: Cursor = {
            cursor: hasNext ? lastCreatedAt.toISOString() : null,
            pageSize: pageSize,
            elementCount: elementCount,
            hasNext: hasNext,
            totalCount: totalCount,
        };

        return {
            data: postPreviews,
            cursorInfo: cursorInfo,
        }
    }
}