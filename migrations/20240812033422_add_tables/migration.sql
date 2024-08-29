/*
  Warnings:

  - The primary key for the `memberinfo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `musical` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sessionInfo` on the `musical` table. All the data in the column will be lost.
  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isPublic` on the `post` table. All the data in the column will be lost.
  - The primary key for the `review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `wishlist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_musicalId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_musicalId_fkey`;

-- DropForeignKey
ALTER TABLE `wishlist` DROP FOREIGN KEY `Wishlist_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `wishlist` DROP FOREIGN KEY `Wishlist_musicalId_fkey`;

-- DropIndex
DROP INDEX `Wishlist_memberId_musicalId_key` ON `wishlist`;

-- AlterTable
ALTER TABLE `memberinfo` DROP PRIMARY KEY,
    MODIFY `memberId` VARCHAR(191) NOT NULL,
    ALTER COLUMN `loginStatus` DROP DEFAULT,
    ADD PRIMARY KEY (`memberId`);

-- AlterTable
ALTER TABLE `musical` DROP PRIMARY KEY,
    DROP COLUMN `sessionInfo`,
    MODIFY `musicalId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`musicalId`);

-- AlterTable
ALTER TABLE `post` DROP PRIMARY KEY,
    DROP COLUMN `isPublic`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL,
    MODIFY `postId` VARCHAR(191) NOT NULL,
    MODIFY `memberId` VARCHAR(191) NOT NULL,
    MODIFY `musicalId` VARCHAR(191) NOT NULL,
    ALTER COLUMN `likeCount` DROP DEFAULT,
    ALTER COLUMN `warningCount` DROP DEFAULT,
    ADD PRIMARY KEY (`postId`);

-- AlterTable
ALTER TABLE `review` DROP PRIMARY KEY,
    MODIFY `reviewId` VARCHAR(191) NOT NULL,
    MODIFY `memberId` VARCHAR(191) NOT NULL,
    MODIFY `musicalId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`reviewId`);

-- AlterTable
ALTER TABLE `wishlist` DROP PRIMARY KEY,
    MODIFY `wishlistId` VARCHAR(191) NOT NULL,
    MODIFY `memberId` VARCHAR(191) NOT NULL,
    MODIFY `musicalId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`wishlistId`);

-- CreateTable
CREATE TABLE `MusicalDetail` (
    `id` VARCHAR(191) NOT NULL,
    `musicalId` VARCHAR(191) NOT NULL,
    `facilityName` VARCHAR(191) NOT NULL,
    `cast` VARCHAR(191) NOT NULL,
    `runtime` INTEGER NOT NULL,
    `ageRating` VARCHAR(191) NOT NULL,
    `productionCompany` VARCHAR(191) NOT NULL,
    `ticketPrice` VARCHAR(191) NOT NULL,
    `posterImagePath` VARCHAR(191) NOT NULL,
    `synopsis` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `introImages` JSON NOT NULL,
    `showtimes` VARCHAR(191) NOT NULL,
    `facilityDetails` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MusicalDetail_musicalId_key`(`musicalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketAgency` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `musicalDetailId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `MemberInfo`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `Musical`(`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicalDetail` ADD CONSTRAINT `MusicalDetail_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `Musical`(`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketAgency` ADD CONSTRAINT `TicketAgency_musicalDetailId_fkey` FOREIGN KEY (`musicalDetailId`) REFERENCES `MusicalDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `MemberInfo`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `Musical`(`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `MemberInfo`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `Musical`(`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE;
