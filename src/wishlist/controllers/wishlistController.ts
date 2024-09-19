import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addFavorite = async (req: Request, res: Response) => {
  const { memberId, musicalId } = req.body;

  try {
    // `findFirst`를 사용하여 복합 키로 검색
    const existingFavorite = await prisma.wishlist.findFirst({
      where: {
        memberId: BigInt(memberId),
        musicalId: BigInt(musicalId),
      },
    });

    if (existingFavorite) {
      return res.status(400).json({ message: 'Already added to favorites' });
    }

    const favorite = await prisma.wishlist.create({
      data: {
        memberId: BigInt(memberId),
        musicalId: BigInt(musicalId),
      },
    });

    res.status(201).json(favorite);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Error adding favorite: ${error.message}` });
    } else {
      res.status(500).json({ message: 'Unknown error occurred while adding favorite' });
    }
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  const { memberId, musicalId } = req.params;

  try {
    // `deleteMany`를 사용하여 복합 키로 삭제
    const favorite = await prisma.wishlist.deleteMany({
      where: {
        memberId: BigInt(memberId),
        musicalId: BigInt(musicalId),
      },
    });

    if (favorite.count === 0) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.status(200).json({ message: 'Favorite removed successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Error removing favorite: ${error.message}` });
    } else {
      res.status(500).json({ message: 'Unknown error occurred while removing favorite' });
    }
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  const { memberId } = req.params;

  try {
    const favorites = await prisma.wishlist.findMany({
      where: { memberId: BigInt(memberId) },
      include: {
        musical: true,
      },
    });

    res.status(200).json(favorites);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Error fetching favorites: ${error.message}` });
    } else {
      res.status(500).json({ message: 'Unknown error occurred while fetching favorites' });
    }
  }
};
