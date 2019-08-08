-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: pryde
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account_emailaddress`
--

DROP TABLE IF EXISTS `account_emailaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_emailaddress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `primary` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `account_emailaddress_user_id_2c513194_fk_api_puser_id` (`user_id`),
  CONSTRAINT `account_emailaddress_user_id_2c513194_fk_api_puser_id` FOREIGN KEY (`user_id`) REFERENCES `api_puser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailaddress`
--

LOCK TABLES `account_emailaddress` WRITE;
/*!40000 ALTER TABLE `account_emailaddress` DISABLE KEYS */;
INSERT INTO `account_emailaddress` VALUES (12,'barronfran@gmail.com',0,1,13),(13,'dubois.barron@gmail.com',0,1,14),(14,'william.oliver.wang@gmail.com',0,1,15),(15,'test4@gmail.com',0,1,16),(16,'test5@gmail.com',0,1,17),(17,'test6@gmail.com',0,1,18),(18,'test7@gmail.com',0,1,19),(19,'test8@gmail.com',0,1,20),(20,'test9@gmail.com',0,1,21),(21,'test10@gmail.com',0,1,22);
/*!40000 ALTER TABLE `account_emailaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_emailconfirmation`
--

DROP TABLE IF EXISTS `account_emailconfirmation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_emailconfirmation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `sent` datetime(6) DEFAULT NULL,
  `key` varchar(64) NOT NULL,
  `email_address_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  KEY `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` (`email_address_id`),
  CONSTRAINT `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` FOREIGN KEY (`email_address_id`) REFERENCES `account_emailaddress` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailconfirmation`
--

LOCK TABLES `account_emailconfirmation` WRITE;
/*!40000 ALTER TABLE `account_emailconfirmation` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailconfirmation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_collaborator`
--

DROP TABLE IF EXISTS `api_collaborator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_collaborator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `editPermission` tinyint(1) NOT NULL,
  `deletePermission` tinyint(1) NOT NULL,
  `editCollaboratorsPermission` tinyint(1) NOT NULL,
  `showProjectOnProfile` tinyint(1) NOT NULL,
  `collaborator_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_collaborator_collaborator_id_1066232f_fk_api_puser_id` (`collaborator_id`),
  KEY `api_collaborator_project_id_e4f2c053_fk_api_project_id` (`project_id`),
  CONSTRAINT `api_collaborator_collaborator_id_1066232f_fk_api_puser_id` FOREIGN KEY (`collaborator_id`) REFERENCES `api_puser` (`id`),
  CONSTRAINT `api_collaborator_project_id_e4f2c053_fk_api_project_id` FOREIGN KEY (`project_id`) REFERENCES `api_project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_collaborator`
--

LOCK TABLES `api_collaborator` WRITE;
/*!40000 ALTER TABLE `api_collaborator` DISABLE KEYS */;
INSERT INTO `api_collaborator` VALUES (1,1,1,0,1,14,1),(2,0,0,0,1,15,1),(3,1,0,1,1,16,1),(4,1,0,1,1,17,1),(5,0,1,0,1,14,2),(6,1,0,1,1,15,2),(7,0,1,1,1,16,2),(8,1,0,0,1,17,2),(9,0,0,1,1,14,3),(10,1,1,0,1,15,3),(11,0,1,0,1,16,3),(12,1,0,1,1,17,3),(13,0,1,0,1,14,4),(14,1,0,1,1,15,4),(15,0,0,1,1,16,4),(16,1,1,1,1,17,4),(17,0,0,0,1,21,1);
/*!40000 ALTER TABLE `api_collaborator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_deliverymodeproject`
--

DROP TABLE IF EXISTS `api_deliverymodeproject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_deliverymodeproject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deliveryMode` varchar(100) NOT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_deliverymodeproject_project_id_1daaf03e_fk_api_project_id` (`project_id`),
  CONSTRAINT `api_deliverymodeproject_project_id_1daaf03e_fk_api_project_id` FOREIGN KEY (`project_id`) REFERENCES `api_project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_deliverymodeproject`
--

LOCK TABLES `api_deliverymodeproject` WRITE;
/*!40000 ALTER TABLE `api_deliverymodeproject` DISABLE KEYS */;
INSERT INTO `api_deliverymodeproject` VALUES (3,'Camps',2),(4,'aslkdfjsd',2),(5,'Afterschool',3),(6,'aslkdfjsd',3),(7,'asdlkfsdf',4),(8,'asdlkfsdf',4),(9,'asdlkfsdf',5),(10,'Afterschool',5),(11,'Afterschool',6),(12,'Clubs',6),(13,'Camps',7),(14,'asdlkfsdf',7),(15,'Camps',8),(16,'Afterschool',8),(17,'asdlkfsdf',9),(18,'Afterschool',9),(19,'asdlkfsdf',10),(20,'Camps',10),(21,'aslkdfjsd',11),(22,'asdlkfsdf',11),(23,'Camps',12),(24,'Clubs',12),(25,'aslkdfjsd',13),(26,'aslkdfjsd',13),(27,'Camps',14),(28,'asdlkfsdf',14),(29,'asdlkfsdf',15),(30,'Afterschool',15),(31,'Afterschool',16),(32,'asdlkfsdf',16),(33,'Clubs',17),(34,'Afterschool',17),(35,'Afterschool',18),(36,'Clubs',18),(37,'asdlkfsdf',19),(38,'Clubs',19),(39,'Afterschool',20),(40,'Afterschool',20),(41,'asdlkfsdf',21),(42,'asdlkfsdf',21),(43,'Afterschool',22),(44,'asdlkfsdf',22),(45,'asdlkfsdf',23),(46,'Camps',23),(47,'aslkdfjsd',24),(48,'Clubs',24),(49,'aslkdfjsd',25),(50,'asdlkfsdf',25),(51,'Afterschool',26),(52,'aslkdfjsd',26),(53,'Camps',27),(54,'asdlkfsdf',27),(55,'Camps',28),(56,'Clubs',28),(57,'Camps',29),(58,'aslkdfjsd',29),(77,'Afterschool',1);
/*!40000 ALTER TABLE `api_deliverymodeproject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_file`
--

DROP TABLE IF EXISTS `api_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file` varchar(100) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_file_project_id_45607e71_fk_api_project_id` (`project_id`),
  CONSTRAINT `api_file_project_id_45607e71_fk_api_project_id` FOREIGN KEY (`project_id`) REFERENCES `api_project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_file`
--

LOCK TABLES `api_file` WRITE;
/*!40000 ALTER TABLE `api_file` DISABLE KEYS */;
INSERT INTO `api_file` VALUES (1,'project_files/Get_Started_with_Dropbox.pdf','Get Started with Dropbox.pdf',1),(11,'project_files/LEASE-4073.docx','LEASE-4073.docx',1),(12,'project_files/407_eddy_st_3_lease.pdf','407 eddy st #3 lease.pdf',1),(13,'project_files/LEASE-4071.docx','LEASE-4071.docx',1);
/*!40000 ALTER TABLE `api_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_project`
--

DROP TABLE IF EXISTS `api_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `status` enum('1','2','3') NOT NULL,
  `summary` longtext NOT NULL,
  `ageRanges` varchar(909) NOT NULL,
  `timeline` varchar(100) NOT NULL,
  `commitmentLength` varchar(100) NOT NULL,
  `incentives` longtext NOT NULL,
  `additionalInformation` longtext,
  `type` varchar(100) NOT NULL,
  `datePosted` datetime(6) NOT NULL,
  `alternateContact` json NOT NULL,
  `alternateLocation` varchar(200) DEFAULT NULL,
  `isApproved` tinyint(1) NOT NULL,
  `owner_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_project_owner_id_54c92f4c_fk_api_puser_id` (`owner_id`),
  CONSTRAINT `api_project_owner_id_54c92f4c_fk_api_puser_id` FOREIGN KEY (`owner_id`) REFERENCES `api_puser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_project`
--

LOCK TABLES `api_project` WRITE;
/*!40000 ALTER TABLE `api_project` DISABLE KEYS */;
INSERT INTO `api_project` VALUES (1,'Engagement','3','summary about the project','Infants (0-1 year),Young teens (12-14 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:12.602979','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,13),(2,'Children','3','summary about the project','Teenagers (15-17 years),Toddlers (1-2 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:12.688057','{}','',1,13),(3,'Reading','3','summary about the project','Early childhood (6-8 years),Young adults (18-24 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:12.735100','{}','',1,13),(4,'Technology','2','summary about the project','Early childhood (6-8 years),Early childhood (6-8 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:12.796155','{}','',1,13),(5,'Children','3','summary about the project','Toddlers (1-2 years),Infants (0-1 year)','May to August','May to August','none','django and react','project','2019-08-07 22:48:12.840196','{}','',1,14),(6,'Science','1','summary about the project','Early childhood (6-8 years),Early childhood (6-8 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:12.885236','{}','',1,14),(7,'Technology','1','summary about the project','Preschoolers (3-5 years),Preschoolers (3-5 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:12.963308','{}','',1,14),(8,'Technology','2','summary about the project','Toddlers (2-3 years),Young adults (18-24 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.025364','{}','',1,15),(9,'Reading','1','summary about the project','Teenagers (15-17 years),Middle childhood (9-11 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.070405','{}','',1,15),(10,'Science','1','summary about the project','Toddlers (1-2 years),Teenagers (15-17 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.124454','{}','',1,15),(11,'Children','1','summary about the project','Toddlers (2-3 years),Early childhood (6-8 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.167493','{}','',1,16),(12,'Reading','2','summary about the project','Toddlers (2-3 years),Young adults (18-24 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.209531','{}','',1,16),(13,'Engagement','3','summary about the project','Early childhood (6-8 years),Young adults (18-24 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.258577','{}','',1,16),(14,'Engagement','3','summary about the project','Toddlers (2-3 years),Teenagers (15-17 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.303617','{}','',1,17),(15,'Animals','1','summary about the project','Young adults (18-24 years),Infants (0-1 year)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.354664','{}','',1,17),(16,'Children','3','summary about the project','Infants (0-1 year),Infants (0-1 year)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.398704','{}','',1,18),(17,'Technology','1','summary about the project','Early childhood (6-8 years),Toddlers (1-2 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.441743','{}','',1,18),(18,'Animals','3','summary about the project','Toddlers (2-3 years),Middle childhood (9-11 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.483789','{}','',1,18),(19,'Science','1','summary about the project','Teenagers (15-17 years),Toddlers (1-2 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.525819','{}','',1,18),(20,'Animals','1','summary about the project','Young adults (18-24 years),Young adults (18-24 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.568860','{}','',1,19),(21,'Engagement','3','summary about the project','Middle childhood (9-11 years),Infants (0-1 year)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.610897','{}','',1,19),(22,'Children','3','summary about the project','Toddlers (2-3 years),Toddlers (1-2 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.652935','{}','',1,19),(23,'Animals','1','summary about the project','Teenagers (15-17 years),Preschoolers (3-5 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.695974','{}','',1,19),(24,'Technology','1','summary about the project','Toddlers (1-2 years),Toddlers (2-3 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.738012','{}','',1,20),(25,'Science','2','summary about the project','Teenagers (15-17 years),Toddlers (1-2 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.783053','{}','',1,20),(26,'Children','3','summary about the project','Early childhood (6-8 years),Young teens (12-14 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.826093','{}','',1,21),(27,'Technology','1','summary about the project','Teenagers (15-17 years),Toddlers (2-3 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.869132','{}','',1,21),(28,'Animals','2','summary about the project','Infants (0-1 year),Middle childhood (9-11 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.910169','{}','',1,22),(29,'Technology','2','summary about the project','Young teens (12-14 years),Young teens (12-14 years)','May to August','May to August','none','django and react','project','2019-08-07 22:48:13.959214','{}','',1,22);
/*!40000 ALTER TABLE `api_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_puser`
--

DROP TABLE IF EXISTS `api_puser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_puser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `locatedAtCornell` tinyint(1) NOT NULL,
  `locatedAtCCE` tinyint(1) NOT NULL,
  `role` enum('1','2') DEFAULT NULL,
  `displayRole` varchar(50) DEFAULT NULL,
  `affiliation` varchar(200) NOT NULL,
  `location` varchar(200) DEFAULT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(128) DEFAULT NULL,
  `website` varchar(200) DEFAULT NULL,
  `researchDescription` longtext,
  `roles` varchar(707) DEFAULT NULL,
  `ageRanges` varchar(909) DEFAULT NULL,
  `deliveryModes` varchar(505) DEFAULT NULL,
  `researchNeeds` longtext,
  `evaluationNeeds` longtext,
  `profile_picture` varchar(100) DEFAULT NULL,
  `type` varchar(15) NOT NULL,
  `over18` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_puser`
--

LOCK TABLES `api_puser` WRITE;
/*!40000 ALTER TABLE `api_puser` DISABLE KEYS */;
INSERT INTO `api_puser` VALUES (1,'pbkdf2_sha256$150000$EeL779fAeO10$D5jwHnjFMclx6zsn+9b/s+TUiAzhgdqauUDnPMzVgMQ=','2019-08-07 04:03:18.793261',1,'wow7@cornell.edu','','',1,1,'2019-08-07 01:42:27.805595',0,0,NULL,NULL,'',NULL,'wow7@cornell.edu',NULL,NULL,NULL,'','','',NULL,NULL,'','user',1),(13,'pbkdf2_sha256$150000$YECn9Hlg1KuL$ZGkA5Ehm3G/RHPnEjh/uLnUKHRupIRA82WCoU4Nr4NA=','2019-08-08 06:01:30.337579',0,'barron','Barron','DuBois',0,1,'2019-08-07 22:48:02.408227',0,0,'1','Practice Focused Role','Cornell University','Ithaca, NY','barronfran@gmail.com','+14432232248','http://www.google.com','I love doing research','Lead youth programs,Lead youth programs,Write grants','Young teens (12-14 years),Young adults (18-24 years)','Afterschool,Clubs','This is a research need!','This is an evaluation need!','profile_pictures/DaKDlXOVMAIY1YS.jpg','user',1),(14,'pbkdf2_sha256$150000$ru8SpMXMnhpC$BUXA8ch2LGL2Mse0cCP6zqJ2l7XI/8GxGuhiMEi+58I=','2019-08-08 02:20:43.406545',0,'barron89','Barron','DuBois II',0,1,'2019-08-07 22:48:02.640439',0,0,'1','Practice Focused Role','Cornell University','Ithaca, NY','dubois.barron@gmail.com','+14432232248','http://www.google.com','I love doing research','Evaluate youth programs,Train volunteers,Train volunteers','Early childhood (6-8 years),Toddlers (1-2 years)','Clubs,Camps','This is a research need!','This is an evaluation need!','','user',1),(15,'pbkdf2_sha256$150000$ZRg90Eq0c8bo$UZKoJwdBSBo4fKrr+4fxmZIO/zs6+YpKJmJx4+bxGfk=','2019-08-08 14:59:20.661602',0,'william','William','Wang',0,1,'2019-08-07 22:48:02.826608',0,1,'1','Other CCE Role','Cornell University','Ithaca, NY','william.oliver.wang@gmail.com','+14432232248','http://www.google.com','I love doing research','Train volunteers,Design youth programs,Write grants','Toddlers (2-3 years),Young adults (18-24 years)','Afterschool,Afterschool','This is a research need!','This is an evaluation need!','','user',1),(16,'pbkdf2_sha256$150000$wnHaukC41v6i$dTSa8bZhveuESFpM2DiYDYdiu8t5b4zQj6SIdbZ99so=','2019-08-07 22:48:11.845289',0,'lauren','Lauren','Johnson',0,1,'2019-08-07 22:48:02.983751',1,0,'1','Research Focused Role','Cornell University','Ithaca, NY','test4@gmail.com','+14432232248','http://www.google.com','I love doing research','Design youth programs,Write grants,Train volunteers','Infants (0-1 year),Middle childhood (9-11 years)','Clubs,Clubs','This is a research need!','This is an evaluation need!','','user',1),(17,'pbkdf2_sha256$150000$DRR16uW4QwrN$KOk3XoCMmIivstlPu5i0rWFyt+ykww4ty5GmUDWF6ug=','2019-08-07 22:48:11.968402',0,'andy','Andy','Smith',0,1,'2019-08-07 22:48:03.146900',1,0,'1','Research Focused Role','Cornell University','Ithaca, NY','test5@gmail.com','+14432232248','http://www.google.com','I love doing research','Lead youth programs,Lead youth programs,Design youth programs','Early childhood (6-8 years),Toddlers (1-2 years)','Afterschool,Afterschool','This is a research need!','This is an evaluation need!','','user',1),(18,'pbkdf2_sha256$150000$j5pSpsiXqyqr$VZuYWPNttHNfsdcALmDV8diApTRnCy9xAkp39v/ASBk=','2019-08-07 22:48:12.095533',0,'samantha','Samantha','Smith',0,1,'2019-08-07 22:48:03.307046',1,0,'2','Research Focused Role','Cornell University','Ithaca, NY','test6@gmail.com','+14432232248','http://www.google.com','I love doing research','Lead youth programs,Lead youth programs,Evaluate youth programs','Infants (0-1 year),Middle childhood (9-11 years)','Clubs,Camps','This is a research need!','This is an evaluation need!','','user',1),(19,'pbkdf2_sha256$150000$uSEfcTUZCd2O$I7eH3B07hQ13qqc2zf6o+XlGSm2QyY5LfQAAtETfog8=','2019-08-07 22:48:12.220631',0,'andy79','Andy','Johnson',0,1,'2019-08-07 22:48:03.459184',1,0,'2','Research Focused Role','Cornell University','Ithaca, NY','test7@gmail.com','+14432232248','http://www.google.com','I love doing research','Train volunteers,Evaluate youth programs,Train volunteers','Young adults (18-24 years),Toddlers (2-3 years)','Camps,Camps','This is a research need!','This is an evaluation need!','','user',1),(20,'pbkdf2_sha256$150000$YcgmZlZ8Ki2x$yzJdJcnPlyCr05fXj0lHfZwZbROdRMTWEzn6xr7vNTQ=','2019-08-07 22:48:12.337753',0,'lauren54','Lauren','Johnson',0,1,'2019-08-07 22:48:03.612323',1,0,'2','Research Focused Role','Cornell University','Ithaca, NY','test8@gmail.com','+14432232248','http://www.google.com','I love doing research','Train volunteers,Write grants,Train volunteers','Young teens (12-14 years),Middle childhood (9-11 years)','Clubs,Afterschool','This is a research need!','This is an evaluation need!','','user',1),(21,'pbkdf2_sha256$150000$ngdoWMMZglCk$OxxzK+xoSYG0PW0PQJqYHE0bMV7HtsLVjlk8tqZqbX0=','2019-08-07 22:48:12.456854',0,'andy10','Andy','Johnson',0,1,'2019-08-07 22:48:03.765463',1,0,'2','Research Focused Role','Cornell University','Ithaca, NY','test9@gmail.com','+14432232248','http://www.google.com','I love doing research','Design youth programs,Write grants,Lead youth programs','Middle childhood (9-11 years),Toddlers (2-3 years)','Camps,Afterschool','This is a research need!','This is an evaluation need!','','user',1),(22,'pbkdf2_sha256$150000$CbmaB2FPt6lk$hUEbQiaSSSCOJ7abmXq9W3rt2+C3ucgLQDH5tdLWM9k=','2019-08-07 22:48:12.573953',0,'samantha96','Samantha','Jones',0,1,'2019-08-07 22:48:03.913598',0,0,'2','Research Focused Role','Rutgers University','New Brunswick, NJ','test10@gmail.com','+14432232248','http://www.google.com','I love doing research','Train volunteers,Write grants,Design youth programs','Young adults (18-24 years),Middle childhood (9-11 years)','Camps,Camps','This is a research need!','This is an evaluation need!','','user',1);
/*!40000 ALTER TABLE `api_puser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_puser_groups`
--

DROP TABLE IF EXISTS `api_puser_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_puser_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `puser_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_puser_groups_puser_id_group_id_09ce180a_uniq` (`puser_id`,`group_id`),
  KEY `api_puser_groups_group_id_936d7f9e_fk_auth_group_id` (`group_id`),
  CONSTRAINT `api_puser_groups_group_id_936d7f9e_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `api_puser_groups_puser_id_63d29b73_fk_api_puser_id` FOREIGN KEY (`puser_id`) REFERENCES `api_puser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_puser_groups`
--

LOCK TABLES `api_puser_groups` WRITE;
/*!40000 ALTER TABLE `api_puser_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_puser_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_puser_user_permissions`
--

DROP TABLE IF EXISTS `api_puser_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_puser_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `puser_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_puser_user_permissions_puser_id_permission_id_7d2b53c2_uniq` (`puser_id`,`permission_id`),
  KEY `api_puser_user_permi_permission_id_a9846a74_fk_auth_perm` (`permission_id`),
  CONSTRAINT `api_puser_user_permi_permission_id_a9846a74_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `api_puser_user_permissions_puser_id_1c189b3d_fk_api_puser_id` FOREIGN KEY (`puser_id`) REFERENCES `api_puser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_puser_user_permissions`
--

LOCK TABLES `api_puser_user_permissions` WRITE;
/*!40000 ALTER TABLE `api_puser_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_puser_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_researchinterestuser`
--

DROP TABLE IF EXISTS `api_researchinterestuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_researchinterestuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `researchInterest` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_researchinterestuser_user_id_eb8fadcd_fk_api_puser_id` (`user_id`),
  CONSTRAINT `api_researchinterestuser_user_id_eb8fadcd_fk_api_puser_id` FOREIGN KEY (`user_id`) REFERENCES `api_puser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_researchinterestuser`
--

LOCK TABLES `api_researchinterestuser` WRITE;
/*!40000 ALTER TABLE `api_researchinterestuser` DISABLE KEYS */;
INSERT INTO `api_researchinterestuser` VALUES (39,'asdlfjkds',13),(40,'Youth/Adult Relationships',13),(41,'Program Evaluation',14),(42,'Media & Technology',14),(43,'Families',15),(44,'Diversity Equity & Inclusion',15),(45,'Animal Science & Agriculture',16),(46,'Environment & Sustainability',16),(47,'Civic Engagement',17),(48,'Civic Engagement',17),(49,'Media & Technology',18),(50,'asldkfjasldkf',18),(51,'asldkjfsldjf',19),(52,'Families',19),(53,'Animal Science & Agriculture',20),(54,'Peer Relationships',20),(55,'Media & Technology',21),(56,'alsdkfjds',21),(57,'asdlfjkds',22),(58,'Animal Science & Agriculture',22);
/*!40000 ALTER TABLE `api_researchinterestuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_topicsproject`
--

DROP TABLE IF EXISTS `api_topicsproject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_topicsproject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `researchTopic` varchar(100) NOT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_topicsproject_project_id_fd14d40c_fk_api_project_id` (`project_id`),
  CONSTRAINT `api_topicsproject_project_id_fd14d40c_fk_api_project_id` FOREIGN KEY (`project_id`) REFERENCES `api_project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_topicsproject`
--

LOCK TABLES `api_topicsproject` WRITE;
/*!40000 ALTER TABLE `api_topicsproject` DISABLE KEYS */;
INSERT INTO `api_topicsproject` VALUES (4,'alsdkfjsdlf',2),(5,'Peer Relationships',2),(6,'Program Evaluation',2),(7,'Health & Wellness',3),(8,'Diversity Equity & Inclusion',3),(9,'alskdfjsdfl',3),(10,'Media & Technology',4),(11,'Youth/Adult Relationships',4),(12,'Positive Youth Development',4),(13,'Risk Behavior',5),(14,'Risk Behavior',5),(15,'Environment & Sustainability',5),(16,'asdlfkjsdlf',6),(17,'Policy Analysis',6),(18,'Civic Engagement',6),(19,'Self & Identity',7),(20,'Risk Behavior',7),(21,'Peer Relationships',7),(22,'alsdkfjlkdsj',8),(23,'Animal Science & Agriculture',8),(24,'Self & Identity',8),(25,'alsdkfjlkdsj',9),(26,'Civic Engagement',9),(27,'Peer Relationships',9),(28,'Media & Technology',10),(29,'alsdkfjsdlf',10),(30,'alskdfjsdfl',10),(31,'Policy Analysis',11),(32,'Science Technology Engineering & Math (STEM)',11),(33,'alsdkfjlkdsj',11),(34,'Health & Wellness',12),(35,'Policy Analysis',12),(36,'Science Technology Engineering & Math (STEM)',12),(37,'asdlfkjsdlf',13),(38,'Policy Analysis',13),(39,'Diversity Equity & Inclusion',13),(40,'alsdkfjsdlf',14),(41,'Media & Technology',14),(42,'Positive Youth Development',14),(43,'Families',15),(44,'alsdkfjsdlf',15),(45,'Animal Science & Agriculture',15),(46,'Media & Technology',16),(47,'Peer Relationships',16),(48,'Families',16),(49,'Policy Analysis',17),(50,'Peer Relationships',17),(51,'Health & Wellness',17),(52,'Diversity Equity & Inclusion',18),(53,'Animal Science & Agriculture',18),(54,'Risk Behavior',18),(55,'Peer Relationships',19),(56,'Civic Engagement',19),(57,'asdlfkjsdlf',19),(58,'Science Technology Engineering & Math (STEM)',20),(59,'asdlfkjsdlf',20),(60,'Nutrition',20),(61,'Diversity Equity & Inclusion',21),(62,'Self & Identity',21),(63,'Environment & Sustainability',21),(64,'Policy Analysis',22),(65,'Policy Analysis',22),(66,'Self & Identity',22),(67,'Civic Engagement',23),(68,'alsdkfjlkdsj',23),(69,'Diversity Equity & Inclusion',23),(70,'Education & Learning',24),(71,'Self & Identity',24),(72,'Media & Technology',24),(73,'Youth/Adult Relationships',25),(74,'Risk Behavior',25),(75,'alskdfjsdfl',25),(76,'alsdkfjlkdsj',26),(77,'Self & Identity',26),(78,'Health & Wellness',26),(79,'Media & Technology',27),(80,'Nutrition',27),(81,'Self & Identity',27),(82,'Civic Engagement',28),(83,'Self & Identity',28),(84,'Program Evaluation',28),(85,'Motivation',29),(86,'Media & Technology',29),(87,'Animal Science & Agriculture',29),(130,'Animal Science & Agriculture',1),(131,'Peer Relationships',1),(132,'alsdkfjlkdsj',1);
/*!40000 ALTER TABLE `api_topicsproject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add site',6,'add_site'),(22,'Can change site',6,'change_site'),(23,'Can delete site',6,'delete_site'),(24,'Can view site',6,'view_site'),(25,'Can add user',7,'add_puser'),(26,'Can change user',7,'change_puser'),(27,'Can delete user',7,'delete_puser'),(28,'Can view user',7,'view_puser'),(29,'Can add project',8,'add_project'),(30,'Can change project',8,'change_project'),(31,'Can delete project',8,'delete_project'),(32,'Can view project',8,'view_project'),(33,'Can add topics project',9,'add_topicsproject'),(34,'Can change topics project',9,'change_topicsproject'),(35,'Can delete topics project',9,'delete_topicsproject'),(36,'Can view topics project',9,'view_topicsproject'),(37,'Can add research interest user',10,'add_researchinterestuser'),(38,'Can change research interest user',10,'change_researchinterestuser'),(39,'Can delete research interest user',10,'delete_researchinterestuser'),(40,'Can view research interest user',10,'view_researchinterestuser'),(41,'Can add file',11,'add_file'),(42,'Can change file',11,'change_file'),(43,'Can delete file',11,'delete_file'),(44,'Can view file',11,'view_file'),(45,'Can add delivery mode project',12,'add_deliverymodeproject'),(46,'Can change delivery mode project',12,'change_deliverymodeproject'),(47,'Can delete delivery mode project',12,'delete_deliverymodeproject'),(48,'Can view delivery mode project',12,'view_deliverymodeproject'),(49,'Can add collaborator',13,'add_collaborator'),(50,'Can change collaborator',13,'change_collaborator'),(51,'Can delete collaborator',13,'delete_collaborator'),(52,'Can view collaborator',13,'view_collaborator'),(53,'Can add Token',14,'add_token'),(54,'Can change Token',14,'change_token'),(55,'Can delete Token',14,'delete_token'),(56,'Can view Token',14,'view_token'),(57,'Can add email address',15,'add_emailaddress'),(58,'Can change email address',15,'change_emailaddress'),(59,'Can delete email address',15,'delete_emailaddress'),(60,'Can view email address',15,'view_emailaddress'),(61,'Can add email confirmation',16,'add_emailconfirmation'),(62,'Can change email confirmation',16,'change_emailconfirmation'),(63,'Can delete email confirmation',16,'delete_emailconfirmation'),(64,'Can view email confirmation',16,'view_emailconfirmation'),(65,'Can add social account',17,'add_socialaccount'),(66,'Can change social account',17,'change_socialaccount'),(67,'Can delete social account',17,'delete_socialaccount'),(68,'Can view social account',17,'view_socialaccount'),(69,'Can add social application',18,'add_socialapp'),(70,'Can change social application',18,'change_socialapp'),(71,'Can delete social application',18,'delete_socialapp'),(72,'Can view social application',18,'view_socialapp'),(73,'Can add social application token',19,'add_socialtoken'),(74,'Can change social application token',19,'change_socialtoken'),(75,'Can delete social application token',19,'delete_socialtoken'),(76,'Can view social application token',19,'view_socialtoken');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_api_puser_id` FOREIGN KEY (`user_id`) REFERENCES `api_puser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
INSERT INTO `authtoken_token` VALUES ('074ab8a50e2d284cc94792708f7ba9ea27251ece','2019-08-07 22:48:03.266008',17),('08033def0bfed758d20762d66a1bd8a69d0707a0','2019-08-07 22:48:03.726427',20),('2aaa6f255f1f763d5074dc850e6250a2bb6e9bcb','2019-08-07 22:48:03.421149',18),('4f99d3d0578f7dae843a508efd25d41c728ffc9a','2019-08-07 22:48:02.753541',14),('51246259279ab632f4e913d8de920fa8ed90acbf','2019-08-07 22:48:03.877565',21),('6d3653395c94f4fb19a92c71bb76de2e686a9b43','2019-08-07 22:48:02.944716',15),('7d0e8d0c30f2ba87eb6dce882cd4760404f481f6','2019-08-07 22:48:03.106863',16),('a00c94abcbd3aa3840ef664dbf23a1565374cf2c','2019-08-07 22:48:03.574289',19),('e47524dd04f8ee3c9cb4b033d5f8622102345d62','2019-08-07 22:48:04.025699',22),('f1c88fe2b35ca3e9157e10b8dd9da315ba875399','2019-08-07 22:48:02.534343',13);
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_api_puser_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_api_puser_id` FOREIGN KEY (`user_id`) REFERENCES `api_puser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2019-08-07 04:23:26.389783','3','test@gmail.com',3,'',7,1),(2,'2019-08-07 04:23:26.395788','2','william.oliver.wang@gmail.com',3,'',7,1),(3,'2019-08-07 06:58:10.908121','10','g@g.com',3,'',7,1),(4,'2019-08-07 06:58:10.915128','8','william.oliver.wang@gmail.com',3,'',7,1),(5,'2019-08-07 22:47:41.887576','12','william.oliver.wang@gmail.com',3,'',7,1),(6,'2019-08-08 05:14:53.742390','41','Project object (41)',3,'',8,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (15,'account','emailaddress'),(16,'account','emailconfirmation'),(1,'admin','logentry'),(13,'api','collaborator'),(12,'api','deliverymodeproject'),(11,'api','file'),(8,'api','project'),(7,'api','puser'),(10,'api','researchinterestuser'),(9,'api','topicsproject'),(3,'auth','group'),(2,'auth','permission'),(14,'authtoken','token'),(4,'contenttypes','contenttype'),(5,'sessions','session'),(6,'sites','site'),(17,'socialaccount','socialaccount'),(18,'socialaccount','socialapp'),(19,'socialaccount','socialtoken');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2019-08-07 01:42:08.436974'),(2,'contenttypes','0002_remove_content_type_name','2019-08-07 01:42:08.654171'),(3,'auth','0001_initial','2019-08-07 01:42:08.837338'),(4,'auth','0002_alter_permission_name_max_length','2019-08-07 01:42:09.392852'),(5,'auth','0003_alter_user_email_max_length','2019-08-07 01:42:09.401860'),(6,'auth','0004_alter_user_username_opts','2019-08-07 01:42:09.410868'),(7,'auth','0005_alter_user_last_login_null','2019-08-07 01:42:09.418869'),(8,'auth','0006_require_contenttypes_0002','2019-08-07 01:42:09.423872'),(9,'auth','0007_alter_validators_add_error_messages','2019-08-07 01:42:09.432880'),(10,'auth','0008_alter_user_username_max_length','2019-08-07 01:42:09.440887'),(11,'auth','0009_alter_user_last_name_max_length','2019-08-07 01:42:09.449896'),(12,'auth','0010_alter_group_name_max_length','2019-08-07 01:42:09.469914'),(13,'auth','0011_update_proxy_permissions','2019-08-07 01:42:09.482926'),(14,'api','0001_initial','2019-08-07 01:42:10.046944'),(15,'account','0001_initial','2019-08-07 01:42:11.701450'),(16,'account','0002_email_max_length','2019-08-07 01:42:12.115827'),(17,'admin','0001_initial','2019-08-07 01:42:12.177892'),(18,'admin','0002_logentry_remove_auto_add','2019-08-07 01:42:12.405091'),(19,'admin','0003_logentry_add_action_flag_choices','2019-08-07 01:42:12.419105'),(20,'authtoken','0001_initial','2019-08-07 01:42:12.479158'),(21,'authtoken','0002_auto_20160226_1747','2019-08-07 01:42:12.849495'),(22,'sessions','0001_initial','2019-08-07 01:42:12.898540'),(23,'sites','0001_initial','2019-08-07 01:42:12.960597'),(24,'sites','0002_alter_domain_unique','2019-08-07 01:42:12.995629'),(25,'socialaccount','0001_initial','2019-08-07 01:42:13.337940'),(26,'socialaccount','0002_token_max_lengths','2019-08-07 01:42:14.046585'),(27,'socialaccount','0003_extra_data_default_dict','2019-08-07 01:42:14.059597'),(28,'api','0002_auto_20190807_0249','2019-08-07 06:49:07.687218'),(29,'api','0003_auto_20190807_0255','2019-08-07 06:55:26.693558'),(30,'api','0004_auto_20190807_0257','2019-08-07 06:57:15.613299'),(31,'api','0005_auto_20190807_0258','2019-08-07 06:59:00.093789');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('0ckhv8tygb1ywsh4jagn15ujtzc7ybz9','NWMyNjZmNDEzZGM0NTZlOTViMTkwYzNlYzBiNGVlYWI2NDljNzBlMTp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6ImoiLCJfYXV0aF91c2VyX2lkIjoiMTkiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI3YmZmYzQ1MGI5ZmYzYTkzMGUyNWU3ZDdiMWY3MmU1OWVkNTkyYzQyIn0=','2019-08-21 22:48:03.596309'),('1g7vkeuh8u3sdnr794oxhcu4yakqk0qe','NDk5OWYwMjgwNzRiMDg4NzAxZWM4YTNkNGMxNDdkNGY1NmE0ZTI4ZDp7Il9hdXRoX3VzZXJfaWQiOiIxNSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiMDc5N2U1ZGY5NTc1Y2UzYTZjZDZjZDY2ZWJkYjIyNjY4OWEyMGU2ZSJ9','2019-08-21 22:48:11.734188'),('2kyrmc3de7hw72qlubsppkrhfmsqpacb','YzMxOTY4ZmUzOTY3MjllZjdmYWFkMTc0M2U5MGI2ODZiYmE3MmE4MDp7Il9hdXRoX3VzZXJfaWQiOiIxNSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiMDBkZDE3NDM3NzllYzJmMWRkZjA0NjMxMzI0YjI5ZWM2MzUxM2Q0YSJ9','2019-08-22 14:59:20.669609'),('4pibyn7421l7q0ad3ret7gr34hy7ixtz','YjlkNTI3NGRhMmI2NDMyMDgzZTY3ZWFjYmYzMjY4ZDQ4MmI5NDUxODp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6ImQiLCJfYXV0aF91c2VyX2lkIjoiMTMiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkNTVhMjFkNmJiYmJmYzA2NzQzOWNiMzMyNmU2YWQ5NzYzZGM3ZmRlIn0=','2019-08-21 22:48:02.623423'),('54mam2sy1vl78ezot8st0m0c868wzrrk','ZjQxYzQ4ZDA1MzM3YjY1OTc4OTY3MGZkMWQxMGE0OWY1MmM1NDg5NDp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6Im0iLCJfYXV0aF91c2VyX2lkIjoiMjIiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJlODlhZGVmZDk3Y2I5NmJmZmQ3Y2Y2MzI3OTgyYWJjNWViNzRmMDhhIn0=','2019-08-21 22:48:04.056735'),('66mdjftgj6vpnkx8x2iy58spjohi526u','MzM4OThlMmU3ZGUyZjUxY2U3YTE0MzI4ZTAzOWFhNDg4NzViMzFmNzp7Il9hdXRoX3VzZXJfaWQiOiIxMyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZDU1YTIxZDZiYmJiZmMwNjc0MzljYjMzMjZlNmFkOTc2M2RjN2ZkZSJ9','2019-08-21 22:48:16.687192'),('6aivucekfxekxwrfmvugc7y1rn65y0ig','MjViMTI4ZjhlZjA4MTViMmUyMzM5MGE3NjBiYmUzMmE1NDNlYTMzYTp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6IjYiLCJfYXV0aF91c2VyX2lkIjoiNiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjliZDZjYjQ4YTE2MTIzMTFhNWQ1NDI0MjE2NmQ5MWEzMTQ1ZTFjZGEifQ==','2019-08-21 05:05:28.342896'),('6gqx9gw8ajqt4rf7hc49lf3ednj362h9','ZTk4MDFkMzgxYzI5OGJjZWMxMjM0YzY1MjIxZmQzMmI1YjdhZmFkMzp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6ImkiLCJfYXV0aF91c2VyX2lkIjoiMTgiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJhZGVhMmU5OGExN2M5MjYxZmEzMTFiYzM2ZDVlYzIyZDRiZDE2OTA2In0=','2019-08-21 22:48:03.443169'),('6iyr2347lmbnwhb6gseh3e80urnsn509','MTJiMGQ0NjY5ZjJiYTI2NmI2ODliOWFiNjQyODFhYWM3YWJhZGZkNDp7Il9hdXRoX3VzZXJfaWQiOiI4IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4M2E5NzI0YWY4MDkyYzljYzg3YTA3NmYyYTFkNGRlYTY3OGQ5NDEzIn0=','2019-08-21 05:34:42.793754'),('79l2u6p7n7v57csycmn5vqsn1jx4n7yx','OWY1MGE4YzZhMGVjODUzM2Q5ODg0OWQ4ZTQ2ZjM3YTUxNmFiMmRjYjp7Il9hdXRoX3VzZXJfaWQiOiI1IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5ZTQ1YWVjZjFkNjYzYzc3ZDc3ZmFjYzBjMTFjMGZjN2ZlNWViODM2In0=','2019-08-21 05:02:34.823154'),('8tl8xu47uh8xdoaz8oi1y01ekzxjzuvr','MmI2Mjc4NmE0NDlmZGY1YWJkMTBjNGM0MDBlOGU3OTU5ZmZhZGFlMzp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6ImIiLCJfYXV0aF91c2VyX2lkIjoiMTEiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5ZWU5MjhkZjZhNTg4OTFhOWYxZGUxYTE2Y2RkYjY0NjRmOTJhNGQ5In0=','2019-08-21 06:59:21.234394'),('8vbluwbvnelfdnx02mmx563kzncex7o5','MmQzZmE0ODlkZjlmOTk0ZDAyNzNlNDgwOWQ3OTFhOTVmNzYyOTYxMDp7Il9hdXRoX3VzZXJfaWQiOiIxNCIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiNWJhZDFkMTkzZjNmOGZkYTAwODFlZjY4ZjZiMzUxYzM3OGFmOTUyNyJ9','2019-08-22 02:20:43.417555'),('94rccehug1nukpkrfh29gp3vdg3iimzn','MmE3OTg4MWRmMWQ4MjUxYmRhYmVmMzhmYmM2OTY0YWRhMWViMjQyYjp7Il9hdXRoX3VzZXJfaWQiOiIyMiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZTg5YWRlZmQ5N2NiOTZiZmZkN2NmNjMyNzk4MmFiYzVlYjc0ZjA4YSJ9','2019-08-21 22:48:12.580959'),('aesbpcd9ahr51b9mv31yxuv7jwsxktsb','Yzc5MzBjZDI4OWUxNWYyNjlkZjJiNzFkNTA2YjQxMTczZmNiMTQyMjp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6IjIiLCJfYXV0aF91c2VyX2lkIjoiMiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjVjZDhjZDlhZWNlNGM4MzhkZGM1NDgwODQ3MmRjNjdmZmI5NjliYTIifQ==','2019-08-21 04:17:07.965960'),('b5uyhome2mxea6jkque4qeprs659pk2v','MmQzZmE0ODlkZjlmOTk0ZDAyNzNlNDgwOWQ3OTFhOTVmNzYyOTYxMDp7Il9hdXRoX3VzZXJfaWQiOiIxNCIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiNWJhZDFkMTkzZjNmOGZkYTAwODFlZjY4ZjZiMzUxYzM3OGFmOTUyNyJ9','2019-08-22 01:53:14.218787'),('byepeb7am2yy7sfrfd7fn1zkwuepwi39','MzM4OThlMmU3ZGUyZjUxY2U3YTE0MzI4ZTAzOWFhNDg4NzViMzFmNzp7Il9hdXRoX3VzZXJfaWQiOiIxMyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZDU1YTIxZDZiYmJiZmMwNjc0MzljYjMzMjZlNmFkOTc2M2RjN2ZkZSJ9','2019-08-22 06:01:30.344585'),('d4ebme1to71gdkzu9vcmu8q9wukkgsxt','YTk4NmExNjFmMDIxNzgyZGM0YWIxZmQ4Yjk4ZDYwNjI0NzEzNzViMjp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6ImwiLCJfYXV0aF91c2VyX2lkIjoiMjEiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJlYWY5OGMwMzZhZjQ2NmQ0ZmE2MzA2ODBhZGY4OGY0ZWI1ZmZmMTYxIn0=','2019-08-21 22:48:03.899585'),('f34se7zujszlnvyfpq0j8tph5sj149pd','MmQzZmE0ODlkZjlmOTk0ZDAyNzNlNDgwOWQ3OTFhOTVmNzYyOTYxMDp7Il9hdXRoX3VzZXJfaWQiOiIxNCIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiNWJhZDFkMTkzZjNmOGZkYTAwODFlZjY4ZjZiMzUxYzM3OGFmOTUyNyJ9','2019-08-21 22:48:11.616081'),('glho6m9o5bt4eo2n9adpnwstd3ousc0h','NjFjZDIxNjEwODM1MzQ3ZDE0ZTAzMThiMThhZGIzNGQ2OTFkMjhmODp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6IjgiLCJfYXV0aF91c2VyX2lkIjoiOCIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjgzYTk3MjRhZjgwOTJjOWNjODdhMDc2ZjJhMWQ0ZGVhNjc4ZDk0MTMifQ==','2019-08-21 05:30:35.298780'),('gsnp57edh4ke1s1ljhcmxg3m23rgyd12','ZjM3ZDJkMzk5NDhlMGQ1OTA3NGQ0MjlhMDQxYmZjODU2Y2FmMjA2ZTp7Il9hdXRoX3VzZXJfaWQiOiIxOCIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiYWRlYTJlOThhMTdjOTI2MWZhMzExYmMzNmQ1ZWMyMmQ0YmQxNjkwNiJ9','2019-08-21 22:48:12.107528'),('gt9mgd3xml7m1iz40uc6qnkwerabsa2f','NjdlMGY2YjE2MmQzMGEyMWFkZTg5ZTdmZTYyMTgxMDQxYzJmY2FmOTp7Il9hdXRoX3VzZXJfaWQiOiIyMCIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiNWNlZmNkYjk1ZWJmODE1YTg0MDc5ZWJmOTA5MjMyODI2MTdlY2QzOCJ9','2019-08-21 22:48:12.344744'),('ha68v4r9sla4fburvnhwgy14bh030xab','NjcyNTIxODAxNGYyMGZmZjE3NGEwNmVhNmQyZmUzMzMyZmU1YWQwMzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5ZTcxMGMzMzIzYjFhYjJjMGZlNWVjZjIxMGIxM2Y5YzJlYzE2NDgzIn0=','2019-08-21 04:03:18.830294'),('jeg5ccy50vy7l5k8fli0z2milqr7eu1n','YzYyZjAzMmEzZDFkYWNiMjZkNDBmM2M5NDA0NDMyZGRlMzExNjFlYTp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6IjMiLCJfYXV0aF91c2VyX2lkIjoiMyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjBjOWMzNjRkYWUxM2M2OTVhOGIzYWEzODNmMWY2YzkyZTI1MTE5MmYifQ==','2019-08-21 04:18:16.297034'),('jjpvisbja4p9asn8hqkgwjfbltnfxjdp','MTJiMGQ0NjY5ZjJiYTI2NmI2ODliOWFiNjQyODFhYWM3YWJhZGZkNDp7Il9hdXRoX3VzZXJfaWQiOiI4IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4M2E5NzI0YWY4MDkyYzljYzg3YTA3NmYyYTFkNGRlYTY3OGQ5NDEzIn0=','2019-08-21 06:19:36.183436'),('jnwg8o951hpw1r03pktf0ffkh3ed104c','NjRlY2U4NGE3OTJlY2RkMmIxOTI0MzgyYjlhMmNjNDEwMmNiNDRjYzp7Il9hdXRoX3VzZXJfaWQiOiIxOSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiN2JmZmM0NTBiOWZmM2E5MzBlMjVlN2Q3YjFmNzJlNTllZDU5MmM0MiJ9','2019-08-21 22:48:12.226637'),('jy1i6d8t1qtw1yb01qiii3ficpds6ejr','ZDk0MmU5OTk3YjcyYWViMGI0NDBmNGYxNmU5OTk2ZjhmMjUwMjZhMDp7Il9hdXRoX3VzZXJfaWQiOiIxNyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZTViYzliYmIzYjg0ZWJmNGM5NjI0Yjc0YzQ2MjQzNzdlYTg5OThmNSJ9','2019-08-21 22:48:11.974408'),('lagf9v6hukpcupw1ydp3g2q5ztbh2j4l','NDljMTdiZTkxMDc2NDYwNDc2MTgyZWRmOWI2NTkwODg2MTdmMDMyYjp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6ImsiLCJfYXV0aF91c2VyX2lkIjoiMjAiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI1Y2VmY2RiOTVlYmY4MTVhODQwNzllYmY5MDkyMzI4MjYxN2VjZDM4In0=','2019-08-21 22:48:03.749448'),('liho7n5ty7fp9mvuoxakyw2o63jbj3mt','NjRkOGY4MDBlMDA1MmJmMGYxMGJjMGYzMzI2M2Q1NWE0OTk0ZmQ3MDp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6IjUiLCJfYXV0aF91c2VyX2lkIjoiNSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjllNDVhZWNmMWQ2NjNjNzdkNzdmYWNjMGMxMWMwZmM3ZmU1ZWI4MzYifQ==','2019-08-21 04:59:47.790456'),('lo75kkqh6iqg3qna0564bwqykk55nrxd','ZGUzMTcxYTNjODdhMzdkNTM4MzRiNGQyOTFjNzc2MjQ1N2QzMDk0Njp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6Im4iLCJfYXV0aF91c2VyX2lkIjoiMjMiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjNTYzM2RmZDI4MDExOGQ2Mjc5MzQxMjQyYmVjN2ZkNzgzYmU5ZTBlIn0=','2019-08-22 05:17:13.113431'),('ngq3xc9g3lq845zn3m27y7egm1746uku','OTE1NjlkNWQwMTRkNzM0NGJlNzBlYTVjNTRlNmU2YTA4OTM4NTEzYzp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6ImgiLCJfYXV0aF91c2VyX2lkIjoiMTciLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJlNWJjOWJiYjNiODRlYmY0Yzk2MjRiNzRjNDYyNDM3N2VhODk5OGY1In0=','2019-08-21 22:48:03.291031'),('nskzxbqx2yees94r8paz3ae07413lpzf','ZWVjMWNjYWE1ZTBhMzExNjUzZmIxZjk3NGFjODI4NDM2ZDk5MjkyZjp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6ImYiLCJfYXV0aF91c2VyX2lkIjoiMTUiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIwNzk3ZTVkZjk1NzVjZTNhNmNkNmNkNjZlYmRiMjI2Njg5YTIwZTZlIn0=','2019-08-21 22:48:02.968737'),('nxn6ucc3pz64xlfk0ezvizo4qzvyt4bc','NDFkOTNkNDA1MzBhMzgzYTEzMGYzZTE1OWExY2VjNDFiYTRjMTQwYjp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6IjQiLCJfYXV0aF91c2VyX2lkIjoiNCIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjIwOWIxMjUzYTg4NjUxMzk3MzZhMzYzYzYyNTExNDdiMDExNzI0NjYifQ==','2019-08-21 04:27:33.633365'),('o2qrupeihma5fnkx7zn42f9364x0lz9f','MzM4OThlMmU3ZGUyZjUxY2U3YTE0MzI4ZTAzOWFhNDg4NzViMzFmNzp7Il9hdXRoX3VzZXJfaWQiOiIxMyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZDU1YTIxZDZiYmJiZmMwNjc0MzljYjMzMjZlNmFkOTc2M2RjN2ZkZSJ9','2019-08-22 01:09:55.347036'),('pe13wyxhsujcifdfa4y7oc03nt68cwhj','ZjEwYzIxZDBjNzA3NmM2Mjc0YmNlYWIzMmI0MDZlNGE2YTliOGIwYzp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6ImEiLCJfYXV0aF91c2VyX2lkIjoiMTAiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIwZThiMmIwMGRiOGQ2MWQzYjQxMzVhMmE4MmQxZmIwNmE2ZTM0NjM5In0=','2019-08-21 06:50:18.275746'),('q9wabmwf0si1e8kdh5xn6ogl4eu9rry1','MTRkNTE2Mjg5OGI4MmY5MDQ1YzM0MWIwOWQ2ODE4YThhNTA1NjFmMDp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6ImMiLCJfYXV0aF91c2VyX2lkIjoiMTIiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzM2E1ZjY5MWZjYzVlZTdhN2NiMzFjZTM0M2NiYWNjZTFlZmQxMjg5In0=','2019-08-21 07:01:41.664611'),('qw6za18ak8zfz2k2xj7g6utpp5eec4fi','NzFlMDBiODFjOGRhMmVjMmJiNWY1MDNlYjdiMjNlMmM2N2UyMzEzNDp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6ImUiLCJfYXV0aF91c2VyX2lkIjoiMTQiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI1YmFkMWQxOTNmM2Y4ZmRhMDA4MWVmNjhmNmIzNTFjMzc4YWY5NTI3In0=','2019-08-21 22:48:02.779565'),('r0wwh3rgvjs3i9yu2cl81v1f91vjz61u','NmIzZjRjY2ZhMTFiY2M3YTRkOTgyODJhN2RlNmVjNjQwMzBmYjg3Yjp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6IjciLCJfYXV0aF91c2VyX2lkIjoiNyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6ImE4NjVkYjdjNTcxNzIxZGZlNzA1NDI1ZjdiMjQ3ZWU5ZjQ2YTI1MTQifQ==','2019-08-21 05:27:05.808088'),('rhi4tgfbsyzyehcp0t1gxnxgd42vjwfb','OTllZmQ1OTUzNzVkZjJkZWUyMzI2ODczOTFmZWU1NDcxYTk3OTgzOTp7Il9hdXRoX3VzZXJfaWQiOiIyMSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZWFmOThjMDM2YWY0NjZkNGZhNjMwNjgwYWRmODhmNGViNWZmZjE2MSJ9','2019-08-21 22:48:12.462851'),('rxd9l7fwdwwmi84vog7h9t9c0fet5hip','MDQzNjllMzBlMDhhMGE0NzdiNzM4NTdjOGZlMzc2YTQ4ZDA0YzY0NDp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6ImciLCJfYXV0aF91c2VyX2lkIjoiMTYiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJlNDcwNzExN2Y4MzI1NjliODM5ODU1YWFmZGFjMWY2N2Y2MmQxMTI2In0=','2019-08-21 22:48:03.131886'),('w2bw3fh5m2cc3vqh44snq5ethw0ag8xh','NzRhNTNmNTBkZjRlNDEzMWFkMmYzY2M0Y2M0MzU5NzMyOWNjOWE1ZDp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6IjkiLCJfYXV0aF91c2VyX2lkIjoiOSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6ImY0MTliOWUyYjk5M2UwMzFmMmI5ZDQ3ODIwMTYxMWE1NDg0ZDY0MjIifQ==','2019-08-21 06:31:34.057514'),('wg8icu4lrf6lsi552fhg59q6oxcy01j6','N2NkZjEzZjAwNzMwMjUxNmQzMWI2MTBlMjcwMmQ4ZTZmMDg4YmEyNTp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6Im8iLCJfYXV0aF91c2VyX2lkIjoiMjQiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI3MWFlMjA5NmQzZGNjNzRmZTM0MTkyM2ZhNmQ2MGQyOWQ1NzQ1MGIwIn0=','2019-08-22 06:01:14.751389'),('yqj71nezyjv3wq92jx3z3r7gyhl886ff','MzM4OThlMmU3ZGUyZjUxY2U3YTE0MzI4ZTAzOWFhNDg4NzViMzFmNzp7Il9hdXRoX3VzZXJfaWQiOiIxMyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZDU1YTIxZDZiYmJiZmMwNjc0MzljYjMzMjZlNmFkOTc2M2RjN2ZkZSJ9','2019-08-21 22:48:11.491968'),('zrtn9ct7aqth2lknzv3e38274iad69eg','MDBlZDUyNTc3YTM0YTNhNmE1NGQ3YjYxNjlkMzIzYjg0ZjI2YjBmMzp7Il9hdXRoX3VzZXJfaWQiOiIxNiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZTQ3MDcxMTdmODMyNTY5YjgzOTg1NWFhZmRhYzFmNjdmNjJkMTEyNiJ9','2019-08-21 22:48:11.852296');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_site`
--

DROP TABLE IF EXISTS `django_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_site` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_site_domain_a2e37b91_uniq` (`domain`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_site`
--

LOCK TABLES `django_site` WRITE;
/*!40000 ALTER TABLE `django_site` DISABLE KEYS */;
INSERT INTO `django_site` VALUES (1,'example.com','example.com');
/*!40000 ALTER TABLE `django_site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialaccount`
--

DROP TABLE IF EXISTS `socialaccount_socialaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialaccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) NOT NULL,
  `uid` varchar(191) NOT NULL,
  `last_login` datetime(6) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `extra_data` longtext NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialaccount_provider_uid_fc810c6e_uniq` (`provider`,`uid`),
  KEY `socialaccount_socialaccount_user_id_8146e70c_fk_api_puser_id` (`user_id`),
  CONSTRAINT `socialaccount_socialaccount_user_id_8146e70c_fk_api_puser_id` FOREIGN KEY (`user_id`) REFERENCES `api_puser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialaccount`
--

LOCK TABLES `socialaccount_socialaccount` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp`
--

DROP TABLE IF EXISTS `socialaccount_socialapp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialapp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) NOT NULL,
  `name` varchar(40) NOT NULL,
  `client_id` varchar(191) NOT NULL,
  `secret` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp`
--

LOCK TABLES `socialaccount_socialapp` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp_sites`
--

DROP TABLE IF EXISTS `socialaccount_socialapp_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialapp_sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `socialapp_id` int(11) NOT NULL,
  `site_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialapp_sites_socialapp_id_site_id_71a9a768_uniq` (`socialapp_id`,`site_id`),
  KEY `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` (`site_id`),
  CONSTRAINT `socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc` FOREIGN KEY (`socialapp_id`) REFERENCES `socialaccount_socialapp` (`id`),
  CONSTRAINT `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` FOREIGN KEY (`site_id`) REFERENCES `django_site` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp_sites`
--

LOCK TABLES `socialaccount_socialapp_sites` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialtoken`
--

DROP TABLE IF EXISTS `socialaccount_socialtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialtoken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `token_secret` longtext NOT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `account_id` int(11) NOT NULL,
  `app_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq` (`app_id`,`account_id`),
  KEY `socialaccount_social_account_id_951f210e_fk_socialacc` (`account_id`),
  CONSTRAINT `socialaccount_social_account_id_951f210e_fk_socialacc` FOREIGN KEY (`account_id`) REFERENCES `socialaccount_socialaccount` (`id`),
  CONSTRAINT `socialaccount_social_app_id_636a42d7_fk_socialacc` FOREIGN KEY (`app_id`) REFERENCES `socialaccount_socialapp` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialtoken`
--

LOCK TABLES `socialaccount_socialtoken` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialtoken` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-08 11:51:11
