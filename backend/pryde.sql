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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailaddress`
--

LOCK TABLES `account_emailaddress` WRITE;
/*!40000 ALTER TABLE `account_emailaddress` DISABLE KEYS */;
INSERT INTO `account_emailaddress` VALUES (1,'barronfran@gmail.com',1,1,2),(2,'dubois.barron@gmail.com',1,1,3),(3,'william.oliver.wang@gmail.com',1,1,4),(4,'test4@gmail.com',1,1,5),(5,'test5@gmail.com',1,1,6),(6,'test6@gmail.com',1,1,7),(7,'test7@gmail.com',1,1,8),(8,'test8@gmail.com',1,1,9),(9,'test9@gmail.com',1,1,10),(10,'test10@gmail.com',1,1,11);
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
-- Table structure for table `api_agerangeproject`
--

DROP TABLE IF EXISTS `api_agerangeproject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_agerangeproject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ageRange` varchar(100) NOT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_agerangeproject_project_id_aadf88f6_fk_api_project_id` (`project_id`),
  CONSTRAINT `api_agerangeproject_project_id_aadf88f6_fk_api_project_id` FOREIGN KEY (`project_id`) REFERENCES `api_project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_agerangeproject`
--

LOCK TABLES `api_agerangeproject` WRITE;
/*!40000 ALTER TABLE `api_agerangeproject` DISABLE KEYS */;
INSERT INTO `api_agerangeproject` VALUES (1,'Young teens (12-14 years)',1),(2,'Toddlers (1-2 years)',1),(3,'Infants (0-1 year)',2),(4,'Toddlers (1-2 years)',2),(5,'Teenagers (15-17 years)',3),(6,'Toddlers (1-2 years)',3),(7,'Toddlers (2-3 years)',4),(8,'Early childhood (6-8 years)',4),(9,'Infants (0-1 year)',5),(10,'Toddlers (1-2 years)',5),(11,'Toddlers (2-3 years)',6),(12,'Middle childhood (9-11 years)',6),(13,'Early childhood (6-8 years)',7),(14,'Teenagers (15-17 years)',7),(15,'Middle childhood (9-11 years)',8),(16,'Early childhood (6-8 years)',8),(17,'Early childhood (6-8 years)',9),(18,'Young adults (18-24 years)',9),(19,'Middle childhood (9-11 years)',10),(20,'Preschoolers (3-5 years)',10),(21,'Teenagers (15-17 years)',11),(22,'Middle childhood (9-11 years)',11),(23,'Young adults (18-24 years)',12),(24,'Teenagers (15-17 years)',12),(25,'Toddlers (1-2 years)',13),(26,'Young teens (12-14 years)',13),(27,'Middle childhood (9-11 years)',14),(28,'Young teens (12-14 years)',14),(29,'Middle childhood (9-11 years)',15),(30,'Teenagers (15-17 years)',15),(31,'Early childhood (6-8 years)',16),(32,'Teenagers (15-17 years)',16),(33,'Teenagers (15-17 years)',17),(34,'Early childhood (6-8 years)',17),(35,'Middle childhood (9-11 years)',18),(36,'Preschoolers (3-5 years)',18),(37,'Infants (0-1 year)',19),(38,'Toddlers (1-2 years)',19),(39,'Teenagers (15-17 years)',20),(40,'Young adults (18-24 years)',20),(41,'Young teens (12-14 years)',21),(42,'Teenagers (15-17 years)',21),(43,'Middle childhood (9-11 years)',22),(44,'Teenagers (15-17 years)',22),(45,'Preschoolers (3-5 years)',23),(46,'Teenagers (15-17 years)',23),(47,'Young teens (12-14 years)',24),(48,'Young adults (18-24 years)',24),(49,'Young adults (18-24 years)',25),(50,'Young teens (12-14 years)',25),(51,'Teenagers (15-17 years)',26),(52,'Toddlers (2-3 years)',26);
/*!40000 ALTER TABLE `api_agerangeproject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_agerangeuser`
--

DROP TABLE IF EXISTS `api_agerangeuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_agerangeuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ageRange` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_agerangeuser_user_id_baa876ae_fk_api_puser_id` (`user_id`),
  CONSTRAINT `api_agerangeuser_user_id_baa876ae_fk_api_puser_id` FOREIGN KEY (`user_id`) REFERENCES `api_puser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_agerangeuser`
--

LOCK TABLES `api_agerangeuser` WRITE;
/*!40000 ALTER TABLE `api_agerangeuser` DISABLE KEYS */;
INSERT INTO `api_agerangeuser` VALUES (1,'Middle childhood (9-11 years)',2),(2,'Toddlers (2-3 years)',2),(3,'Young teens (12-14 years)',3),(4,'Preschoolers (3-5 years)',3),(5,'Toddlers (2-3 years)',4),(6,'Early childhood (6-8 years)',4),(7,'Early childhood (6-8 years)',5),(8,'Toddlers (2-3 years)',5),(9,'Young teens (12-14 years)',6),(10,'Middle childhood (9-11 years)',6),(11,'Early childhood (6-8 years)',7),(12,'Young adults (18-24 years)',7),(13,'Teenagers (15-17 years)',8),(14,'Toddlers (1-2 years)',8),(15,'Middle childhood (9-11 years)',9),(16,'Preschoolers (3-5 years)',9),(17,'Young adults (18-24 years)',10),(18,'Early childhood (6-8 years)',10),(19,'Toddlers (1-2 years)',11),(20,'Toddlers (2-3 years)',11);
/*!40000 ALTER TABLE `api_agerangeuser` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_collaborator`
--

LOCK TABLES `api_collaborator` WRITE;
/*!40000 ALTER TABLE `api_collaborator` DISABLE KEYS */;
INSERT INTO `api_collaborator` VALUES (1,1,0,0,1,3,1),(2,1,0,1,1,4,1),(3,0,0,0,1,5,1),(4,0,1,0,1,6,1),(5,1,1,1,1,3,2),(6,0,0,1,1,4,2),(7,1,1,0,1,5,2),(8,1,0,1,1,6,2),(9,1,1,0,1,3,3),(10,0,1,0,1,4,3),(11,1,0,1,1,5,3),(12,0,1,1,1,6,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_deliverymodeproject`
--

LOCK TABLES `api_deliverymodeproject` WRITE;
/*!40000 ALTER TABLE `api_deliverymodeproject` DISABLE KEYS */;
INSERT INTO `api_deliverymodeproject` VALUES (1,'Clubs',1),(2,'asdlkfsdf',1),(3,'aslkdfjsd',2),(4,'Clubs',2),(5,'Afterschool programs',3),(6,'aslkdfjsd',3),(7,'asdlkfsdf',4),(8,'Clubs',4),(9,'Camps',5),(10,'Camps',5),(11,'Camps',6),(12,'asdlkfsdf',6),(13,'Afterschool programs',7),(14,'Afterschool programs',7),(15,'Afterschool programs',8),(16,'asdlkfsdf',8),(17,'Camps',9),(18,'Camps',9),(19,'asdlkfsdf',10),(20,'Camps',10),(21,'aslkdfjsd',11),(22,'Clubs',11),(23,'asdlkfsdf',12),(24,'Afterschool programs',12),(25,'Afterschool programs',13),(26,'asdlkfsdf',13),(27,'aslkdfjsd',14),(28,'Clubs',14),(29,'Camps',15),(30,'aslkdfjsd',15),(31,'asdlkfsdf',16),(32,'asdlkfsdf',16),(33,'asdlkfsdf',17),(34,'asdlkfsdf',17),(35,'asdlkfsdf',18),(36,'Afterschool programs',18),(37,'Camps',19),(38,'Afterschool programs',19),(39,'Camps',20),(40,'Camps',20),(41,'aslkdfjsd',21),(42,'Clubs',21),(43,'Afterschool programs',22),(44,'aslkdfjsd',22),(45,'asdlkfsdf',23),(46,'asdlkfsdf',23),(47,'asdlkfsdf',24),(48,'Afterschool programs',24),(49,'Afterschool programs',25),(50,'Afterschool programs',25),(51,'aslkdfjsd',26),(52,'Clubs',26);
/*!40000 ALTER TABLE `api_deliverymodeproject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_deliverymodeuser`
--

DROP TABLE IF EXISTS `api_deliverymodeuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_deliverymodeuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deliveryMode` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_deliverymodeuser_user_id_dbdacec9_fk_api_puser_id` (`user_id`),
  CONSTRAINT `api_deliverymodeuser_user_id_dbdacec9_fk_api_puser_id` FOREIGN KEY (`user_id`) REFERENCES `api_puser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_deliverymodeuser`
--

LOCK TABLES `api_deliverymodeuser` WRITE;
/*!40000 ALTER TABLE `api_deliverymodeuser` DISABLE KEYS */;
INSERT INTO `api_deliverymodeuser` VALUES (1,'Camps',2),(2,'Afterschool',2),(3,'Afterschool',3),(4,'Camps',3),(5,'Clubs',4),(6,'Camps',4),(7,'Clubs',5),(8,'Afterschool',5),(9,'Camps',6),(10,'Camps',6),(11,'Clubs',7),(12,'Clubs',7),(13,'Clubs',8),(14,'Camps',8),(15,'Afterschool',9),(16,'Afterschool',9),(17,'Afterschool',10),(18,'Afterschool',10),(19,'Camps',11),(20,'Afterschool',11);
/*!40000 ALTER TABLE `api_deliverymodeuser` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_file`
--

LOCK TABLES `api_file` WRITE;
/*!40000 ALTER TABLE `api_file` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_project`
--

LOCK TABLES `api_project` WRITE;
/*!40000 ALTER TABLE `api_project` DISABLE KEYS */;
INSERT INTO `api_project` VALUES (1,'Science','2','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:05.258713','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,2),(2,'Reading','3','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:07.352666','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,2),(3,'Science','1','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:09.421269','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,2),(4,'Animals','1','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:11.504548','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,3),(5,'Children','2','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:13.569920','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,3),(6,'Science','3','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:15.626157','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,3),(7,'Animals','3','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:17.687289','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,4),(8,'Reading','3','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:19.749021','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,4),(9,'Children','3','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:21.826443','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,5),(10,'Science','1','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:23.888178','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,5),(11,'Children','2','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:25.966907','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,6),(12,'Animals','1','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:28.033960','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,6),(13,'Children','2','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:30.104055','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,6),(14,'Children','2','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:32.169807','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,6),(15,'Children','1','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:34.246136','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,7),(16,'Engagement','2','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:36.313261','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,7),(17,'Engagement','2','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:38.403566','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,7),(18,'Technology','2','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:40.490818','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,8),(19,'Technology','2','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:42.564943','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,8),(20,'Science','2','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:44.645023','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,9),(21,'Technology','1','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:46.717657','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,9),(22,'Animals','2','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:48.829518','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,10),(23,'Animals','3','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:50.899401','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,10),(24,'Reading','2','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:53.002243','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,11),(25,'Reading','1','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:55.083733','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,11),(26,'Technology','2','summary about the project','May to August','May to August','none','django and react','project','2019-08-21 00:52:57.155189','{\"email\": \"\", \"phone\": \"\", \"website\": \"\", \"last_name\": \"\", \"first_name\": \"\"}','',1,11);
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
  `researchNeeds` longtext,
  `evaluationNeeds` longtext,
  `profile_picture` varchar(100) DEFAULT NULL,
  `type` varchar(15) NOT NULL,
  `over18` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_puser`
--

LOCK TABLES `api_puser` WRITE;
/*!40000 ALTER TABLE `api_puser` DISABLE KEYS */;
INSERT INTO `api_puser` VALUES (2,'pbkdf2_sha256$150000$vQTblm9OB5u3$9UgAapWtGcjiq2FQwOb2MUx0zU2wD3VNeWP+as7b6yE=','2019-08-21 00:53:36.484602',0,'barron','Barron','DuBois',0,1,'2019-08-21 00:46:01.705883',0,0,'1','Practice Focused Role','Cornell University','Ithaca, NY','barronfran@gmail.com','+14432232248','http://www.google.com','I love doing research','Design youth programs,Lead youth programs,Evaluate youth programs','This is a research need!','This is an evaluation need!','','user',1),(3,'pbkdf2_sha256$150000$jj7R3I4IEsSg$De5hvwKie3pyA4X7l8FPvgzwTW2mkbyF3h9ao2X3mWc=','2019-08-21 00:51:43.948710',0,'barron22','Barron','DuBois II',0,1,'2019-08-21 00:46:06.264407',0,0,'1','Practice Focused Role','Cornell University','Ithaca, NY','dubois.barron@gmail.com','+14432232248','http://www.google.com','I love doing research','Lead youth programs,Design youth programs,Write grants','This is a research need!','This is an evaluation need!','','user',1),(4,'pbkdf2_sha256$150000$Nxa6M4odzrLL$P4kc5aafaGTbK6e2U31wENRVY5ECmlchffS6iMA+jwY=','2019-08-21 07:48:17.654899',0,'william','William','Wang',0,1,'2019-08-21 00:46:09.000000',0,1,'1','Other CCE Role','Cornell University','Ithaca, NY','william.oliver.wang@gmail.com','+14432232248','http://www.google.com','I love doing research','Train volunteers,Train volunteers,Design youth programs','This is a research need!','This is an evaluation need!','','user',1),(5,'pbkdf2_sha256$150000$HTG7Csslibfu$y8DLaxvH2Rz8xZIT30pGz3gaSFAqDfCr1ItRjAyql5c=','2019-08-21 05:09:04.254802',0,'john','John','Johnson',0,1,'2019-08-21 00:47:30.428669',1,0,'1','Research Focused Role','Cornell University','Ithaca, NY','test4@gmail.com','+14432232248','http://www.google.com','I love doing research','Write grants,Write grants,Train volunteers','This is a research need!','This is an evaluation need!','','user',1),(6,'pbkdf2_sha256$150000$wyxY5msG9X1h$Lgi/jx2kClKJ465Q/HqD4SffzYVMdocomV7LZa7WL8w=','2019-08-21 03:55:17.308114',0,'andy','Andy','Johnson',0,1,'2019-08-21 00:47:34.704610',1,0,'1','Research Focused Role','Cornell University','Ithaca, NY','test5@gmail.com','+14432232248','http://www.google.com','I love doing research','Train volunteers,Design youth programs,Design youth programs','This is a research need!','This is an evaluation need!','','user',1),(7,'pbkdf2_sha256$150000$5EJhl6lhB8Dd$ifDLtHHwpORhVlDbfr6xZSxkEdWaZH+COhBtSvVuO6M=','2019-08-21 03:55:31.158783',0,'lauren','Lauren','Jones',0,1,'2019-08-21 00:47:38.048837',1,0,'2','Research Focused Role','Cornell University','Ithaca, NY','test6@gmail.com','+14432232248','http://www.google.com','I love doing research','Design youth programs,Evaluate youth programs,Write grants','This is a research need!','This is an evaluation need!','','user',1),(8,'pbkdf2_sha256$150000$xEmHrc1wet63$16sX+KAtv2CRyGLqYwz0tbws5ndv+KeuHSAY/IKCKsM=','2019-08-21 00:51:55.916802',0,'john80','John','Jones',0,1,'2019-08-21 00:47:41.441939',1,0,'2','Research Focused Role','Cornell University','Ithaca, NY','test7@gmail.com','+14432232248','http://www.google.com','I love doing research','Design youth programs,Design youth programs,Lead youth programs','This is a research need!','This is an evaluation need!','','user',1),(9,'pbkdf2_sha256$150000$1DdXAfU63QZo$zeWU4eHVXP3V2KR+OPXvSObrkKpJtY5Q5eS1tEEBvdI=','2019-08-21 00:51:58.219571',0,'samantha','Samantha','Jones',0,1,'2019-08-21 00:47:44.849594',1,0,'2','Research Focused Role','Cornell University','Ithaca, NY','test8@gmail.com','+14432232248','http://www.google.com','I love doing research','Train volunteers,Lead youth programs,Write grants','This is a research need!','This is an evaluation need!','','user',1),(10,'pbkdf2_sha256$150000$6qu9MNZdxtgH$lnrzYkEOi0139SW3k8N6juoZMCW1QoeDgryzGIzdQYk=','2019-08-21 00:52:00.821007',0,'john28','John','Johnson',0,1,'2019-08-21 00:47:48.488864',1,0,'2','Research Focused Role','Cornell University','Ithaca, NY','test9@gmail.com','+14432232248','http://www.google.com','I love doing research','Design youth programs,Evaluate youth programs,Lead youth programs','This is a research need!','This is an evaluation need!','','user',1),(11,'pbkdf2_sha256$150000$2GBbvljUp6Iy$XnyZXZSJtt+voxe8/6wJQLly7kUNnlZWWjtnq7x7npQ=','2019-08-21 00:52:03.199382',0,'john63','John','Jones',0,1,'2019-08-21 00:47:52.133232',0,0,'2','Research Focused Role','Rutgers University','New Brunswick, NJ','test10@gmail.com','+14432232248','http://www.google.com','I love doing research','Write grants,Lead youth programs,Lead youth programs','This is a research need!','This is an evaluation need!','','user',1),(12,'pbkdf2_sha256$150000$URLWyL6RfUNn$YShpQY31cyXSGh47WCuNjJwfdC3XBHWD5PH7mqXqOME=','2019-08-21 00:49:59.764847',1,'wow7@cornell.edu','','',1,1,'2019-08-21 00:49:42.809745',0,0,NULL,NULL,'',NULL,'wow7@cornell.edu',NULL,NULL,NULL,'',NULL,NULL,'','user',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_researchinterestuser`
--

LOCK TABLES `api_researchinterestuser` WRITE;
/*!40000 ALTER TABLE `api_researchinterestuser` DISABLE KEYS */;
INSERT INTO `api_researchinterestuser` VALUES (1,'Nutrition',2),(2,'Civic Engagement',2),(3,'Media & Technology',3),(4,'Motivation',3),(5,'Risk Behavior',4),(6,'Self & Identity',4),(7,'alsdkfjds',5),(8,'asdlkfjsdlkj',5),(9,'asldkjfsldjf',6),(10,'Youth/Adult Relationships',6),(11,'aslkdfjsdlk',7),(12,'alsdkjfsdlkjfds',7),(13,'asdlkfjsdlkj',8),(14,'Diversity Equity & Inclusion',8),(15,'asdlfjkds',9),(16,'Self & Identity',9),(17,'Peer Relationships',10),(18,'asldkfjasldkf',10),(19,'Environment & Sustainability',11),(20,'alsdkjfsdlkjfds',11);
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
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_topicsproject`
--

LOCK TABLES `api_topicsproject` WRITE;
/*!40000 ALTER TABLE `api_topicsproject` DISABLE KEYS */;
INSERT INTO `api_topicsproject` VALUES (1,'asdlfkjsdlf',1),(2,'alskdfjsdfl',1),(3,'Civic Engagement',1),(4,'Families',2),(5,'Peer Relationships',2),(6,'Youth/Adult Relationships',2),(7,'alsdkfjlkdsj',3),(8,'Positive Youth Development',3),(9,'Positive Youth Development',3),(10,'Program Evaluation',4),(11,'Environment & Sustainability',4),(12,'Health & Wellness',4),(13,'Positive Youth Development',5),(14,'Animal Science & Agriculture',5),(15,'Positive Youth Development',5),(16,'Positive Youth Development',6),(17,'Diversity Equity & Inclusion',6),(18,'Peer Relationships',6),(19,'Motivation',7),(20,'Families',7),(21,'Nutrition',7),(22,'asdlfkjsdlf',8),(23,'Education & Learning',8),(24,'Health & Wellness',8),(25,'Motivation',9),(26,'Motivation',9),(27,'Motivation',9),(28,'Science Technology Engineering & Math (STEM)',10),(29,'Health & Wellness',10),(30,'Media & Technology',10),(31,'Animal Science & Agriculture',11),(32,'alsdkfjlkdsj',11),(33,'alsdkfjsdlf',11),(34,'alskdfjsdfl',12),(35,'Policy Analysis',12),(36,'asdlfkjsdlf',12),(37,'Self & Identity',13),(38,'Environment & Sustainability',13),(39,'alsdkfjsdlf',13),(40,'Environment & Sustainability',14),(41,'Media & Technology',14),(42,'Risk Behavior',14),(43,'Media & Technology',15),(44,'alsdkfjsdlf',15),(45,'alskdfjsdfl',15),(46,'Animal Science & Agriculture',16),(47,'Environment & Sustainability',16),(48,'Science Technology Engineering & Math (STEM)',16),(49,'Program Evaluation',17),(50,'alskdfjsdfl',17),(51,'Motivation',17),(52,'Environment & Sustainability',18),(53,'Science Technology Engineering & Math (STEM)',18),(54,'Health & Wellness',18),(55,'Youth/Adult Relationships',19),(56,'Diversity Equity & Inclusion',19),(57,'Peer Relationships',19),(58,'Self & Identity',20),(59,'Media & Technology',20),(60,'alsdkfjsdlf',20),(61,'Positive Youth Development',21),(62,'Peer Relationships',21),(63,'Policy Analysis',21),(64,'Policy Analysis',22),(65,'alskdfjsdfl',22),(66,'Environment & Sustainability',22),(67,'Nutrition',23),(68,'Motivation',23),(69,'alsdkfjsdlf',23),(70,'Self & Identity',24),(71,'alsdkfjsdlf',24),(72,'Self & Identity',24),(73,'alsdkfjlkdsj',25),(74,'Education & Learning',25),(75,'Science Technology Engineering & Math (STEM)',25),(76,'Youth/Adult Relationships',26),(77,'alskdfjsdfl',26),(78,'alsdkfjlkdsj',26);
/*!40000 ALTER TABLE `api_topicsproject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_useremailpreference`
--

DROP TABLE IF EXISTS `api_useremailpreference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_useremailpreference` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` enum('1','2') NOT NULL,
  `preferenceName` varchar(100) NOT NULL,
  `preferenceValue` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_useremailpreferences_user_id_2d129df2_fk_api_puser_id` (`user_id`),
  CONSTRAINT `api_useremailpreferences_user_id_2d129df2_fk_api_puser_id` FOREIGN KEY (`user_id`) REFERENCES `api_puser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_useremailpreference`
--

LOCK TABLES `api_useremailpreference` WRITE;
/*!40000 ALTER TABLE `api_useremailpreference` DISABLE KEYS */;
INSERT INTO `api_useremailpreference` VALUES (80,'1','ageRange','Toddlers (1-2 years)',7),(81,'2','ageRange','Preschoolers (3-5 years)',7),(82,'2','deliveryMode','Afterschool programs',7),(83,'1','deliveryMode','Camps',7),(84,'1','researchTopic','Animal Science & Agriculture',7),(85,'2','researchInterest','Families',7),(86,'1','researchTopic','Families',7),(87,'1','ageRange','Toddlers (2-3 years)',6),(88,'1','ageRange','Early childhood (6-8 years)',6),(89,'1','deliveryMode','Afterschool programs',6),(90,'1','researchTopic','Diversity Equity & Inclusion',6),(91,'1','researchTopic','Education & Learning',6),(92,'1','researchTopic','Families',6),(116,'2','ageRange','Toddlers (1-2 years)',4),(117,'2','ageRange','Middle childhood (9-11 years)',4),(118,'1','ageRange','Teenagers (15-17 years)',4),(119,'2','deliveryMode','Camps',4),(120,'1','deliveryMode','Camps',4),(121,'2','deliveryMode','Clubs',4),(122,'1','deliveryMode','Clubs',4),(123,'1','researchTopic','Families',4),(124,'1','researchTopic','Health & Wellness',4),(125,'2','researchInterest','Risk Behavior',4),(126,'2','researchInterest','Science Technology Engineering & Math (STEM)',4),(133,'1','ageRange','Preschoolers (3-5 years)',5),(134,'1','ageRange','Middle childhood (9-11 years)',5),(135,'1','deliveryMode','Clubs',5),(136,'1','researchTopic','Families',5),(137,'1','researchTopic','Health & Wellness',5);
/*!40000 ALTER TABLE `api_useremailpreference` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add site',6,'add_site'),(22,'Can change site',6,'change_site'),(23,'Can delete site',6,'delete_site'),(24,'Can view site',6,'view_site'),(25,'Can add user',7,'add_puser'),(26,'Can change user',7,'change_puser'),(27,'Can delete user',7,'delete_puser'),(28,'Can view user',7,'view_puser'),(29,'Can add project',8,'add_project'),(30,'Can change project',8,'change_project'),(31,'Can delete project',8,'delete_project'),(32,'Can view project',8,'view_project'),(33,'Can add user email preferences',9,'add_useremailpreferences'),(34,'Can change user email preferences',9,'change_useremailpreferences'),(35,'Can delete user email preferences',9,'delete_useremailpreferences'),(36,'Can view user email preferences',9,'view_useremailpreferences'),(37,'Can add Project Research Topic',10,'add_topicsproject'),(38,'Can change Project Research Topic',10,'change_topicsproject'),(39,'Can delete Project Research Topic',10,'delete_topicsproject'),(40,'Can view Project Research Topic',10,'view_topicsproject'),(41,'Can add User Research Interest',11,'add_researchinterestuser'),(42,'Can change User Research Interest',11,'change_researchinterestuser'),(43,'Can delete User Research Interest',11,'delete_researchinterestuser'),(44,'Can view User Research Interest',11,'view_researchinterestuser'),(45,'Can add Additional Project File',12,'add_file'),(46,'Can change Additional Project File',12,'change_file'),(47,'Can delete Additional Project File',12,'delete_file'),(48,'Can view Additional Project File',12,'view_file'),(49,'Can add User Delivery Mode',13,'add_deliverymodeuser'),(50,'Can change User Delivery Mode',13,'change_deliverymodeuser'),(51,'Can delete User Delivery Mode',13,'delete_deliverymodeuser'),(52,'Can view User Delivery Mode',13,'view_deliverymodeuser'),(53,'Can add Project Delivery Mode',14,'add_deliverymodeproject'),(54,'Can change Project Delivery Mode',14,'change_deliverymodeproject'),(55,'Can delete Project Delivery Mode',14,'delete_deliverymodeproject'),(56,'Can view Project Delivery Mode',14,'view_deliverymodeproject'),(57,'Can add collaborator',15,'add_collaborator'),(58,'Can change collaborator',15,'change_collaborator'),(59,'Can delete collaborator',15,'delete_collaborator'),(60,'Can view collaborator',15,'view_collaborator'),(61,'Can add User Age Range',16,'add_agerangeuser'),(62,'Can change User Age Range',16,'change_agerangeuser'),(63,'Can delete User Age Range',16,'delete_agerangeuser'),(64,'Can view User Age Range',16,'view_agerangeuser'),(65,'Can add Project Age Range',17,'add_agerangeproject'),(66,'Can change Project Age Range',17,'change_agerangeproject'),(67,'Can delete Project Age Range',17,'delete_agerangeproject'),(68,'Can view Project Age Range',17,'view_agerangeproject'),(69,'Can add Token',18,'add_token'),(70,'Can change Token',18,'change_token'),(71,'Can delete Token',18,'delete_token'),(72,'Can view Token',18,'view_token'),(73,'Can add email address',19,'add_emailaddress'),(74,'Can change email address',19,'change_emailaddress'),(75,'Can delete email address',19,'delete_emailaddress'),(76,'Can view email address',19,'view_emailaddress'),(77,'Can add email confirmation',20,'add_emailconfirmation'),(78,'Can change email confirmation',20,'change_emailconfirmation'),(79,'Can delete email confirmation',20,'delete_emailconfirmation'),(80,'Can view email confirmation',20,'view_emailconfirmation'),(81,'Can add social account',21,'add_socialaccount'),(82,'Can change social account',21,'change_socialaccount'),(83,'Can delete social account',21,'delete_socialaccount'),(84,'Can view social account',21,'view_socialaccount'),(85,'Can add social application',22,'add_socialapp'),(86,'Can change social application',22,'change_socialapp'),(87,'Can delete social application',22,'delete_socialapp'),(88,'Can view social application',22,'view_socialapp'),(89,'Can add social application token',23,'add_socialtoken'),(90,'Can change social application token',23,'change_socialtoken'),(91,'Can delete social application token',23,'delete_socialtoken'),(92,'Can view social application token',23,'view_socialtoken'),(93,'Can add user email preference',9,'add_useremailpreference'),(94,'Can change user email preference',9,'change_useremailpreference'),(95,'Can delete user email preference',9,'delete_useremailpreference'),(96,'Can view user email preference',9,'view_useremailpreference');
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
INSERT INTO `authtoken_token` VALUES ('0f397a19bc05ba9f58be35a23a93b92028f98571','2019-08-21 00:47:38.315121',7),('2a56054d34a4f853b5417a81e7eb347002ba67d1','2019-08-21 00:47:41.785021',8),('47cd9a21c6d6dc84c625d974f501c29e136d0c91','2019-08-21 00:47:45.136669',9),('517b6d7ce9ae67208af70bfd4ed7e03ec7b15ef2','2019-08-21 00:46:09.960430',4),('5a73a46df6d06e83cd4a2d99c19ebd050a6c206e','2019-08-21 00:46:01.994115',2),('673f8335fa9e3493e06ff67752d7eda1b278c3e6','2019-08-21 00:47:30.754264',5),('7b1dfb5086780483d8d2c05fe01e2be8a85a8e7b','2019-08-21 00:46:06.531518',3),('c614934c2c5a784e4a6bbbc6eb18eabb0f697226','2019-08-21 00:47:52.467332',11),('d92f7d927f52c57c9e248b18ea69787051a9fcdc','2019-08-21 00:47:34.986200',6),('e1bfccf2a369c801e99aa26ce3b654e353ed7849','2019-08-21 00:47:48.964952',10);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (2,'2019-08-21 00:51:09.075770','1','barronfran@gmail.com (Barron DuBois (barronfran@gmail.com))',2,'[{\"changed\": {\"fields\": [\"verified\"]}}]',19,12),(3,'2019-08-21 00:51:12.332683','2','dubois.barron@gmail.com (Barron DuBois II (dubois.barron@gmail.com))',2,'[{\"changed\": {\"fields\": [\"verified\"]}}]',19,12),(4,'2019-08-21 00:51:14.621893','3','william.oliver.wang@gmail.com (William Wang (william.oliver.wang@gmail.com))',2,'[{\"changed\": {\"fields\": [\"verified\"]}}]',19,12),(5,'2019-08-21 00:51:16.648332','4','test4@gmail.com (John Johnson (test4@gmail.com))',2,'[{\"changed\": {\"fields\": [\"verified\"]}}]',19,12),(6,'2019-08-21 00:51:18.703846','5','test5@gmail.com (Andy Johnson (test5@gmail.com))',2,'[{\"changed\": {\"fields\": [\"verified\"]}}]',19,12),(7,'2019-08-21 00:51:22.020818','6','test6@gmail.com (Lauren Jones (test6@gmail.com))',2,'[{\"changed\": {\"fields\": [\"verified\"]}}]',19,12),(8,'2019-08-21 00:51:25.530023','7','test7@gmail.com (John Jones (test7@gmail.com))',2,'[{\"changed\": {\"fields\": [\"verified\"]}}]',19,12),(9,'2019-08-21 00:51:28.033302','8','test8@gmail.com (Samantha Jones (test8@gmail.com))',2,'[{\"changed\": {\"fields\": [\"verified\"]}}]',19,12),(10,'2019-08-21 00:51:30.808713','9','test9@gmail.com (John Johnson (test9@gmail.com))',2,'[{\"changed\": {\"fields\": [\"verified\"]}}]',19,12),(11,'2019-08-21 00:51:33.482096','10','test10@gmail.com (John Jones (test10@gmail.com))',2,'[{\"changed\": {\"fields\": [\"verified\"]}}]',19,12),(12,'2019-08-21 00:54:17.867925','1','example.com',2,'[{\"changed\": {\"fields\": [\"name\"]}}]',6,12),(13,'2019-08-21 07:47:05.379484','3','william.oliver.wang@gmail.com (William Wang (wow7+test@cornell.edu))',2,'[{\"changed\": {\"fields\": [\"email\", \"verified\"]}}]',19,12),(14,'2019-08-21 07:47:52.429449','4','William Wang (william.oliver.wang@gmail.com)',2,'[{\"changed\": {\"fields\": [\"email\"]}}]',7,12);
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (19,'account','emailaddress'),(20,'account','emailconfirmation'),(1,'admin','logentry'),(17,'api','agerangeproject'),(16,'api','agerangeuser'),(15,'api','collaborator'),(14,'api','deliverymodeproject'),(13,'api','deliverymodeuser'),(12,'api','file'),(8,'api','project'),(7,'api','puser'),(11,'api','researchinterestuser'),(10,'api','topicsproject'),(9,'api','useremailpreference'),(3,'auth','group'),(2,'auth','permission'),(18,'authtoken','token'),(4,'contenttypes','contenttype'),(5,'sessions','session'),(6,'sites','site'),(21,'socialaccount','socialaccount'),(22,'socialaccount','socialapp'),(23,'socialaccount','socialtoken');
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2019-08-21 00:44:33.979722'),(2,'contenttypes','0002_remove_content_type_name','2019-08-21 00:44:34.174723'),(3,'auth','0001_initial','2019-08-21 00:44:34.332302'),(4,'auth','0002_alter_permission_name_max_length','2019-08-21 00:44:34.894797'),(5,'auth','0003_alter_user_email_max_length','2019-08-21 00:44:34.903774'),(6,'auth','0004_alter_user_username_opts','2019-08-21 00:44:34.914779'),(7,'auth','0005_alter_user_last_login_null','2019-08-21 00:44:34.926714'),(8,'auth','0006_require_contenttypes_0002','2019-08-21 00:44:34.931701'),(9,'auth','0007_alter_validators_add_error_messages','2019-08-21 00:44:34.942669'),(10,'auth','0008_alter_user_username_max_length','2019-08-21 00:44:34.953641'),(11,'auth','0009_alter_user_last_name_max_length','2019-08-21 00:44:34.963645'),(12,'auth','0010_alter_group_name_max_length','2019-08-21 00:44:34.986580'),(13,'auth','0011_update_proxy_permissions','2019-08-21 00:44:34.996561'),(14,'api','0001_initial','2019-08-21 00:44:35.797903'),(15,'account','0001_initial','2019-08-21 00:44:37.896113'),(16,'account','0002_email_max_length','2019-08-21 00:44:38.217254'),(17,'admin','0001_initial','2019-08-21 00:44:38.280086'),(18,'admin','0002_logentry_remove_auto_add','2019-08-21 00:44:38.576294'),(19,'admin','0003_logentry_add_action_flag_choices','2019-08-21 00:44:38.608209'),(20,'authtoken','0001_initial','2019-08-21 00:44:38.687999'),(21,'authtoken','0002_auto_20160226_1747','2019-08-21 00:44:39.176690'),(22,'sessions','0001_initial','2019-08-21 00:44:39.223564'),(23,'sites','0001_initial','2019-08-21 00:44:39.288390'),(24,'sites','0002_alter_domain_unique','2019-08-21 00:44:39.319309'),(25,'socialaccount','0001_initial','2019-08-21 00:44:39.644972'),(26,'socialaccount','0002_token_max_lengths','2019-08-21 00:44:40.360545'),(27,'socialaccount','0003_extra_data_default_dict','2019-08-21 00:44:40.374509'),(28,'api','0002_auto_20190820_2252','2019-08-21 02:52:10.945475');
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
INSERT INTO `django_session` VALUES ('114xopk44mx2pmqca1cd7xmpp7ajttzq','MmQ3NjUwZmNjMWY2ZDg3OTc0OTM3ZTBkMzU3NGNlZGFhNWMzNWI4YTp7Il9hdXRoX3VzZXJfaWQiOiI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIyOGQyZDAxMjgxYmNjZWVmZTFjN2M0MWJjNDlmOGJkOGRmOGJjYWY5In0=','2019-09-04 00:58:02.511653'),('1dqout9b2b7cnrt0if861l7brim60vpc','MmQ3NjUwZmNjMWY2ZDg3OTc0OTM3ZTBkMzU3NGNlZGFhNWMzNWI4YTp7Il9hdXRoX3VzZXJfaWQiOiI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIyOGQyZDAxMjgxYmNjZWVmZTFjN2M0MWJjNDlmOGJkOGRmOGJjYWY5In0=','2019-09-04 07:48:17.663874'),('1ok7pbx4i92vafcuvvewlx7i5jk7800m','MTE3MmEwOGM2OTUyMTNkZjM3YjZhZGM0MjNiNjgyNTgyZGQ0MWI1ZTp7Il9hdXRoX3VzZXJfaWQiOiI1IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4NjcxODJkMGMyMWQyMjVmMzYxOGVlNThhMDAzNWIyZTVmMWQ1NzQ2In0=','2019-09-04 05:09:04.262779'),('3fqywr0j9r27zw33ugf4xyd55agoxbnv','MTE3MmEwOGM2OTUyMTNkZjM3YjZhZGM0MjNiNjgyNTgyZGQ0MWI1ZTp7Il9hdXRoX3VzZXJfaWQiOiI1IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4NjcxODJkMGMyMWQyMjVmMzYxOGVlNThhMDAzNWIyZTVmMWQ1NzQ2In0=','2019-09-04 03:54:49.696895'),('4vhd3nvc4nw8tqy1fe5fwo8imh03eoau','YjlhNjBkMDcwZWVkZjc5NTM1NjM1YjgwNGUxMzhmYmQzM2EyZjg3YTp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6IjYifQ==','2019-09-04 00:47:36.028712'),('54o09i5fm3oqzh7dmq5aovwzxuy6xhg1','MTE3MmEwOGM2OTUyMTNkZjM3YjZhZGM0MjNiNjgyNTgyZGQ0MWI1ZTp7Il9hdXRoX3VzZXJfaWQiOiI1IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4NjcxODJkMGMyMWQyMjVmMzYxOGVlNThhMDAzNWIyZTVmMWQ1NzQ2In0=','2019-09-04 01:00:49.102573'),('7o2k3btjncg5pakquskmebw1lgefkw9i','OWYyNDM4NDNmMTk5MTBiMzRlYWMzZjBiZTQyNDQyM2YzYmQyNzUwYTp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6IjkifQ==','2019-09-04 00:47:46.361963'),('a51v5w6blvgqo8rp3nxfx2h3qukrlwkw','MTE3MmEwOGM2OTUyMTNkZjM3YjZhZGM0MjNiNjgyNTgyZGQ0MWI1ZTp7Il9hdXRoX3VzZXJfaWQiOiI1IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4NjcxODJkMGMyMWQyMjVmMzYxOGVlNThhMDAzNWIyZTVmMWQ1NzQ2In0=','2019-09-04 00:51:48.980388'),('d4uqaqz524wc3950vhl5ye2wyh69k0hr','MzFmNjc4NjRlNzQxMmY4NzVmZjU2N2NlZWJhMmQ1Yjg3NzhkM2VhOTp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4MDNiZDMwMDNmNTliYjIxMTIyMTQ2NmJjYzViYTA1NmMyZjNiMTA5In0=','2019-09-04 00:51:43.956687'),('dagmhbwo1azukbnld2fh8seh10yhhvsl','Mzg2NWQ3Y2MxMzVjNzA4MjM2ZTEyNDkzMjI5OTJmNDhhNjRmYjFhZDp7Il9hdXRoX3VzZXJfaWQiOiI3IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIwOGYyYmUwNzQ2Mjc4NjllNjU1MzZkZTdlZjVjMjAyMjhlOWRiMDQwIn0=','2019-09-04 00:51:53.570098'),('djiygdaeihl5mlv6c3ggsb9xahrmidot','MmQ3NjUwZmNjMWY2ZDg3OTc0OTM3ZTBkMzU3NGNlZGFhNWMzNWI4YTp7Il9hdXRoX3VzZXJfaWQiOiI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIyOGQyZDAxMjgxYmNjZWVmZTFjN2M0MWJjNDlmOGJkOGRmOGJjYWY5In0=','2019-09-04 06:00:05.801272'),('dsedsxvkncro18u8jt75pg3vsb9can4p','MmQ3NjUwZmNjMWY2ZDg3OTc0OTM3ZTBkMzU3NGNlZGFhNWMzNWI4YTp7Il9hdXRoX3VzZXJfaWQiOiI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIyOGQyZDAxMjgxYmNjZWVmZTFjN2M0MWJjNDlmOGJkOGRmOGJjYWY5In0=','2019-09-04 06:54:17.720720'),('e45id99fnkbveurxaj1y33yl0eotfqoc','MzJlMjVkYTdmYmQxYjY1ODEyYmJhYzZlYmNjYTNjMWQyY2NlMTUzODp7Il9hdXRoX3VzZXJfaWQiOiI2IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4OTcyZTM0YTZkYTg0OTJkNjY4N2QyYTA4ZDUyZDFlY2I5NzE3YjFlIn0=','2019-09-04 01:01:15.887230'),('eazkgi648kbq6jz9c0ab03mzn4texx9t','NmExMWRlODk4MDY5NDU5M2VmZjRhMGVkOWFlZmI5YjFmNmE1ZDI2ZTp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6ImIifQ==','2019-09-04 00:47:53.468636'),('exrhyxgmrxbyaoj91bv0l4pth014x12j','ZTMzNDI0YmE3M2JkZjhjMDc0MTNjNzVkNzY1MTk2OTI4ZjY4ZmIwNTp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6IjMifQ==','2019-09-04 00:46:07.622127'),('fqu561dgv3l5b34s85ox9mqlfwov7l9q','Mzg2NWQ3Y2MxMzVjNzA4MjM2ZTEyNDkzMjI5OTJmNDhhNjRmYjFhZDp7Il9hdXRoX3VzZXJfaWQiOiI3IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIwOGYyYmUwNzQ2Mjc4NjllNjU1MzZkZTdlZjVjMjAyMjhlOWRiMDQwIn0=','2019-09-04 03:55:31.164766'),('hd894n4mdz8zneb259w72hfvnb30dm32','Y2Y5MzFlMjVlMjBmZjg5OWEzNDhmNDc2OWNhN2NlMTQ3ZjZiMmIyMTp7Il9hdXRoX3VzZXJfaWQiOiI5IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJmZDcyZjRjZWVjZDUzNGM4MzY2MDAyZmMxYWE0ZjU0ZjUwNjA1ZmYxIn0=','2019-09-04 00:51:58.226550'),('htcysliqpw7wyyaghmqqs0gyq3v0vh0t','MzJlMjVkYTdmYmQxYjY1ODEyYmJhYzZlYmNjYTNjMWQyY2NlMTUzODp7Il9hdXRoX3VzZXJfaWQiOiI2IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4OTcyZTM0YTZkYTg0OTJkNjY4N2QyYTA4ZDUyZDFlY2I5NzE3YjFlIn0=','2019-09-04 02:58:05.410146'),('iyx5kpjjzobeqetzted61tnduyhfzimn','OTQ4YzkzMjBmNDc3NzllNTcwNDkxYTJlN2I4YjZjODk5NzFhZWNlYTp7Il9hdXRoX3VzZXJfaWQiOiIxMiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiYmU1NzNkZmI4OGRkMGVkODNhYjczZGQ5NWQzMjkwZGU4Yjk5NmU2MSJ9','2019-09-04 00:49:59.773810'),('jb49hmplt1zpb36fmlv76y89hrayluf0','MGM5NDY1NmFjYzIyOTQ4MTI5M2RlNDBkYzc1OWM3MDZiYmM1Y2U1Njp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4NTQxY2M5NzY3OTdlMjgyZTQxZjk4NDYwYzM1MmE3NjM2ZWVjNjBlIn0=','2019-09-04 00:53:36.491583'),('jn9cc0t0m04ei3mdrlaswmyq145l8brv','MWNlNTFiYzkzZmI5ZjZjNmE4YjhiNzljYjkyYmQ5Mzc1MTE1MGQ0OTp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6IjcifQ==','2019-09-04 00:47:39.417298'),('jrcqlus30qy2tfq16ngmjv60d8g98kiq','OWU4ZGNkMWQ3OWVhMTVkMTE0NmNlN2Y5YTYwNTA3NjkxMWY2ZDhhZDp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6IjUifQ==','2019-09-04 00:47:32.683736'),('k91w2soaflgfx6kd7iqhjjcknmijviu6','MmQ3NjUwZmNjMWY2ZDg3OTc0OTM3ZTBkMzU3NGNlZGFhNWMzNWI4YTp7Il9hdXRoX3VzZXJfaWQiOiI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIyOGQyZDAxMjgxYmNjZWVmZTFjN2M0MWJjNDlmOGJkOGRmOGJjYWY5In0=','2019-09-04 00:51:46.571015'),('l6ctj2esm4jizyovgj3ww0dvp51jemzl','YTQ1NTRkY2M1NTNjMTBjM2I4MTFlMDQyNDdkNjY2YTU4NjFhYzMwZDp7Il9hdXRoX3VzZXJfaWQiOiIxMSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiNjAxYTU0ZWY3NDRiZTExOTNhYzNkZmRkYTVmZjdlMWQ1ZTA5OTdkYSJ9','2019-09-04 00:52:03.206361'),('m8d70kn7br936lkvbcs6shbeur7ucbqe','MzJlMjVkYTdmYmQxYjY1ODEyYmJhYzZlYmNjYTNjMWQyY2NlMTUzODp7Il9hdXRoX3VzZXJfaWQiOiI2IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4OTcyZTM0YTZkYTg0OTJkNjY4N2QyYTA4ZDUyZDFlY2I5NzE3YjFlIn0=','2019-09-04 00:51:51.279000'),('mw5eu46ky10wqg9jgxmcnc6bup7g6zwq','MjY2NDJhMDAwZDY4MmYzZWUxMmU3N2JmN2NhNzI1NWEwMTViZTdlYjp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6IjgifQ==','2019-09-04 00:47:42.828577'),('oas4bib9xr9yg7yyju6hodnyxncuumhm','MGM5NDY1NmFjYzIyOTQ4MTI5M2RlNDBkYzc1OWM3MDZiYmM1Y2U1Njp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4NTQxY2M5NzY3OTdlMjgyZTQxZjk4NDYwYzM1MmE3NjM2ZWVjNjBlIn0=','2019-09-04 00:51:41.248388'),('ow7lpfndz8dc4xt9xa2z0p53s7wp7sah','MmQ3NjUwZmNjMWY2ZDg3OTc0OTM3ZTBkMzU3NGNlZGFhNWMzNWI4YTp7Il9hdXRoX3VzZXJfaWQiOiI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIyOGQyZDAxMjgxYmNjZWVmZTFjN2M0MWJjNDlmOGJkOGRmOGJjYWY5In0=','2019-09-04 06:06:50.933747'),('q2slxqem4q6591qws0y6oh676hdf939v','MzJlMjVkYTdmYmQxYjY1ODEyYmJhYzZlYmNjYTNjMWQyY2NlMTUzODp7Il9hdXRoX3VzZXJfaWQiOiI2IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4OTcyZTM0YTZkYTg0OTJkNjY4N2QyYTA4ZDUyZDFlY2I5NzE3YjFlIn0=','2019-09-04 03:55:17.316093'),('r8geczx26gskx7w21pi7ayhzayi8wwhd','MmQ3NjUwZmNjMWY2ZDg3OTc0OTM3ZTBkMzU3NGNlZGFhNWMzNWI4YTp7Il9hdXRoX3VzZXJfaWQiOiI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIyOGQyZDAxMjgxYmNjZWVmZTFjN2M0MWJjNDlmOGJkOGRmOGJjYWY5In0=','2019-09-04 02:58:30.672288'),('suf3zwryefqj0hp5yclpkkilikf76gqo','Mzg2NWQ3Y2MxMzVjNzA4MjM2ZTEyNDkzMjI5OTJmNDhhNjRmYjFhZDp7Il9hdXRoX3VzZXJfaWQiOiI3IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIwOGYyYmUwNzQ2Mjc4NjllNjU1MzZkZTdlZjVjMjAyMjhlOWRiMDQwIn0=','2019-09-04 01:02:00.627918'),('uhqie29che6sd16zxspbxe1m1k8d8hic','ZjVhMDFhZWE2MjAzMGFkZDdiOTc5ZDhmZGJlMjc4ZWVkYTQ5MDIyZDp7Il9hdXRoX3VzZXJfaWQiOiIxMCIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiYjM5MmY2NjRmMzQ0Y2EzMDA2YzFhYzJhYzdhNDQ3OGUwZDhlMTY1MSJ9','2019-09-04 00:52:00.828985'),('v8cz598k6psfkt6dq2vb3e7mj360hab4','MzFkOGE4ZGI1NjZmZGU1YWJmNmZkZmY0MGQ2NWRkOGI2NWM0MGM3Yjp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6ImEifQ==','2019-09-04 00:47:50.096714'),('yawutwfcruc5qz735w1ps8t68z96j67y','NzYyM2E1MmMxM2Q5ZjBkYzc5MGJjY2VmNGU4ZTExNTg2MjMxMjc1OTp7Il9hdXRoX3VzZXJfaWQiOiI4IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4ZGYyY2YzNzdkODc3N2NiZTg1NGVjZjY1MTgxODMzODFiY2Y3OTE3In0=','2019-09-04 00:51:55.924780'),('yd3l5pasblysx5iecij6t5k8l4s2xtmh','MmQ3NjUwZmNjMWY2ZDg3OTc0OTM3ZTBkMzU3NGNlZGFhNWMzNWI4YTp7Il9hdXRoX3VzZXJfaWQiOiI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIyOGQyZDAxMjgxYmNjZWVmZTFjN2M0MWJjNDlmOGJkOGRmOGJjYWY5In0=','2019-09-04 06:02:02.851425'),('zn40dw9wgf8yeu7z4kizxk4lloyl9woh','ZGYxMzdlN2Q3OTkxNjRmNjA3NDg3NDA1ZDg1Zjg3ZWE4NTc1ZWVlYzp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsImFjY291bnRfdXNlciI6IjIifQ==','2019-09-04 00:46:04.243406');
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
INSERT INTO `django_site` VALUES (1,'example.com','PRYDE Connect');
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

-- Dump completed on 2019-08-21  4:02:48
