-- MySQL dump 10.13  Distrib 8.0.37, for Win64 (x86_64)
--
-- Host: localhost    Database: develop
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('0a7f3098-70ac-4507-b3a8-fda1b656e96d','b15ee1701042242c7cc64cec11a08261286583f8208052131c7e2e7e12e13e1e','2024-08-26 05:10:04.143','20240813052959_fix_relationships',NULL,NULL,'2024-08-26 05:10:01.904',1),('1d5b42ac-a496-4914-a2bf-6dacb87e7e5f','9083568b95bf6ceae912d70902711c76e6925fe57b6328fb7e9f4add36df7300','2024-08-26 05:10:08.441','20240826045200_modify',NULL,NULL,'2024-08-26 05:10:04.709',1),('36cc2088-491b-4b73-9113-7152c5e14ec7','d16c461948ca06c46337f8ffe4e7b21522b41ba25535cd2175cb971f4658cc18','2024-08-26 05:09:59.074','20240808085605_remove_performance_model',NULL,NULL,'2024-08-26 05:09:57.829',1),('4f4a7e71-e5f7-4ec2-95e7-33f63b8a913b','cea46de0ebe42bb93fed1167ae005e2fa7a3a94aa0e52e1eb5032f44794ef863','2024-08-26 05:10:04.698','20240817065138_updated_schema',NULL,NULL,'2024-08-26 05:10:04.151',1),('530818a3-c794-4bdd-aa7f-efb72af4f6e4','b0acba8a8804e2da5abffcf4e9de88914beccac14a3afd279cce0d4ea232b392','2024-08-26 05:09:57.823','20240805061901_init',NULL,NULL,'2024-08-26 05:09:57.693',1),('a08249c9-e806-4c4a-9941-62ab09aae24b','fe55adb94aa447723c811b51ebe52337fe06b1d7c89387a50f50d5963e673369','2024-08-26 05:10:01.897','20240812051038_rename_memberinfo_to_member',NULL,NULL,'2024-08-26 05:10:01.213',1),('a73c1756-8814-4fa5-8d0d-081749da6680','122d743a0403e77ad7e0ed9447f5b8826f2fbdbc55612d936eff004dd13c2eec','2024-08-26 05:11:06.917','20240826051042_remodeling26',NULL,NULL,'2024-08-26 05:11:06.897',1),('d71eced2-a21c-46fb-a645-107650f16a32','08b8c7f8c1dd95140619d495ec1e7880623280cdebdfa1eb949a4c62e3e6928f','2024-08-26 05:10:01.206','20240812033422_add_tables',NULL,NULL,'2024-08-26 05:09:59.080',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `commentId` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `likeCount` int NOT NULL DEFAULT '0',
  `warningCount` int NOT NULL DEFAULT '0',
  `replyCount` int NOT NULL DEFAULT '0',
  `postId` bigint NOT NULL,
  `memberId` bigint NOT NULL,
  `parentId` bigint DEFAULT NULL,
  PRIMARY KEY (`commentId`),
  KEY `comment_postId_fkey` (`postId`),
  KEY `comment_memberId_fkey` (`memberId`),
  KEY `comment_parentId_fkey` (`parentId`),
  CONSTRAINT `comment_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `comment_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `comment` (`commentId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post` (`postId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `memberId` bigint NOT NULL AUTO_INCREMENT,
  `refreshToken` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`memberId`),
  UNIQUE KEY `member_username_key` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `musical`
--

DROP TABLE IF EXISTS `musical`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `musical` (
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `averageRating` double NOT NULL DEFAULT '0',
  `endDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `musicalId` bigint NOT NULL AUTO_INCREMENT,
  `startDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`musicalId`)
) ENGINE=InnoDB AUTO_INCREMENT=241416 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musical`
--

LOCK TABLES `musical` WRITE;
/*!40000 ALTER TABLE `musical` DISABLE KEYS */;
INSERT INTO `musical` VALUES ('네드 켈렌버거 바이올린 리사이틀','공연완료',0,'2024-01-20 15:00:00.000',233763,'2024-01-20 15:00:00.000'),('JUNIEL CONCERT: Juniary','공연완료',0,'2024-01-19 15:00:00.000',233767,'2024-01-19 15:00:00.000'),('한일신년음악회, 한일전통음악의 흥과 멋','공연완료',0,'2024-01-15 15:00:00.000',233773,'2024-01-15 15:00:00.000'),('서울대음대 뮤지션들이 연주하는 지브리OST콘서트 (1. 27~2.17)','공연완료',0,'2024-02-16 15:00:00.000',233775,'2024-01-26 15:00:00.000'),('유지영 귀국 피아노 리사이틀 [대구]','공연완료',0,'2024-01-12 15:00:00.000',233777,'2024-01-12 15:00:00.000'),('꽃감이 콘서트: Twenty','공연완료',0,'2024-01-26 15:00:00.000',233784,'2024-01-26 15:00:00.000'),('LIVECONNECT STAGE with 루이드(Llwyd): Over The Winter','공연완료',0,'2024-01-26 15:00:00.000',233787,'2024-01-26 15:00:00.000'),('그대와 영원히 [울산]','공연완료',0,'2024-02-07 15:00:00.000',233796,'2024-01-29 15:00:00.000'),('바리톤 최윤성 독창회','공연완료',0,'2024-01-25 15:00:00.000',233803,'2024-01-25 15:00:00.000'),('월간 실내악 이화 아카데미 앙상블 2차 (1월)','공연완료',0,'2024-01-27 15:00:00.000',233806,'2024-01-27 15:00:00.000'),('제312회 부천필하모닉오케스트라 정기연주회: 신년음악회, 신세계로부터','공연완료',0,'2024-01-18 15:00:00.000',233807,'2024-01-18 15:00:00.000'),('비브라포니스트 윤현상 콘서트, 時: 시간','공연완료',0,'2024-01-26 15:00:00.000',233811,'2024-01-26 15:00:00.000'),('디즈니 100주년 섀도우 콘서트','공연중',0,'2024-09-28 15:00:00.000',233812,'2024-01-11 15:00:00.000'),('러브라인','공연완료',0,'2024-01-27 15:00:00.000',233816,'2024-01-26 15:00:00.000'),('마당극을 품은 오페라2 [충주(앵콜)]','공연완료',0,'2024-01-26 15:00:00.000',233821,'2024-01-26 15:00:00.000'),('신년음악회, 새해 희망의 선물 [순천]','공연완료',0,'2024-01-26 15:00:00.000',233823,'2024-01-26 15:00:00.000'),('미래세대와 함께하는 환경음악회: 왈츠','공연완료',0,'2024-01-26 15:00:00.000',233834,'2024-01-26 15:00:00.000'),('수상한스테이지 (1.19)','공연완료',0,'2024-01-18 15:00:00.000',233837,'2024-01-18 15:00:00.000'),('이지형의 신년콘서트, 신년의 밤','공연완료',0,'2024-01-26 15:00:00.000',233845,'2024-01-26 15:00:00.000'),('제3회 SC브라이트 협연 기획 시리즈, Wish You All The Best with SC Bright Orchestra','공연완료',0,'2024-01-17 15:00:00.000',233847,'2024-01-17 15:00:00.000'),('최호경 피아노 독주회','공연완료',0,'2024-01-27 15:00:00.000',233851,'2024-01-27 15:00:00.000'),('플로비아노 창단연주회','공연완료',0,'2024-01-15 15:00:00.000',233852,'2024-01-15 15:00:00.000'),('강원특별자치도립국악관현악단, 신년음악회','공연완료',0,'2024-01-29 15:00:00.000',233860,'2024-01-29 15:00:00.000'),('너츠 [대학로]','공연완료',0,'2024-02-03 15:00:00.000',233861,'2024-01-18 15:00:00.000'),('제7회 고양울림청소년오케스트라 정기연주회','공연완료',0,'2024-01-27 15:00:00.000',233862,'2024-01-27 15:00:00.000'),('제104회 광명심포니오케스트라 정기연주회, 신년음악회: 나의 조국','공연완료',0,'2024-01-25 15:00:00.000',233865,'2024-01-25 15:00:00.000'),('김민정 피아노 독주회','공연완료',0,'2024-01-25 15:00:00.000',233869,'2024-01-25 15:00:00.000'),('버블매직쇼 [군산]','공연완료',0,'2024-01-26 15:00:00.000',233875,'2024-01-26 15:00:00.000'),('버블버블쇼 [서산]','공연완료',0,'2024-01-26 15:00:00.000',233876,'2024-01-26 15:00:00.000'),('쌀롱드무지끄, Mingle & Mangle','공연완료',0,'2024-01-17 15:00:00.000',233884,'2024-01-17 15:00:00.000'),('신년재즈음악회, 재즈런치','공연완료',0,'2024-01-19 15:00:00.000',233885,'2024-01-19 15:00:00.000'),('앙상블 더 클래식 정기연주회','공연완료',0,'2024-01-30 15:00:00.000',233894,'2024-01-30 15:00:00.000'),('얘들아 모여라!','공연완료',0,'2024-01-26 15:00:00.000',233896,'2024-01-26 15:00:00.000'),('이응광과 유럽의 별들, 유러피안 신년 음악회','공연완료',0,'2024-01-30 15:00:00.000',233897,'2024-01-30 15:00:00.000'),('청소년을 위한 음악과 클래식의 징검다리, 음악에 색을 입히다','공연완료',0,'2024-01-30 15:00:00.000',233899,'2024-01-30 15:00:00.000'),('정수민 쇼케이스, song about YOU','공연완료',0,'2024-01-26 15:00:00.000',233900,'2024-01-26 15:00:00.000'),('새해 복 많이 받으세용','공연완료',0,'2024-01-20 15:00:00.000',233909,'2024-01-20 15:00:00.000'),('마니죤 튜닝밴드 정기연주회','공연완료',0,'2024-01-19 15:00:00.000',233913,'2024-01-19 15:00:00.000'),('새해국악연: 청룡, 하늘을 날다','공연완료',0,'2024-01-24 15:00:00.000',233914,'2024-01-24 15:00:00.000'),('담빛마술쇼 겨울방학 특집 [담양]','공연완료',0,'2024-03-02 15:00:00.000',233934,'2024-01-15 15:00:00.000'),('제11회 실험무대702 정기공연, H','공연완료',0,'2024-02-03 15:00:00.000',233938,'2024-01-19 15:00:00.000'),('신년음악회, 뮤지컬 콘서트','공연완료',0,'2024-01-24 15:00:00.000',233945,'2024-01-24 15:00:00.000'),('금도끼 은도끼 [서울 금천]','공연완료',0,'2024-02-23 15:00:00.000',233946,'2024-01-17 15:00:00.000'),('벤자민 버튼의 시간은 거꾸로 간다','공연완료',0,'2024-01-27 15:00:00.000',233950,'2024-01-26 15:00:00.000'),('신년음악회, 숙명여자대학교 Piano Festival (1)','공연완료',0,'2024-01-21 15:00:00.000',233957,'2024-01-21 15:00:00.000'),('갈매기','공연완료',0,'2024-01-26 15:00:00.000',233964,'2024-01-25 15:00:00.000'),('WONDERLAND THEATRE','공연완료',0,'2024-01-27 15:00:00.000',233969,'2024-01-26 15:00:00.000'),('셰익스피어 리어왕 덧대어 쓰기, 와르르','공연완료',0,'2024-01-27 15:00:00.000',233971,'2024-01-24 15:00:00.000'),('유림식당 [대학로]','공연완료',0,'2024-02-03 15:00:00.000',233974,'2024-01-29 15:00:00.000'),('신년콘서트 [거창]','공연완료',0,'2024-01-26 15:00:00.000',233981,'2024-01-26 15:00:00.000'),('24K+(투포케이플러스) FAN CONCERT: TO FOR YOU','공연완료',0,'2024-01-27 15:00:00.000',233984,'2024-01-27 15:00:00.000'),('하우스콘서트 (1월)','공연완료',0,'2024-01-30 15:00:00.000',233987,'2024-01-30 15:00:00.000'),('LAB401, 기타리스트 천상혁','공연완료',0,'2024-01-25 15:00:00.000',233998,'2024-01-25 15:00:00.000'),('그 여자 사람잡네','공연완료',0,'2024-01-27 15:00:00.000',234006,'2024-01-18 15:00:00.000'),('앤서니 브라운의 우리가족 [서울]','공연완료',0,'2024-03-02 15:00:00.000',234024,'2024-01-14 15:00:00.000'),('ONLY STRINGS JAZZ','공연완료',0,'2024-01-25 15:00:00.000',234038,'2024-01-25 15:00:00.000'),('바냐의 시간','공연완료',0,'2024-01-20 15:00:00.000',234039,'2024-01-19 15:00:00.000'),('댄스콘서트 희노애락 시즌3','공연완료',0,'2024-01-27 15:00:00.000',234074,'2024-01-24 15:00:00.000'),('시황 단독 공연, 도화','공연완료',0,'2024-01-26 15:00:00.000',234101,'2024-01-26 15:00:00.000'),('김현경 플루트 독주회','공연완료',0,'2024-01-24 15:00:00.000',234103,'2024-01-24 15:00:00.000'),('신년음악회: Be One [대구]','공연완료',0,'2024-01-19 15:00:00.000',234104,'2024-01-19 15:00:00.000'),('신년음악회 [보령]','공연완료',0,'2024-01-29 15:00:00.000',234105,'2024-01-29 15:00:00.000'),('제3회 부산국제어린이청소년아트페어 개막식','공연완료',0,'2024-01-24 15:00:00.000',234107,'2024-01-24 15:00:00.000'),('세종후원회 신년음악회','공연완료',0,'2024-01-22 15:00:00.000',234108,'2024-01-22 15:00:00.000'),('생각의 여름 음반 발매 기념 공연, 시냇가','공연완료',0,'2024-01-27 15:00:00.000',234124,'2024-01-27 15:00:00.000'),('나의 특별한 여행기','공연완료',0,'2024-01-27 15:00:00.000',234147,'2024-01-26 15:00:00.000'),('오해','공연완료',0,'2024-02-02 15:00:00.000',234156,'2024-01-25 15:00:00.000'),('제9회 르씨엘발레아카데미 정기공연','공연완료',0,'2024-01-26 15:00:00.000',234167,'2024-01-26 15:00:00.000'),('MAN FROM EARTH','공연완료',0,'2024-02-03 15:00:00.000',234172,'2024-01-26 15:00:00.000'),('신년음악회: 비상, 그 시작과 끝 [충주]','공연완료',0,'2024-01-24 15:00:00.000',234180,'2024-01-24 15:00:00.000'),('제3회 트롬본 앙상블 세븐포지션 정기연주회 [대구]','공연완료',0,'2024-01-26 15:00:00.000',234182,'2024-01-26 15:00:00.000'),('파라다이스 타워 [대학로]','공연완료',0,'2024-01-27 15:00:00.000',234191,'2024-01-24 15:00:00.000'),('RAP HOUSE VOL.26','공연완료',0,'2024-01-25 15:00:00.000',234195,'2024-01-25 15:00:00.000'),('안산중앙신협 맞춤형 공연','공연완료',0,'2024-01-26 15:00:00.000',234213,'2024-01-26 15:00:00.000'),('백설공주 [광주]','공연완료',0,'2024-02-17 15:00:00.000',234215,'2024-01-19 15:00:00.000'),('코리안챔버오케스트라(KCO) 전국음악콩쿨 위너 콘서트 시리즈 1','공연완료',0,'2024-01-26 15:00:00.000',234259,'2024-01-26 15:00:00.000'),('코리안챔버오케스트라(KCO) 전국음악콩쿨 위너 콘서트 시리즈 2','공연완료',0,'2024-01-27 15:00:00.000',234260,'2024-01-27 15:00:00.000'),('길들여진 새','공연완료',0,'2024-01-27 15:00:00.000',234271,'2024-01-25 15:00:00.000'),('코리안챔버오케스트라(KCO) 신년음악회','공연완료',0,'2024-01-26 15:00:00.000',234273,'2024-01-26 15:00:00.000'),('날개 (앵콜)','공연완료',0,'2024-01-27 15:00:00.000',234274,'2024-01-22 15:00:00.000'),('신년음악회 [태안]','공연완료',0,'2024-01-29 15:00:00.000',234286,'2024-01-29 15:00:00.000'),('검은 옷의 수도사','공연완료',0,'2024-02-25 15:00:00.000',234322,'2024-01-28 15:00:00.000'),('제8회 한국뮤지컬어워즈, 뮤이어(MU:Year) 스테이지','공연완료',0,'2024-01-28 15:00:00.000',234332,'2024-01-28 15:00:00.000'),('제3회 SA청소년오케스트라 정기연주회','공연완료',0,'2024-01-26 15:00:00.000',234349,'2024-01-26 15:00:00.000'),('절대영도 [대학로]','공연완료',0,'2024-02-07 15:00:00.000',234360,'2024-01-29 15:00:00.000'),('콰르텟 숨 정기연주회','공연완료',0,'2024-01-29 15:00:00.000',234364,'2024-01-29 15:00:00.000'),('제3회 두드림페스티벌, Ch.두드림 다큐 & 드라마','공연완료',0,'2024-01-30 15:00:00.000',234369,'2024-01-28 15:00:00.000'),('위풍당당 콘서트','공연완료',0,'2024-01-22 15:00:00.000',234379,'2024-01-22 15:00:00.000'),('제27회 마티네 콘체르토 콘서트','공연완료',0,'2024-01-23 15:00:00.000',234431,'2024-01-23 15:00:00.000'),('The Luna 클래식 콘서트: 모두의 클래식','공연완료',0,'2024-01-25 15:00:00.000',234447,'2024-01-25 15:00:00.000'),('박혜온 대금 독주회 ⅩⅠ: 대금으로 듣는 한국의 민속음악','공연완료',0,'2024-01-29 15:00:00.000',234452,'2024-01-29 15:00:00.000'),('제1회 계성초등학교 오케스트라 정기연주회','공연완료',0,'2024-01-30 15:00:00.000',234486,'2024-01-30 15:00:00.000'),('한몽예술교류전 [남원]','공연완료',0,'2024-01-26 15:00:00.000',234502,'2024-01-26 15:00:00.000'),('리타','공연완료',0,'2024-01-30 15:00:00.000',234551,'2024-01-29 15:00:00.000'),('정글북 [광주]','공연완료',0,'2024-03-02 15:00:00.000',234616,'2024-01-30 15:00:00.000'),('제153회 두레콘서트, 라클라쎄 & 김정아 [고양]','공연완료',0,'2024-01-30 15:00:00.000',234626,'2024-01-30 15:00:00.000'),('재즈 LIVE IN, 송도국제도시: 맹서령 Quartet [인천]','공연완료',0,'2024-01-26 15:00:00.000',234639,'2024-01-26 15:00:00.000'),('사람, 사랑, 살아,','공연완료',0,'2024-02-03 15:00:00.000',234640,'2024-01-30 15:00:00.000'),('새해 히사이시조, 섀도우 콘서트','공연완료',0,'2024-02-28 15:00:00.000',234715,'2024-01-30 15:00:00.000'),('카르멘 튜즈데이','공연완료',0,'2024-06-24 15:00:00.000',241415,'2024-01-29 15:00:00.000');
/*!40000 ALTER TABLE `musical` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `musical_detail`
--

DROP TABLE IF EXISTS `musical_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `musical_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cast` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `runtime` int NOT NULL DEFAULT '0',
  `synopsis` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `genre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `showtimes` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `ageRating` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `facilityDetails` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `facilityName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `introImages` json NOT NULL,
  `musicalId` bigint NOT NULL,
  `posterImagePath` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `productionCompany` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `ticketPrice` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `musical_detail_musicalId_key` (`musicalId`),
  CONSTRAINT `musical_detail_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `musical` (`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musical_detail`
--

LOCK TABLES `musical_detail` WRITE;
/*!40000 ALTER TABLE `musical_detail` DISABLE KEYS */;
INSERT INTO `musical_detail` VALUES (1,'',0,'','서양음악(클래식)','','','','자양스테이션(파리뮤직포럼)','[]',241415,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF241415_240521_091803.jpeg','',''),(2,'',0,'','서양음악(클래식)','','','','알레스 아트(Alles-Art)','[]',234715,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234715_240130_120224.jpeg','',''),(3,'',0,'','연극','','','','대학로단막극장','[]',234640,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234640_240129_131441.gif','',''),(4,'',0,'','대중음악','','','','카페와안','[]',234639,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234639_240129_131406.JPG','',''),(5,'',0,'','서양음악(클래식)','','','','고양아람누리','[]',234626,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234626_240129_124428.jpg','',''),(6,'',0,'','뮤지컬','','','','레미어린이극장 [광주수완]','[]',234616,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234616_240129_122632.jpg','',''),(7,'',0,'','연극','','','','놀터예술공방','[]',234551,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234551_240126_113153.jpg','',''),(8,'',0,'','복합','','','','국립민속국악원','[]',234502,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234502_240125_145810.png','',''),(9,'',0,'','서양음악(클래식)','','','','대구콘서트하우스','[]',234486,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234486_240125_131654.jpg','',''),(10,'',0,'','한국음악(국악)','','','','국립국악원','[]',234452,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234452_240125_101608.jpg','',''),(11,'',0,'','서양음악(클래식)','','','','오후의 홍차','[]',234447,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234447_240125_100042.jpg','',''),(12,'',0,'','서양음악(클래식)','','','','롯데콘서트홀','[]',234431,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234431_240124_141217.jpg','',''),(13,'',0,'','서양음악(클래식)','','','','롯데콘서트홀','[]',234379,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234379_240124_102857.png','',''),(14,'',0,'','연극','','','','연우소극장','[]',234369,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234369_240124_094607.gif','',''),(15,'',0,'','서양음악(클래식)','','','','금호아트홀 연세','[]',234364,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234364_240123_121136.gif','',''),(16,'',0,'','연극','','','','동숭무대소극장','[]',234360,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234360_240123_112054.gif','',''),(17,'',0,'','복합','','','','성남아트센터','[]',234349,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234349_240123_104133.jpg','',''),(18,'',0,'','뮤지컬','','','','더 서울라이티움 (갤러리아포레)','[]',234332,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234332_240123_095140.gif','',''),(19,'',0,'','연극','','','','안똔체홉극장','[]',234322,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234322_240123_092843.gif','',''),(20,'',0,'','복합','','','','태안군문화예술회관','[]',234286,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234286_240122_112106.jpg','',''),(21,'',0,'','연극','','','','후암스테이지','[]',234274,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234274_240122_104412.gif','',''),(22,'',0,'','서양음악(클래식)','','','','예술의전당 [서울]','[]',234273,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234273_240122_103554.jpg','',''),(23,'',0,'','연극','','','','소극장 창덕궁','[]',234271,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234271_240122_102724.gif','',''),(24,'',0,'','서양음악(클래식)','','','','예술의전당 [서울]','[]',234260,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234260_240122_095619.gif','',''),(25,'',0,'','서양음악(클래식)','','','','예술의전당 [서울]','[]',234259,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234259_240122_095330.gif','',''),(26,'',0,'','뮤지컬','','','','롯데마트 [월드컵]','[]',234215,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234215_240119_123717.gif','',''),(27,'',0,'','무용','','','','안산문화예술의전당','[]',234213,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234213_240119_123148.png','',''),(28,'',0,'','대중음악','','','','플렉스라운지 (구. 스테이라운지, 구. 인디팍)','[]',234195,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234195_240119_114525.gif','',''),(29,'',0,'','연극','','','','소극장 무극','[]',234191,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234191_240119_112836.gif','',''),(30,'',0,'','서양음악(클래식)','','','','대구콘서트하우스','[]',234182,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234182_240119_110155.png','',''),(31,'',0,'','서양음악(클래식)','','','','충주시문화회관','[]',234180,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234180_240119_110246.jpg','',''),(32,'',0,'','연극','','','','창작플랫폼 경험과 상상','[]',234172,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234172_240119_104200.gif','',''),(33,'',0,'','무용','','','','대덕문화전당','[]',234167,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234167_240119_103157.jpg','',''),(34,'',0,'','연극','','','','창작플랫폼 경험과 상상','[]',234156,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234156_240119_101158.gif','',''),(35,'',0,'','연극','','','','창조소극장 (구. 민아트홀)','[]',234147,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234147_240119_095509.gif','',''),(36,'',0,'','대중음악','','','','벨로주 [망원]','[]',234124,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234124_240118_121456.jpg','',''),(37,'',0,'','서양음악(클래식)','','','','세종문화회관','[]',234108,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234108_240118_110550.JPG','',''),(38,'',0,'','복합','','','','(재)영화의전당','[]',234107,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234107_240118_105756.jpg','',''),(39,'',0,'','복합','','','','보령문화예술회관','[]',234105,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234105_240118_105201.JPG','',''),(40,'',0,'','서양음악(클래식)','','','','비원뮤직홀','[]',234104,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234104_240118_105057.jpg','',''),(41,'',0,'','서양음악(클래식)','','','','꿈의숲아트센터','[]',234103,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234103_240118_104921.png','',''),(42,'',0,'','대중음악','','','','클럽온에어','[]',234101,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234101_240118_104351.jpg','',''),(43,'',0,'','대중무용','','','','예스24 라이브홀 (구. 악스코리아)','[]',234074,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234074_240118_094454.jpg','',''),(44,'',0,'','연극','','','','극장 봄 (봄소극장)','[]',234039,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234039_240117_113526.gif','',''),(45,'',0,'','서양음악(클래식)','','','','에피소드 서초 393','[]',234038,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234038_240117_113019.jpg','',''),(46,'',0,'','뮤지컬','','','','윤당아트홀','[]',234024,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234024_240117_105000.gif','',''),(47,'',0,'','연극','','','','정심아트홀','[]',234006,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF234006_240117_095845.jpg','',''),(48,'',0,'','서양음악(클래식)','','','','뮤직앤아트스튜디오','[]',233998,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233998_240117_093814.png','',''),(49,'',0,'','서양음악(클래식)','','','','함안문화예술회관','[]',233987,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233987_240116_113611.jpg','',''),(50,'',0,'','대중음악','','','','H-스테이지','[]',233984,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233984_240116_112129.jpg','',''),(51,'',0,'','복합','','','','거창문화센터','[]',233981,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233981_240116_111325.jpg','',''),(52,'',0,'','연극','','','','드림시어터 [대학로]','[]',233974,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233974_240116_103520.gif','',''),(53,'',0,'','연극','','','','연극실험실 혜화동1번지','[]',233971,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233971_240116_102603.jpg','',''),(54,'',0,'','뮤지컬','','','','경희대학교 평화의전당','[]',233969,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233969_240116_102538.jpg','',''),(55,'',0,'','연극','','','','한바탕 소극장','[]',233964,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233964_240116_100939.gif','',''),(56,'',0,'','서양음악(클래식)','','','','영산아트홀','[]',233957,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233957_240116_095141.gif','',''),(57,'',0,'','연극','','','','M극장','[]',233950,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233950_240116_093352.png','',''),(58,'',0,'','뮤지컬','','','','레미어린이극장 [금천]','[]',233946,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233946_240116_091559.jpg','',''),(59,'',0,'','복합','','','','서귀포예술의전당','[]',233945,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233945_240115_150204.jpg','',''),(60,'',0,'','연극','','','','실험무대702','[]',233938,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233938_240115_140132.jpg','',''),(61,'',0,'','서커스/마술','','','','담빛 마술극장','[]',233934,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233934_240115_134625.png','',''),(62,'',0,'','복합','','','','국립국악원','[]',233914,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233914_240115_123638.jpg','',''),(63,'',0,'','서양음악(클래식)','','','','수성아트피아','[]',233913,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233913_240115_123611.jpg','',''),(64,'',0,'','대중음악','','','','후케즈','[]',233909,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233909_240115_121845.jpg','',''),(65,'',0,'','대중음악','','','','아이다호','[]',233900,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233900_240115_115203.jpg','',''),(66,'',0,'','복합','','','','국립국악원','[]',233899,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233899_240115_115144.gif','',''),(67,'',0,'','서양음악(클래식)','','','','예술의전당 [서울]','[]',233897,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233897_240115_114601.gif','',''),(68,'',0,'','서양음악(클래식)','','','','쌀롱드무지끄','[]',233896,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233896_240115_114244.jpg','',''),(69,'',0,'','서양음악(클래식)','','','','세종문화회관','[]',233894,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233894_240115_113754.gif','',''),(70,'',0,'','대중음악','','','','재즈런치','[]',233885,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233885_240115_110137.gif','',''),(71,'',0,'','서양음악(클래식)','','','','쌀롱드무지끄','[]',233884,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233884_240115_105940.jpg','',''),(72,'',0,'','서커스/마술','','','','서산문화원','[]',233876,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233876_240115_102920.gif','',''),(73,'',0,'','서커스/마술','','','','군산어린이공연장','[]',233875,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233875_240115_102415.gif','',''),(74,'',0,'','서양음악(클래식)','','','','금호아트홀 연세','[]',233869,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233869_240115_101215.gif','',''),(75,'',0,'','서양음악(클래식)','','','','광명시민회관','[]',233865,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233865_240115_100258.jpg','',''),(76,'',0,'','서양음악(클래식)','','','','고양아람누리','[]',233862,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233862_240115_095302.jpg','',''),(77,'',0,'','연극','','','','굿씨어터','[]',233861,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233861_240115_095240.gif','',''),(78,'',0,'','한국음악(국악)','','','','원주백운아트홀','[]',233860,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233860_240115_095024.jpg','',''),(79,'',0,'','서양음악(클래식)','','','','일신홀','[]',233852,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233852_240112_130842.gif','',''),(80,'',0,'','서양음악(클래식)','','','','금호아트홀 연세','[]',233851,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233851_240112_125638.gif','',''),(81,'',0,'','서양음악(클래식)','','','','롯데콘서트홀','[]',233847,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233847_240112_124521.jpg','',''),(82,'',0,'','대중음악','','','','디어라이프','[]',233845,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233845_240112_123559.jpeg','',''),(83,'',0,'','대중음악','','','','수상한창고','[]',233837,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233837_240112_121853.png','',''),(84,'',0,'','서양음악(클래식)','','','','롯데콘서트홀','[]',233834,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233834_240112_120025.jpg','',''),(85,'',0,'','서양음악(클래식)','','','','순천문화예술회관','[]',233823,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233823_240112_111006.png','',''),(86,'',0,'','서양음악(클래식)','','','','충주시문화회관','[]',233821,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233821_240112_110454.png','',''),(87,'',0,'','연극','','','','소극장 플랫폼74','[]',233816,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233816_240112_105141.jpg','',''),(88,'',0,'','서양음악(클래식)','','','','알레스 아트(Alles-Art)','[]',233812,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233812_240112_104327.png','',''),(89,'',0,'','서양음악(클래식)','','','','신불당아트센터','[]',233811,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233811_240112_104257.png','',''),(90,'',0,'','서양음악(클래식)','','','','부천아트센터','[]',233807,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233807_240112_103501.jpg','',''),(91,'',0,'','서양음악(클래식)','','','','갤러리 사이','[]',233806,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233806_240112_103225.gif','',''),(92,'',0,'','서양음악(클래식)','','','','IPAC홀(인터내셔널퍼포밍아트센터)','[]',233803,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233803_240112_102617.gif','',''),(93,'',0,'','뮤지컬','','','','아트홀 마당','[]',233796,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233796_240112_100332.gif','',''),(94,'',0,'','대중음악','','','','살롱 문보우','[]',233787,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233787_240112_094330.gif','',''),(95,'',0,'','대중음악','','','','로운아뜨리움(로운아트홀)','[]',233784,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233784_240112_093347.jpg','',''),(96,'',0,'','서양음악(클래식)','','','','대구콘서트하우스','[]',233777,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233777_240111_123046.png','',''),(97,'',0,'','서양음악(클래식)','','','','에스파스클래식','[]',233775,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233775_240124_101650.png','',''),(98,'',0,'','한국음악(국악)','','','','남산골한옥마을','[]',233773,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233773_240111_121613.png','',''),(99,'',0,'','대중음악','','','','일지아트홀','[]',233767,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233767_240111_115737.gif','',''),(100,'',0,'','서양음악(클래식)','','','','모차르트홀','[]',233763,'http://www.kopis.or.kr/upload/pfmPoster/PF_PF233763_240111_112342.gif','','');
/*!40000 ALTER TABLE `musical_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `views` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `likeCount` int NOT NULL DEFAULT '0',
  `memberId` bigint NOT NULL,
  `musicalId` bigint DEFAULT NULL,
  `postId` bigint NOT NULL AUTO_INCREMENT,
  `replyCount` int NOT NULL DEFAULT '0',
  `sample` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedAt` datetime(3) DEFAULT NULL,
  `warningCount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`postId`),
  KEY `post_musicalId_fkey` (`musicalId`),
  KEY `post_memberId_fkey` (`memberId`),
  CONSTRAINT `post_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `post_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `musical` (`musicalId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reply`
--

DROP TABLE IF EXISTS `reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reply` (
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `commentId` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `memberId` bigint NOT NULL,
  `postId` bigint NOT NULL,
  `replyId` bigint DEFAULT NULL,
  `updatedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`commentId`),
  KEY `reply_member_id_fkey` (`memberId`),
  KEY `reply_post_id_fkey` (`postId`),
  CONSTRAINT `reply_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `reply_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post` (`postId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reply`
--

LOCK TABLES `reply` WRITE;
/*!40000 ALTER TABLE `reply` DISABLE KEYS */;
/*!40000 ALTER TABLE `reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `rating` int NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `memberId` bigint NOT NULL,
  `musicalId` bigint NOT NULL,
  `reviewId` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`reviewId`),
  KEY `review_member_id_fkey` (`memberId`),
  KEY `review_musical_id_fkey` (`musicalId`),
  CONSTRAINT `review_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `review_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `musical` (`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_agency`
--

DROP TABLE IF EXISTS `ticket_agency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_agency` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `musicalDetailId` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ticket_agency_musical_detail_id_fkey` (`musicalDetailId`),
  CONSTRAINT `ticket_agency_musicalDetailId_fkey` FOREIGN KEY (`musicalDetailId`) REFERENCES `musical_detail` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_agency`
--

LOCK TABLES `ticket_agency` WRITE;
/*!40000 ALTER TABLE `ticket_agency` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_agency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `memberId` bigint NOT NULL,
  `musicalId` bigint NOT NULL,
  `wishlistId` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`wishlistId`),
  KEY `wishlist_member_id_fkey` (`memberId`),
  KEY `wishlist_musical_id_fkey` (`musicalId`),
  CONSTRAINT `wishlist_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `wishlist_musicalId_fkey` FOREIGN KEY (`musicalId`) REFERENCES `musical` (`musicalId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-12 15:39:58
