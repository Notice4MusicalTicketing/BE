-- CreateTable
CREATE TABLE `member` (
    `member_id` BIGINT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(32) NOT NULL,
    `nickname` VARCHAR(8) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `member_username_key`(`username`),
    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `performance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `musicalId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `startDate` VARCHAR(191) NOT NULL,
    `endDate` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `ticketOpen` BOOLEAN NOT NULL,
    `sessionInfo` INTEGER NOT NULL,
    `cast` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `performance_musicalId_key`(`musicalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
