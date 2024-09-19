import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const removeFavorite = async (memberId: bigint, musicalId: bigint) => {
    try {
      return await prisma.wishlist.deleteMany({
        where: {
          memberId: memberId,
          musicalId: musicalId,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error removing favorite: ${error.message}`);
      } else {
        throw new Error('Unknown error occurred while removing favorite');
      }
    }
  };
  
  export const getFavorites = async (memberId: bigint) => {
    try {
      return await prisma.wishlist.findMany({
        where: { memberId },
        include: {
          musical: true,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching favorites: ${error.message}`);
      } else {
        throw new Error('Unknown error occurred while fetching favorites');
      }
    }
  };
  