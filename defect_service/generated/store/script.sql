-- AUTO-GENERATED FILE.

-- This file is an auto-generated file by Ballerina persistence layer for model.
-- Please verify the generated scripts and execute them against the target DB server.

DROP TABLE IF EXISTS `Issue`;

CREATE TABLE `Issue` (
	`issue_id` VARCHAR(191) NOT NULL,
	`user_id` VARCHAR(191) NOT NULL,
	`capture_date` DATE NOT NULL,
	`town` VARCHAR(191) NOT NULL,
	`latitude` DOUBLE NOT NULL,
	`longitude` DOUBLE NOT NULL,
	`description` VARCHAR(191) NOT NULL,
	`image_path` VARCHAR(191) NOT NULL,
	PRIMARY KEY(`issue_id`)
);
