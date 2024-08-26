/*
  Warnings:

  - The primary key for the `member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `member_id` on the `member` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `member` table. All the data in the column will be lost.
  - You are about to alter the column `password` on the `member` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - The primary key for the `musical` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `average_rating` on the `musical` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `musical` table. All the data in the column will be lost.
  - You are about to drop the column `musical_id` on the `musical` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `musical` table. All the data in the column will be lost.
  - You are about to drop the column `age_rating` on the `musical_detail` table. All the data in the column will be lost.
  - You are about to drop the column `facility_details` on the `musical_detail` table. All the data in the column will be lost.
  - You are about to drop the column `facility_name` on the `musical_detail` table. All the data in the column will be lost.
  - You are about to drop the column `intro_images` on the `musical_detail` table. All the data in the column will be lost.
  - You are about to drop the column `musical_id` on the `musical_detail` table. All the data in the column will be lost.
  - You are about to drop the column `poster_image_path` on the `musical_detail` table. All the data in the column will be lost.
  - You are about to drop the column `production_company` on the `musical_detail` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_price` on the `musical_detail` table. All the data in the column will be lost.
  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `like_count` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `member_id` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `musical_id` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `reply_count` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `warning_count` on the `post` table. All the data in the column will be lost.
  - The primary key for the `reply` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `comment_id` on the `reply` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `reply` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `reply` table. All the data in the column will be lost.
  - You are about to drop the column `member_id` on the `reply` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `reply` table. All the data in the column will be lost.
  - You are about to drop the column `reply_id` on the `reply` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `reply` table. All the data in the column will be lost.
  - The primary key for the `review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `member_id` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `musical_id` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `review_id` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `musical_detail_id` on the `ticket_agency` table. All the data in the column will be lost.
  - The primary key for the `wishlist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `member_id` on the `wishlist` table. All the data in the column will be lost.
  - You are about to drop the column `musical_id` on the `wishlist` table. All the data in the column will be lost.
  - You are about to drop the column `wishlist_id` on the `wishlist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[musicalId]` on the table `musical_detail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `memberId` to the `member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicalId` to the `musical` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicalId` to the `musical_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sample` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentId` to the `reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicalId` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewId` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicalDetailId` to the `ticket_agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `wishlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicalId` to the `wishlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wishlistId` to the `wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `musical_detail` DROP FOREIGN KEY `musical_detail_musical_id_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_member_id_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_musical_id_fkey`;

-- DropForeignKey
ALTER TABLE `reply` DROP FOREIGN KEY `reply_member_id_fkey`;

-- DropForeignKey
ALTER TABLE `reply` DROP FOREIGN KEY `reply_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_member_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_musical_id_fkey`;

-- DropForeignKey
ALTER TABLE `ticket_agency` DROP FOREIGN KEY `ticket_agency_musical_detail_id_fkey`;

-- DropForeignKey
ALTER TABLE `wishlist` DROP FOREIGN KEY `wishlist_member_id_fkey`;

-- DropForeignKey
ALTER TABLE `wishlist` DROP FOREIGN KEY `wishlist_musical_id_fkey`;

-- AlterTable
ALTER TABLE `member` DROP PRIMARY KEY,
    DROP COLUMN `member_id`,
    DROP COLUMN `refresh_token`,
    ADD COLUMN `memberId` BIGINT NOT NULL AUTO_INCREMENT,
    ADD COLUMN `refreshToken` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `nickname` VARCHAR(191) NOT NULL,
    MODIFY `username` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`memberId`);

-- AlterTable
ALTER TABLE `musical` DROP PRIMARY KEY,
    DROP COLUMN `average_rating`,
    DROP COLUMN `end_date`,
    DROP COLUMN `musical_id`,
    DROP COLUMN `start_date`,
    ADD COLUMN `averageRating` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `musicalId` BIGINT NOT NULL AUTO_INCREMENT,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`musicalId`);

-- AlterTable
ALTER TABLE `musical_detail` DROP COLUMN `age_rating`,
    DROP COLUMN `facility_details`,
    DROP COLUMN `facility_name`,
    DROP COLUMN `intro_images`,
    DROP COLUMN `musical_id`,
    DROP COLUMN `poster_image_path`,
    DROP COLUMN `production_company`,
    DROP COLUMN `ticket_price`,
    ADD COLUMN `ageRating` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `facilityDetails` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `facilityName` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `introImages` JSON NOT NULL,
    ADD COLUMN `musicalId` BIGINT NOT NULL,
    ADD COLUMN `posterImagePath` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `productionCompany` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `ticketPrice` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `cast` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `runtime` INTEGER NOT NULL DEFAULT 0,
    MODIFY `synopsis` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `genre` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `showtimes` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `post` DROP PRIMARY KEY,
    DROP COLUMN `created_at`,
    DROP COLUMN `is_deleted`,
    DROP COLUMN `like_count`,
    DROP COLUMN `member_id`,
    DROP COLUMN `musical_id`,
    DROP COLUMN `post_id`,
    DROP COLUMN `reply_count`,
    DROP COLUMN `updated_at`,
    DROP COLUMN `warning_count`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `likeCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `memberId` BIGINT NOT NULL,
    ADD COLUMN `musicalId` BIGINT NULL,
    ADD COLUMN `postId` BIGINT NOT NULL AUTO_INCREMENT,
    ADD COLUMN `replyCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `sample` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL,
    ADD COLUMN `warningCount` INTEGER NOT NULL DEFAULT 0,
    ADD PRIMARY KEY (`postId`);

-- AlterTable
ALTER TABLE `reply` DROP PRIMARY KEY,
    DROP COLUMN `comment_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `is_deleted`,
    DROP COLUMN `member_id`,
    DROP COLUMN `post_id`,
    DROP COLUMN `reply_id`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `commentId` BIGINT NOT NULL AUTO_INCREMENT,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `memberId` BIGINT NOT NULL,
    ADD COLUMN `postId` BIGINT NOT NULL,
    ADD COLUMN `replyId` BIGINT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL,
    ADD PRIMARY KEY (`commentId`);

-- AlterTable
ALTER TABLE `review` DROP PRIMARY KEY,
    DROP COLUMN `created_at`,
    DROP COLUMN `member_id`,
    DROP COLUMN `musical_id`,
    DROP COLUMN `review_id`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `memberId` BIGINT NOT NULL,
    ADD COLUMN `musicalId` BIGINT NOT NULL,
    ADD COLUMN `reviewId` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`reviewId`);

-- AlterTable
ALTER TABLE `ticket_agency` DROP COLUMN `musical_detail_id`,
    ADD COLUMN `musicalDetailId` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `wishlist` DROP PRIMARY KEY,
    DROP COLUMN `member_id`,
    DROP COLUMN `musical_id`,
    DROP COLUMN `wishlist_id`,
    ADD COLUMN `memberId` BIGINT NOT NULL,
    ADD COLUMN `musicalId` BIGINT NOT NULL,
    ADD COLUMN `wishlistId` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`wishlistId`);

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

-- CreateIndex
CREATE UNIQUE INDEX `musical_detail_musicalId_key` ON `musical_detail`(`musicalId`);

-- CreateIndex
CREATE INDEX `reply_member_id_fkey` ON `reply`(`memberId`);

-- CreateIndex
CREATE INDEX `reply_post_id_fkey` ON `reply`(`postId`);

-- CreateIndex
CREATE INDEX `review_member_id_fkey` ON `review`(`memberId`);

-- CreateIndex
CREATE INDEX `review_musical_id_fkey` ON `review`(`musicalId`);

-- CreateIndex
CREATE INDEX `ticket_agency_musical_detail_id_fkey` ON `ticket_agency`(`musicalDetailId`);

-- CreateIndex
CREATE INDEX `wishlist_member_id_fkey` ON `wishlist`(`memberId`);

-- CreateIndex
CREATE INDEX `wishlist_musical_id_fkey` ON `wishlist`(`musicalId`);

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
