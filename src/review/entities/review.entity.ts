export interface Review{
    reviewId: number;
    content: string;
    createdAt: Date;
    rating: number;
    warningCount: number;

    memberId: number;
    musicalId: number;
}

export interface ReviewSchema{
    reviewId: bigint;
    content: string;
    createdAt: Date;
    rating: number;
    warningCount: number;

    memberId: bigint;
    musicalId: bigint;
}