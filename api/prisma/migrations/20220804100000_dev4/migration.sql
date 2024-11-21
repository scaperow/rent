/*
  Warnings:

  - You are about to drop the column `tel` on the `MaterialCategory` table. All the data in the column will be lost.
  - You are about to drop the column `unitId` on the `MaterialCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `MaterialCategory` DROP FOREIGN KEY `MaterialCategory_unitId_fkey`;

-- AlterTable
ALTER TABLE `MaterialCategory` DROP COLUMN `tel`,
    DROP COLUMN `unitId`;
