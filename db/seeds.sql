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

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (1, 'Financial accounting‎');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (1, 'Environmental accounting');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (1, 'Management accounting');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (2, 'Public administration‎');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (2, 'Office administration‎');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (2, 'Educational administration‎');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (2, 'Business administration');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (3, 'Bridge design‎n‎');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (3, 'Landscape architecture‎');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (3, 'Building engineering‎');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (4, 'Installation art‎');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (4, 'Glamour photography');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (4, 'Landscape photography');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (4, 'Cityscape art');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (4, 'Cartooning‎');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (5, 'Management‎');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (5, '24/7 service');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (5, 'Customer experience');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (5, 'Marketing');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (6, 'Project Coordinator');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (6, 'Network Engineer');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (6, 'Graphic Artist');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (6, 'Web Developer');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (7, 'Project Management');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (7, 'Representative');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (7, 'Sales Associate');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (8, 'Teacher');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (8, 'Tutor');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (8, 'Preschool Teacher');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (8, 'Teacher Assistant');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (9, 'Project Coordinator');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (9, 'Network Engineer');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (9, 'Open Source Database Administrator');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (9, 'Web Developer');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (10, 'Supervisor');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (10, 'Manager');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (10, 'Palnner');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (10, 'Coordinator');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (11, 'Supervisor');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (11, 'Manager');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (11, 'Palnner');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (12, 'Coordinator');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (12, 'Supervisor');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (12, 'Manager');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (13, 'Palnner');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (13, 'Coordinator');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (13, 'Supervisor');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (14, 'Manager');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (14, 'Palnner');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (14, 'Coordinator');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (15, 'Supervisor');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (15, 'Manager');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (15, 'Palnner');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (16, 'Supervisor');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (16, 'Manager');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (16, 'Palnner');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (17, 'Coordinator');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (17, 'Supervisor');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (17, 'Manager');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (18, 'Medical Representative');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (18, 'Medical Biller');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (18, 'Medical Assistant');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (19, 'Music Teacher');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (19, 'Assistant');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (19, 'Music Coordinator');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (20, 'Clark');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (20, 'Manager');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (20, 'Associate');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (21, 'Manager');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (21, 'Executive');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (21, 'Palnner');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (21, 'Engineer');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (22, 'Network Security');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (22, 'Security Analyst');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (22, 'Security Engineer');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (22, 'Security Gaurd');

INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (23, 'Supervisor');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (23, 'Manager');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (23, 'Palnner');
INSERT INTO `subCategory` (`categoryID`, `description`) VALUES (23, 'Coordinator');

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