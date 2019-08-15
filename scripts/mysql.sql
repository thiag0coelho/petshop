CREATE SCHEMA `7180`;

CREATE TABLE `7180`.`product` (
    `id` INT NOT NULL,
    `title` VARCHAR(80) NULL,
    `description` TEXT(4000) NULL,
    PRIMARY KEY (`id`)
)