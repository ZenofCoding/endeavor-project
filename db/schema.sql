CREATE DATABASE my_schema;

USE my_schema;

CREATE TABLE `users` (
`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(20) NOT NULL,
    `password` CHAR(60) NOT NULL,
    `first` VARCHAR(20),
    `last` VARCHAR(20),
    `email` VARCHAR(255),
    `avatar` VARCHAR(255),
    `signup` DATETIME DEFAULT now(),
    `lastlogin` DATETIME,
    `notescheck` DATETIME,
    `activated` BOOLEAN DEFAULT true,
        PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC),
    UNIQUE INDEX `username_UNIQUE` (`username` ASC)
);

CREATE TABLE `jobs` (
`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `posterid` INT UNSIGNED NOT NULL,
    `jobtitle` VARCHAR(255),
    `jobdescription` TEXT,
    `image` VARCHAR(255),
    `created` DATETIME DEFAULT now(),
    `jobstart` DATETIME,
    `deadline` DATETIME,
    `completed` BOOLEAN DEFAULT false,
        PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC)
);

CREATE TABLE `status` (
`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `osid` INT UNSIGNED NOT NULL,
    `account_name` VARCHAR(20) NOT NULL,
    `author` VARCHAR(20) NOT NULL,
    `type` enum('a', 'b', 'c') NOT NULL,
    `data` TEXT,
    `postdate` DATETIME NOT NULL,
        PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC)
);
CREATE TABLE `category` (
  `categoryID` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`categoryID`)
);

#DROP TABLE `subCategory`;
CREATE TABLE `subCategory` (
  `subCategoryID` int NOT NULL AUTO_INCREMENT,
  `categoryID` int NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`subCategoryID`)#,
  #FOREIGN KEY (`categoryID`) REFERENCES `category`(`categoryID`)
);