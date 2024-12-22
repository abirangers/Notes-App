/*
  Warnings:

  - You are about to drop the column `userId` on the `notes` table. All the data in the column will be lost.
  - Added the required column `username` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `notes` DROP FOREIGN KEY `notes_userId_fkey`;

-- DropIndex
DROP INDEX `notes_userId_fkey` ON `notes`;

-- AlterTable
ALTER TABLE `notes` DROP COLUMN `userId`,
    ADD COLUMN `username` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
