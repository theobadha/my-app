/*
  Warnings:

  - You are about to alter the column `rating` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `reviews` MODIFY `rating` TINYINT NOT NULL,
    MODIFY `content` TEXT NULL;

-- AlterTable
ALTER TABLE `summaries` MODIFY `content` TEXT NOT NULL;
