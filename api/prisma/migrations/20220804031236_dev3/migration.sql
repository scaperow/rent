-- AlterTable
ALTER TABLE `Customer` MODIFY `address` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `gender` ENUM('MALE', 'FAMALE') NULL;
