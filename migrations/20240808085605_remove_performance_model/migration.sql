/*
  Warnings:

  - You are about to drop the `member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `performance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `member`;

-- DropTable
DROP TABLE `performance`;

-- CreateTable
CREATE TABLE `MemberInfo` (
    `memberId` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `loginStatus` VARCHAR(191) NOT NULL DEFAULT 'N',

    UNIQUE INDEX `MemberInfo_email_key`(`email`),
    PRIMARY KEY (`memberId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wishlist` (
    `wishlistId` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `musicalId` INTEGER NOT NULL,

    UNIQUE INDEX `Wishlist_memberId_musicalId_key`(`memberId`, `musicalId`),
    PRIMARY KEY (`wishlistId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Musical` (
    `musicalId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `sessionInfo` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`musicalId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `reviewId` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `musicalId` INTEGER NOT NULL,
    `rating` DOUBLE NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`reviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `postId` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `musicalId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `likeCount` INTEGER NOT NULL DEFAULT 0,
    `warningCount` INTEGER NOT NULL DEFAULT 0,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `MemberInfo`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `Musical`(`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `MemberInfo`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `Musical`(`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `MemberInfo`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `Musical`(`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE;
