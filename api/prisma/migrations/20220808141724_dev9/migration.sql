/*
  Warnings:

  - Added the required column `fee` to the `UnitConversion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Material` ADD COLUMN `fee` DOUBLE NULL;

-- AlterTable
ALTER TABLE `UnitConversion` ADD COLUMN `fee` DOUBLE NOT NULL;
