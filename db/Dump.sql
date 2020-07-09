-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: task-tracker
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` enum('View','In Progress','Done') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'Task 1','do this and this','View','2020-07-09 10:24:09','2020-07-09 10:24:09',1),(2,'Task 2','do this and that','In Progress','2020-07-09 10:24:20','2020-07-09 10:24:20',1),(3,'Task 3','do the whole project','Done','2020-07-09 10:24:47','2020-07-09 10:24:47',1),(4,'Task 4','wash the dishes','Done','2020-07-09 10:26:16','2020-07-09 10:26:16',9),(5,'Task 5','Create tasks to fill db','Done','2020-07-09 10:26:33','2020-07-09 10:26:33',9);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'aa','aa','aa@gmail.com','$2a$08$nhtm9DIx60j.w4JNiAxacO86KJ29xwPyHrogyhS4aKzhQOn0ny6eW','2020-07-09 10:21:55','2020-07-09 10:21:55'),(2,'bb','bb','bb@gmail.com','$2a$08$Uf5F2qkJ9YpC93hVtUuzWOMvbm/BNNKMCVEJp33H0YfGsDBJ7rOaS','2020-07-09 10:22:02','2020-07-09 10:22:02'),(3,'cc','cc','cc@gmail.com','$2a$08$qMoScDtdVRJv66FPOSres.Bz/mt.xzHig/Bw8On01rdsMGQT0Jcs2','2020-07-09 10:22:06','2020-07-09 10:22:06'),(4,'dd','dd','dd@gmail.com','$2a$08$Xli8cPvXvOQ6whS.XuGj0eQkgrJniZmaEsorgVkUXAAyngrnFBS/u','2020-07-09 10:23:07','2020-07-09 10:23:07'),(5,'ee','ee','ee@gmail.com','$2a$08$fGQD863f5/5sl3ni7N5PLuhAQRIBHCU8bnvteXU/b.o2reB/7Mbq6','2020-07-09 10:23:13','2020-07-09 10:23:13'),(6,'ff','ff','ff@gmail.com','$2a$08$cwrzcXMRthHYZCFO1rm/F.Q0sxHPwZlq0XmOln0IxgKCj2rdRuu4G','2020-07-09 10:23:16','2020-07-09 10:23:16'),(7,'gg','gg','gg@gmail.com','$2a$08$XSsl8HiLgarcDGCsFRkpq.qIkBz6uv02Q/piZhalpIYcp5GZb/G7e','2020-07-09 10:23:22','2020-07-09 10:23:22'),(8,'hh','hh','hh@gmail.com','$2a$08$taMlaD45Lb7tCXs9cLK9HelH8JqT3k2CiG.0sYtwAg/ZnNxUrI6G.','2020-07-09 10:23:26','2020-07-09 10:23:26'),(9,'ii','ii','ii@gmail.com','$2a$08$m.aqY8LwLe7QUI57qbIPZurUYxubfIk4fEnwYW2VlwhpE0FM41pvy','2020-07-09 10:23:31','2020-07-09 10:23:31'),(10,'jj','jj','jj@gmail.com','$2a$08$RR8NLa6bFyGhdQoJyxSKxuLTdYG3d0Id9l2apRsRLHqsPQS5hhJKm','2020-07-09 10:23:35','2020-07-09 10:23:35'),(11,'kk','kk','kk@gmail.com','$2a$08$WsiVEq40P8KEpUejg3VxD.Q22JJFQ0lDerKipi8UMgautl4v0gT72','2020-07-09 10:23:40','2020-07-09 10:23:40');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-09 13:37:53
