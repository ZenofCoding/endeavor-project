INSERT INTO `user` (`userName`, `password`, `firstName`, `lastName`, `email`, `phoneNumber1`, `address`, `state`, `zip`) 
VALUES ('user1', 'password', 'john1', 'doe', 'john1.doe@gmail.com', '(111)123-1234', 'address1', 'NJ', '08536');
INSERT INTO `user` (`userName`, `password`, `firstName`, `lastName`, `email`, `phoneNumber1`,  `address`, `state`, `zip`) 
VALUES ('user2', 'password', 'jane', 'doe', 'jane.doe@gmail.com', '(222)123-1234', 'address2', 'NJ', '08536');
INSERT INTO `user` (`userName`, `password`, `firstName`, `lastName`, `email`, `phoneNumber1`, `address`, `state`, `zip`) 
VALUES ('user3', 'password', 'john2', 'doe', 'john2.doe@gmail.com', '(333)123-1234', 'address3', 'NJ', '08536');
INSERT INTO `user` (`userName`, `password`, `firstName`, `lastName`, `email`, `phoneNumber1`,  `address`, `state`, `zip`) 
VALUES ('user4', 'password', 'john3', 'doe', 'john3.doe@gmail.com', '(444)123-1234', 'address4', 'NJ', '08536');

#SELECT * FROM `user`;

INSERT INTO `type` (`description`) VALUES ('requestor');
INSERT INTO `type` (`description`) VALUES ('provider');

#SELECT * FROM `type`;

INSERT INTO `userType` (`userID`, `typeID`) VALUES (1,1);
INSERT INTO `userType` (`userID`, `typeID`) VALUES (1,2);
INSERT INTO `userType` (`userID`, `typeID`) VALUES (2,1);
INSERT INTO `userType` (`userID`, `typeID`) VALUES (2,2);


#SELECT * FROM `userType`;

INSERT INTO `category` (`category`) VALUES ('Accounting');
INSERT INTO `category` (`category`) VALUES ('Administrative');
INSERT INTO `category` (`category`) VALUES ('Architecture');
INSERT INTO `category` (`category`) VALUES ('Artistic');
INSERT INTO `category` (`category`) VALUES ('Business');
INSERT INTO `category` (`category`) VALUES ('Computers');
INSERT INTO `category` (`category`) VALUES ('Customer Relations');
INSERT INTO `category` (`category`) VALUES ('Education');
INSERT INTO `category` (`category`) VALUES ('Engineering');
INSERT INTO `category` (`category`) VALUES ('Government');
INSERT INTO `category` (`category`) VALUES ('Hospitality');
INSERT INTO `category` (`category`) VALUES ('Human Resources');
INSERT INTO `category` (`category`) VALUES ('Labor');
INSERT INTO `category` (`category`) VALUES ('Legal');
INSERT INTO `category` (`category`) VALUES ('Manufacturing');
INSERT INTO `category` (`category`) VALUES ('Marketing');
INSERT INTO `category` (`category`) VALUES ('Mechanical');
INSERT INTO `category` (`category`) VALUES ('Medical');
INSERT INTO `category` (`category`) VALUES ('Music');
INSERT INTO `category` (`category`) VALUES ('Retail');
INSERT INTO `category` (`category`) VALUES ('Sales');
INSERT INTO `category` (`category`) VALUES ('Security');
INSERT INTO `category` (`category`) VALUES ('Transportation');

#SELECT * FROM `category`;

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (1, 'sub category1');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (1, 'sub category2');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (2, 'sub category3');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (2, 'sub category4');

#SELECT * FROM `subCategory`;

INSERT INTO `bid` (`description`, `requestID`, `userID`) VALUES ('bid Description1',1, 1 );
INSERT INTO `bid` (`description`, `requestID`,`userID`) VALUES ('bid Description1',1, 1 );
INSERT INTO `bid` (`description`, `requestID`,`userID`) VALUES ('bid Description1' ,1, 2);
INSERT INTO `bid` (`description`, `requestID`,`userID`) VALUES ('bid Description1',1, 2 );

#SELECT * FROM `bid`;

INSERT INTO `request` (`userID`, `bidID`,`categoryID`, `subcategoryID`, `description`) 
VALUES (1,1,1,1, 'request description1');
INSERT INTO `request` (`userID`, `bidID`,`categoryID`, `subcategoryID`, `description`) 
VALUES (2,1,1,1, 'request description2');
INSERT INTO `request` (`userID`, `bidID`,`categoryID`, `subcategoryID`, `description`) 
VALUES (2,1,1,1, 'request description3');
INSERT INTO `request` (`userID`, `bidID`,`categoryID`, `subcategoryID`, `description`) 
VALUES (2,2,1,1, 'request description4');

#SELECT * FROM `request`;


INSERT INTO `referral` (`description`) VALUES ('referral Description1');
INSERT INTO `referral` (`description`) VALUES ('referral Description1');
INSERT INTO `referral` (`description`) VALUES ('referral Description1');
INSERT INTO `referral` (`description`) VALUES ('referral Description1');

#SELECT * FROM `referral`;

INSERT INTO `userReferral` (`userID`, `referralID`) VALUES (1,1);
INSERT INTO `userReferral` (`userID`, `referralID`) VALUES (1,2);
INSERT INTO `userReferral` (`userID`, `referralID`) VALUES (1,3);
INSERT INTO `userReferral` (`userID`, `referralID`) VALUES (1,4);

#SELECT * FROM `userReferral`;

INSERT INTO `gallery` (`description`) VALUES ('gallery description1');
INSERT INTO `gallery` (`description`)  VALUES ('gallery description2');
INSERT INTO `gallery` (`description`)  VALUES ('gallery description3');
INSERT INTO `gallery` (`description`) VALUES ('gallery description4');

#SELECT * FROM `gallery`;

INSERT INTO `userGallery` (`userID`, `GalleryID`) VALUES (1,1);
INSERT INTO `userGallery` (`userID`, `GalleryID`) VALUES (1,2);
INSERT INTO `userGallery` (`userID`, `GalleryID`) VALUES (1,3);
INSERT INTO `userGallery` (`userID`, `GalleryID`) VALUES (1,4);

#SELECT * FROM `userGallery`;

INSERT INTO `faq` (`question`, `answer`,`categoryID`, `userID`, `subcategoryID`) 
VALUES ('question1', 'answer1',1,1, 1);
INSERT INTO `faq` (`question`, `answer`,`categoryID`, `userID`, `subcategoryID`) 
VALUES ('question2', 'answer2',1,1, 1);
INSERT INTO `faq` (`question`, `answer`,`categoryID`, `userID`, `subcategoryID`) 
VALUES ('question1', 'answer3',1,1, 1);
INSERT INTO `faq` (`question`, `answer`,`categoryID`, `userID`, `subcategoryID`) 
VALUES ('question1', 'answer1',1,1, 1);

#SELECT * FROM `faq`;