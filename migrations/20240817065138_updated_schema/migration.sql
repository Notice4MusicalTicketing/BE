/*
  Warnings:

  - You are about to drop the column `email` on the `member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `member` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `member_email_key` ON `member`;

-- AlterTable
ALTER TABLE `member` DROP COLUMN `email`;

-- CreateIndex
CREATE UNIQUE INDEX `member_username_key` ON `member`(`username`);

-- AddForeignKey
ALTER TABLE `reply` ADD CONSTRAINT `reply_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `post`(`post_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reply` ADD CONSTRAINT `reply_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
