-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account` VARCHAR(50) NULL,
    `username` VARCHAR(30) NULL,
    `password` VARCHAR(255) NULL,
    `avatar` VARCHAR(255) NULL,
    `status` INTEGER NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_account_key`(`account`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company` VARCHAR(100) NOT NULL,
    `address` VARCHAR(200) NULL,
    `logo` VARCHAR(255) NULL,
    `logo2` VARCHAR(255) NULL,
    `qr_code` VARCHAR(255) NULL,
    `phone` VARCHAR(20) NULL,
    `email` VARCHAR(50) NULL,
    `seo_keyword` VARCHAR(100) NULL,
    `seo_description` VARCHAR(200) NULL,
    `copyright` VARCHAR(200) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `filing` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NULL,
    `address` VARCHAR(200) NULL,
    `logo` VARCHAR(255) NULL,
    `logo2` VARCHAR(255) NULL,
    `qr_code` VARCHAR(255) NULL,
    `phone` VARCHAR(20) NULL,
    `email` VARCHAR(50) NULL,
    `keyword` VARCHAR(100) NULL,
    `description` VARCHAR(200) NULL,
    `filing` VARCHAR(100) NULL,
    `copyright` VARCHAR(200) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `icon` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `p_id` INTEGER NULL DEFAULT 0,
    `icon` VARCHAR(50) NULL,
    `sort` INTEGER NULL DEFAULT 0,
    `title` VARCHAR(100) NULL,
    `title_en` VARCHAR(100) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `href` VARCHAR(200) NULL,
    `status` INTEGER NULL DEFAULT 1,
    `is_goods` INTEGER NULL DEFAULT 0,

    INDEX `menu_p_id_fkey`(`p_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NULL,
    `title_en` VARCHAR(100) NULL,
    `author` VARCHAR(100) NULL,
    `describe` VARCHAR(200) NULL,
    `describe_en` VARCHAR(200) NULL,
    `content` TEXT NULL,
    `content_en` TEXT NULL,
    `img` VARCHAR(255) NULL,
    `sort` INTEGER NULL DEFAULT 0,
    `type` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `isHide` BOOLEAN NULL DEFAULT false,
    `read` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NULL,
    `title_en` VARCHAR(100) NULL,
    `author` VARCHAR(100) NULL,
    `describe` VARCHAR(200) NULL,
    `describe_en` VARCHAR(200) NULL,
    `content` TEXT NULL,
    `content_en` TEXT NULL,
    `img` VARCHAR(255) NULL,
    `sort` INTEGER NULL DEFAULT 0,
    `isHide` BOOLEAN NULL DEFAULT false,
    `type` INTEGER NOT NULL DEFAULT 0,
    `read` INTEGER NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `link` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NULL,
    `title_en` VARCHAR(100) NULL,
    `img` VARCHAR(255) NULL,
    `href` VARCHAR(255) NULL,
    `sort` INTEGER NULL DEFAULT 0,
    `type` INTEGER NULL DEFAULT 1,
    `isHide` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `other` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NULL,
    `title_en` VARCHAR(100) NULL,
    `img` VARCHAR(255) NULL,
    `content` TEXT NULL,
    `content_en` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `type` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `other_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
