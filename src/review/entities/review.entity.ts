export interface Review{
    reviewId: number;
    title: string;
    content: string;
    createdAt: Date;
    rating: number;

    memberId: number;
    musicalId: number;
}

export interface ReviewSchema{
    reviewId: bigint;
    title: string;
    content: string;
    createdAt: Date;
    rating: number;

    memberId: bigint;
    musicalId: bigint;
}