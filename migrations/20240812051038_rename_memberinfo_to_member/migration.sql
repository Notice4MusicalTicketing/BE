/*
  Warnings:

  - You are about to drop the `memberinfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `wishlist` DROP FOREIGN KEY `Wishlist_memberId_fkey`;

-- DropTable
DROP TABLE `memberinfo`;

-- CreateTable
CREATE TABLE `member` (
    `memberId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `loginStatus` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `member_email_key`(`email`),
    PRIMARY KEY (`memberId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;
