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
  `phoneNumber1` varchar(15) NOT NULL,
  `phoneNumber2` varchar(15),
  `address` varchar(255),
  `state` varchar(50),
  `zip` varchar(50),
  PRIMARY KEY (userID)
);

CREATE TABLE `type` (
  `typeID` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`typeID`)
);

CREATE TABLE `userType` (
  `userID` INT NOT NULL,
  `typeID` INT NOT NULL,
  PRIMARY KEY (`userID`, `typeID`)
);

CREATE TABLE `category` (
  `categoryID` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`categoryID`)
);

CREATE TABLE `subCategory` (
  `subCategoryID` int NOT NULL AUTO_INCREMENT,
  `categoryID` int NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`subCategoryID`)
);

CREATE TABLE `bid` (
  `bidID` int NOT NULL AUTO_INCREMENT,
  `requestID` int NOT NULL,
  `userID` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  PRIMARY KEY (`bidID`)
);


CREATE TABLE `referral` (
  `referralID` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`referralID`)
);

CREATE TABLE `userReferral` (
  `userID` int NOT NULL,
  `referralID` int NOT NULL,
  PRIMARY KEY (`userID`, `referralID`)
);

CREATE TABLE `faq` (
  `faqID` int NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `categoryID` int NOT NULL,
  `userID` int NOT NULL,
  `subcategoryID` int NOT NULL,
  PRIMARY KEY (`faqID`)
);

CREATE TABLE `gallery` (
  `galleryID` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(255) NOT NULL,
  PRIMARY KEY (`galleryID`)
);

CREATE TABLE `userGallery` (
  `userID` int NOT NULL,
  `GalleryID` int NOT NULL,
  PRIMARY KEY (`userID`, `galleryID`)
);

CREATE TABLE `request` (
  `requestID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `bidID` int NOT NULL,
  `categoryID` int NOT NULL,
  `subCategoryID` int NOT NULL,
  `Description` varchar(255) NOT NULL,
   PRIMARY KEY (`requestID`)
);
