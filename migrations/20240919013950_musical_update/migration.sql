/*
  Warnings:

  - You are about to drop the `musical` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `musical_detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ticket_agency` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `musical_detail` DROP FOREIGN KEY `musical_detail_musicalId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_musicalId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_musicalId_fkey`;

-- DropForeignKey
ALTER TABLE `ticket_agency` DROP FOREIGN KEY `ticket_agency_musicalDetailId_fkey`;

-- DropForeignKey
ALTER TABLE `wishlist` DROP FOREIGN KEY `wishlist_musicalId_fkey`;

-- DropTable
DROP TABLE `musical`;

-- DropTable
DROP TABLE `musical_detail`;

-- DropTable
DROP TABLE `ticket_agency`;

-- CreateTable
CREATE TABLE `Musical` (
    `musicalId` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Musical_name_key`(`name`),
    PRIMARY KEY (`musicalId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MusicalDetail` (
    `musicalDetailId` BIGINT NOT NULL AUTO_INCREMENT,
    `musicalId` BIGINT NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `cast` VARCHAR(191) NOT NULL,
    `runtime` VARCHAR(191) NOT NULL,
    `ageRating` VARCHAR(191) NOT NULL,
    `productionCompany` VARCHAR(191) NOT NULL,
    `ticketAgencies` JSON NOT NULL,

    UNIQUE INDEX `MusicalDetail_musicalId_key`(`musicalId`),
    PRIMARY KEY (`musicalDetailId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketAgency` (
    `agencyId` BIGINT NOT NULL AUTO_INCREMENT,
    `agencyName` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TicketAgency_agencyName_url_key`(`agencyName`, `url`),
    PRIMARY KEY (`agencyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MusicalDetail` ADD CONSTRAINT `MusicalDetail_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `Musical`(`musicalId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `Post_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `Musical`(`musicalId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `Review_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `Musical`(`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wishlist` ADD CONSTRAINT `Wishlist_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `Musical`(`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE;
