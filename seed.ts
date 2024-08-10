import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // 회원 정보 삽입
    await prisma.memberInfo.create({
        data: {
            memberId: '01001',  
            email: 'sara20041207@gmail.com',
            password: '12345678',
            nickname: 'Sara',
            loginStatus: 'Y',
        },
    });

    // 뮤지컬 정보 삽입
    await prisma.musical.create({
        data: {
            musicalId: '03001',
            name: '어쩌면 해피엔딩',
            status: '공연중',
            roundInfo: 5,  // 필드가 정의되어 있어야 합니다.
            startDate: new Date('2024-06-18'),
            endDate: new Date('2024-09-08'),
        },
    });

    // 찜 목록 정보 삽입
    await prisma.wishlist.create({
        data: {
            wishlistId: '02001',  // 숫자로 변경
            memberId: '01001',  // 숫자로 변경
            musicalId: '03001',  // 숫자로 변경
        },
    });

    // 리뷰 정보 삽입
    await prisma.review.create({
        data: {
            reviewId: '04001',  // 숫자로 변경
            memberId: '01001',  // 숫자로 변경
            musicalId: '03001',  // 숫자로 변경
            rating: 5.0,
            title: '너무 좋았어요!',
            content: '스토리와 캐스팅 모두가 너무나도 좋았어요',
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
