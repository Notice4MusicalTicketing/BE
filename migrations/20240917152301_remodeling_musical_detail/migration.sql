/*
  Warnings:

  - You are about to drop the `MemberInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Musical` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_musicalId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_musicalId_fkey`;

-- DropForeignKey
ALTER TABLE `Wishlist` DROP FOREIGN KEY `Wishlist_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `Wishlist` DROP FOREIGN KEY `Wishlist_musicalId_fkey`;

-- DropTable
DROP TABLE `MemberInfo`;

-- DropTable
DROP TABLE `Musical`;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `Review`;

-- DropTable
DROP TABLE `Wishlist`;

-- CreateTable
CREATE TABLE `musical` (
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `averageRating` DOUBLE NOT NULL DEFAULT 0,
    `endDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `musicalId` BIGINT NOT NULL AUTO_INCREMENT,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`musicalId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `musical_detail` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `musicalId` BIGINT NOT NULL,
    `facilityName` VARCHAR(191) NOT NULL DEFAULT '',
    `cast` VARCHAR(191) NOT NULL DEFAULT '',
    `runtime` INTEGER NOT NULL DEFAULT 0,
    `ageRating` VARCHAR(191) NOT NULL DEFAULT '',
    `productionCompany` VARCHAR(191) NOT NULL DEFAULT '',
    `ticketPrice` VARCHAR(191) NOT NULL DEFAULT '',
    `posterImagePath` VARCHAR(191) NOT NULL DEFAULT '',
    `synopsis` VARCHAR(191) NOT NULL DEFAULT '',
    `genre` VARCHAR(191) NOT NULL DEFAULT '',
    `introImages` JSON NOT NULL,
    `showtimes` VARCHAR(191) NOT NULL DEFAULT '',
    `facilityDetails` VARCHAR(191) NOT NULL DEFAULT '',

    UNIQUE INDEX `musical_detail_musicalId_key`(`musicalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticket_agency` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `musicalDetailId` BIGINT NOT NULL,

    INDEX `ticket_agency_musical_detail_id_fkey`(`musicalDetailId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member` (
    `memberId` BIGINT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(255) NULL,

    UNIQUE INDEX `member_username_key`(`username`),
    PRIMARY KEY (`memberId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `postId` BIGINT NOT NULL AUTO_INCREMENT,
    `memberId` BIGINT NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `sample` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `likeCount` INTEGER NOT NULL DEFAULT 0,
    `warningCount` INTEGER NOT NULL DEFAULT 0,
    `replyCount` INTEGER NOT NULL DEFAULT 0,
    `views` INTEGER NOT NULL DEFAULT 0,
    `category` VARCHAR(191) NOT NULL,
    `musicalId` BIGINT NULL,

    PRIMARY KEY (`postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `commentId` BIGINT NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `likeCount` INTEGER NOT NULL DEFAULT 0,
    `warningCount` INTEGER NOT NULL DEFAULT 0,
    `replyCount` INTEGER NOT NULL DEFAULT 0,
    `postId` BIGINT NOT NULL,
    `memberId` BIGINT NOT NULL,
    `parentId` BIGINT NULL,

    PRIMARY KEY (`commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reply` (
    `commentId` BIGINT NOT NULL AUTO_INCREMENT,
    `replyId` BIGINT NULL,
    `postId` BIGINT NOT NULL,
    `memberId` BIGINT NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `reply_member_id_fkey`(`memberId`),
    INDEX `reply_post_id_fkey`(`postId`),
    PRIMARY KEY (`commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `rating` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `memberId` BIGINT NOT NULL,
    `musicalId` BIGINT NOT NULL,
    `warningCount` INTEGER NOT NULL DEFAULT 0,
    `reviewId` BIGINT NOT NULL AUTO_INCREMENT,

    INDEX `review_member_id_fkey`(`memberId`),
    INDEX `review_musical_id_fkey`(`musicalId`),
    PRIMARY KEY (`reviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wishlist` (
    `memberId` BIGINT NOT NULL,
    `musicalId` BIGINT NOT NULL,
    `wishlistId` BIGINT NOT NULL AUTO_INCREMENT,

    INDEX `wishlist_member_id_fkey`(`memberId`),
    INDEX `wishlist_musical_id_fkey`(`musicalId`),
    PRIMARY KEY (`wishlistId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `musical_detail` ADD CONSTRAINT `musical_detail_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `musical`(`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ticket_agency` ADD CONSTRAINT `ticket_agency_musicalDetailId_fkey` FOREIGN KEY (`musicalDetailId`) REFERENCES `musical_detail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `musical`(`musicalId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post`(`postId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `comment`(`commentId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reply` ADD CONSTRAINT `reply_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reply` ADD CONSTRAINT `reply_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post`(`postId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `musical`(`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wishlist` ADD CONSTRAINT `wishlist_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wishlist` ADD CONSTRAINT `wishlist_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `musical`(`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE;
