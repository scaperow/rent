-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `address` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `gender` ENUM('MALE', 'FAMALE') NULL,
    `name` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MaterialCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Material` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` INTEGER NOT NULL,
    `unitId` INTEGER NOT NULL,
    `count` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `hasVariant` BOOLEAN NOT NULL,
    `isVariant` BOOLEAN NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `fee` DOUBLE NULL,
    `masterId` INTEGER NULL,
    `disabled` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MaterialProperty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NULL,
    `customerId` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `disabled` BOOLEAN NOT NULL DEFAULT false,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnitConversion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `materialId` INTEGER NOT NULL,
    `unitId` INTEGER NOT NULL,
    `factor` VARCHAR(191) NOT NULL,
    `fee` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Order_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MaterialToMaterialProperty` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MaterialToMaterialProperty_AB_unique`(`A`, `B`),
    INDEX `_MaterialToMaterialProperty_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Material` ADD CONSTRAINT `Material_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `MaterialCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Material` ADD CONSTRAINT `Material_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Material` ADD CONSTRAINT `Material_masterId_fkey` FOREIGN KEY (`masterId`) REFERENCES `Material`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnitConversion` ADD CONSTRAINT `UnitConversion_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnitConversion` ADD CONSTRAINT `UnitConversion_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MaterialToMaterialProperty` ADD CONSTRAINT `_MaterialToMaterialProperty_A_fkey` FOREIGN KEY (`A`) REFERENCES `Material`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MaterialToMaterialProperty` ADD CONSTRAINT `_MaterialToMaterialProperty_B_fkey` FOREIGN KEY (`B`) REFERENCES `MaterialProperty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
