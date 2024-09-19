/*
  Warnings:

  - You are about to alter the column `refreshToken` on the `member` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the `Musical` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MusicalDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `MusicalDetail` DROP FOREIGN KEY `MusicalDetail_musicalId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_musicalId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_musicalId_fkey`;

-- DropForeignKey
ALTER TABLE `wishlist` DROP FOREIGN KEY `Wishlist_musicalId_fkey`;

-- AlterTable
ALTER TABLE `member` MODIFY `refreshToken` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Musical`;

-- DropTable
DROP TABLE `MusicalDetail`;

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
    `runtime` INTEGER NULL,
    `ageRating` VARCHAR(191) NOT NULL DEFAULT '',
    `productionCompany` VARCHAR(191) NOT NULL DEFAULT '',
    `ticketPrice` VARCHAR(191) NOT NULL DEFAULT '',
    `posterImagePath` VARCHAR(191) NOT NULL DEFAULT '',
    `synopsis` VARCHAR(191) NOT NULL DEFAULT '',
    `genre` VARCHAR(191) NOT NULL DEFAULT '',
    `introImages` JSON NOT NULL,
    `showtimes` VARCHAR(191) NOT NULL DEFAULT '',
    `facilityDetails` VARCHAR(191) NOT NULL DEFAULT '',
    `ticketAgencies` JSON NOT NULL,

    UNIQUE INDEX `musical_detail_musicalId_key`(`musicalId`),
    INDEX `MusicalDetail_musicalId_idx`(`musicalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `musical_detail` ADD CONSTRAINT `musical_detail_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `musical`(`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `musical`(`musicalId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `musical`(`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wishlist` ADD CONSTRAINT `wishlist_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `musical`(`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE;
