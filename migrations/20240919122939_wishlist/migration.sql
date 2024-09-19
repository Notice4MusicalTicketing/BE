/*
  Warnings:

  - A unique constraint covering the columns `[memberId,musicalId]` on the table `wishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `wishlist_memberId_musicalId_key` ON `wishlist`(`memberId`, `musicalId`);
