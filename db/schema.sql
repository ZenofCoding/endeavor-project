### Schema

CREATE DATABASE endeavor_db;
USE endeavor_db;

CREATE TABLE `user` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `password` varchar(50) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255),
  `avatar` varchar(255),
  `phoneNumber1` varchar(15) NOT NULL,
  `phoneNumber2` varchar(15),
  `address` varchar(255),
  `state` varchar(50),
  `zip` varchar(50),
  `signUp` datetime DEFAULT now(),
  `lastLogin` datetime,
  `notesCheck` datetime,
  `activate` boolean DEFAULT true,
  PRIMARY KEY (`userID`)
);

CREATE TABLE `type` (
  `typeID` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`typeID`)
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

#DROP TABLE `userType`;
CREATE TABLE `userType` (
  `userID` INT NOT NULL,
  `typeID` INT NOT NULL,
  PRIMARY KEY (`userID`, `typeID`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`userID`),
  FOREIGN KEY (`typeID`) REFERENCES `type`(`typeID`)
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
  PRIMARY KEY (`subCategoryID`),
  FOREIGN KEY (`categoryID`) REFERENCES `category`(`categoryID`)
);

#DROP TABLE `bid`;
CREATE TABLE `bid` (
  `bidID` int NOT NULL AUTO_INCREMENT,
  `requestID` int NOT NULL,
  `userID` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  PRIMARY KEY (`bidID`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`userID`)#,
  #FOREIGN KEY (`requestID`) REFERENCES `request`(`requestID`)
);


CREATE TABLE `referral` (
  `referralID` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`referralID`)
);

#DROP TABLE `userReferral`;
CREATE TABLE `userReferral` (
  `userID` int NOT NULL,
  `referralID` int NOT NULL,
  PRIMARY KEY (`userID`, `referralID`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`userID`),
  FOREIGN KEY (`referralID`) REFERENCES `referral`(`referralID`)
);

CREATE TABLE `faq` (
  `faqID` int NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `categoryID` int NOT NULL,
  `userID` int NOT NULL,
  `subcategoryID` int NOT NULL,
  PRIMARY KEY (`faqID`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`userID`),
  FOREIGN KEY (`categoryID`) REFERENCES `category`(`categoryID`),
  FOREIGN KEY (`subcategoryID`) REFERENCES `subcategory`(`subcategoryID`)
);

CREATE TABLE `gallery` (
  `galleryID` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(255) NOT NULL,
  PRIMARY KEY (`galleryID`)
);

#DROP TABLE `userGallery`;
CREATE TABLE `userGallery` (
  `userID` int NOT NULL,
  `GalleryID` int NOT NULL,
  PRIMARY KEY (`userID`, `galleryID`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`userID`),
  FOREIGN KEY (`galleryID`) REFERENCES `gallery`(`galleryID`)
);

CREATE TABLE `jobs` (
  `jobID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `bidID` int NOT NULL,
  `categoryID` int NOT NULL,
  `subCategoryID` int NOT NULL,
  `Description` text NOT NULL,
  `image` varchar(255),
  `created` datetime DEFAULT now(),
  `jobStart` datetime,
  `deadline` datetime,
  `completed` boolean DEFAULT false,
   PRIMARY KEY (`jobID`),
   FOREIGN KEY (`userID`) REFERENCES `user`(`userID`),
   FOREIGN KEY (`categoryID`) REFERENCES `category`(`categoryID`),
   FOREIGN KEY (`subcategoryID`) REFERENCES `subcategory`(`subcategoryID`),
   FOREIGN KEY (`bidID`) REFERENCES `bid`(`bidID`)
);
