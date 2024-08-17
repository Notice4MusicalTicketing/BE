/*
  Warnings:

  - The primary key for the `member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `loginStatus` on the `member` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `member` table. All the data in the column will be lost.
  - You are about to alter the column `nickname` on the `member` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(8)`.
  - The primary key for the `musical` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `endDate` on the `musical` table. All the data in the column will be lost.
  - You are about to drop the column `musicalId` on the `musical` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `musical` table. All the data in the column will be lost.
  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `likeCount` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `musicalId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `warningCount` on the `post` table. All the data in the column will be lost.
  - The primary key for the `review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `memberId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `musicalId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `reviewId` on the `review` table. All the data in the column will be lost.
  - The primary key for the `wishlist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `memberId` on the `wishlist` table. All the data in the column will be lost.
  - You are about to drop the column `musicalId` on the `wishlist` table. All the data in the column will be lost.
  - You are about to drop the column `wishlistId` on the `wishlist` table. All the data in the column will be lost.
  - You are about to drop the `musicaldetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ticketagency` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `member_id` to the `member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `musical` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musical_id` to the `musical` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `musical` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member_id` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member_id` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musical_id` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review_id` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member_id` to the `wishlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musical_id` to the `wishlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wishlist_id` to the `wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `musicaldetail` DROP FOREIGN KEY `MusicalDetail_musicalId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_musicalId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_musicalId_fkey`;

-- DropForeignKey
ALTER TABLE `ticketagency` DROP FOREIGN KEY `TicketAgency_musicalDetailId_fkey`;

-- DropForeignKey
ALTER TABLE `wishlist` DROP FOREIGN KEY `Wishlist_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `wishlist` DROP FOREIGN KEY `Wishlist_musicalId_fkey`;

-- AlterTable
ALTER TABLE `member` DROP PRIMARY KEY,
    DROP COLUMN `loginStatus`,
    DROP COLUMN `memberId`,
    ADD COLUMN `member_id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD COLUMN `refresh_token` VARCHAR(255) NULL,
    ADD COLUMN `username` VARCHAR(32) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `nickname` VARCHAR(8) NOT NULL,
    ADD PRIMARY KEY (`member_id`);

-- AlterTable
ALTER TABLE `musical` DROP PRIMARY KEY,
    DROP COLUMN `endDate`,
    DROP COLUMN `musicalId`,
    DROP COLUMN `startDate`,
    ADD COLUMN `average_rating` DOUBLE NOT NULL DEFAULT 0.0,
    ADD COLUMN `end_date` DATETIME(3) NOT NULL,
    ADD COLUMN `musical_id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD COLUMN `start_date` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`musical_id`);

-- AlterTable
ALTER TABLE `post` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `likeCount`,
    DROP COLUMN `memberId`,
    DROP COLUMN `musicalId`,
    DROP COLUMN `postId`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `warningCount`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `like_count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `member_id` BIGINT NOT NULL,
    ADD COLUMN `musical_id` BIGINT NULL,
    ADD COLUMN `post_id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD COLUMN `reply_count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `updated_at` DATETIME(3) NULL,
    ADD COLUMN `views` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `warning_count` INTEGER NOT NULL DEFAULT 0,
    ADD PRIMARY KEY (`post_id`);

-- AlterTable
ALTER TABLE `review` DROP PRIMARY KEY,
    DROP COLUMN `memberId`,
    DROP COLUMN `musicalId`,
    DROP COLUMN `reviewId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `member_id` BIGINT NOT NULL,
    ADD COLUMN `musical_id` BIGINT NOT NULL,
    ADD COLUMN `review_id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `rating` INTEGER NOT NULL,
    ADD PRIMARY KEY (`review_id`);

-- AlterTable
ALTER TABLE `wishlist` DROP PRIMARY KEY,
    DROP COLUMN `memberId`,
    DROP COLUMN `musicalId`,
    DROP COLUMN `wishlistId`,
    ADD COLUMN `member_id` BIGINT NOT NULL,
    ADD COLUMN `musical_id` BIGINT NOT NULL,
    ADD COLUMN `wishlist_id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`wishlist_id`);

-- DropTable
DROP TABLE `musicaldetail`;

-- DropTable
DROP TABLE `ticketagency`;

-- CreateTable
CREATE TABLE `reply` (
    `comment_id` BIGINT NOT NULL AUTO_INCREMENT,
    `reply_id` BIGINT NULL,
    `post_id` BIGINT NOT NULL,
    `member_id` BIGINT NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `musical_detail` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `musical_id` BIGINT NOT NULL,
    `facility_name` VARCHAR(191) NOT NULL,
    `cast` VARCHAR(191) NOT NULL,
    `runtime` INTEGER NOT NULL,
    `age_rating` VARCHAR(191) NOT NULL,
    `production_company` VARCHAR(191) NOT NULL,
    `ticket_price` VARCHAR(191) NOT NULL,
    `poster_image_path` VARCHAR(191) NOT NULL,
    `synopsis` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `intro_images` JSON NOT NULL,
    `showtimes` VARCHAR(191) NOT NULL,
    `facility_details` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `musical_detail_musical_id_key`(`musical_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticket_agency` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `musical_detail_id` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_musical_id_fkey` FOREIGN KEY (`musical_id`) REFERENCES `musical`(`musical_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_musical_id_fkey` FOREIGN KEY (`musical_id`) REFERENCES `musical`(`musical_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wishlist` ADD CONSTRAINT `wishlist_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wishlist` ADD CONSTRAINT `wishlist_musical_id_fkey` FOREIGN KEY (`musical_id`) REFERENCES `musical`(`musical_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `musical_detail` ADD CONSTRAINT `musical_detail_musical_id_fkey` FOREIGN KEY (`musical_id`) REFERENCES `musical`(`musical_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ticket_agency` ADD CONSTRAINT `ticket_agency_musical_detail_id_fkey` FOREIGN KEY (`musical_detail_id`) REFERENCES `musical_detail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
