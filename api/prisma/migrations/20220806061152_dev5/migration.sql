-- AlterTable
ALTER TABLE `Material` ADD COLUMN `masterId` INTEGER NULL;

-- CreateTable
CREATE TABLE `PropertyOnMaterial` (
    `materialId` INTEGER NOT NULL,
    `propertyId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`materialId`, `propertyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Material` ADD CONSTRAINT `Material_masterId_fkey` FOREIGN KEY (`masterId`) REFERENCES `Material`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertyOnMaterial` ADD CONSTRAINT `PropertyOnMaterial_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertyOnMaterial` ADD CONSTRAINT `PropertyOnMaterial_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `MaterialProperty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
