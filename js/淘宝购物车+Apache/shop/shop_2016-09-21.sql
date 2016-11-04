# ************************************************************
# Sequel Pro SQL dump
# Version 4135
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.42)
# Database: shop
# Generation Time: 2016-09-21 01:05:43 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table car
# ------------------------------------------------------------

DROP TABLE IF EXISTS `car`;

CREATE TABLE `car` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `itemid` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品ID',
  `name` varchar(200) DEFAULT NULL COMMENT '商品名称',
  `price` float(11,2) DEFAULT NULL COMMENT '商品价格',
  `saled` int(11) DEFAULT NULL COMMENT '已售数量',
  `better` int(11) DEFAULT NULL COMMENT '好评数',
  `bad` int(11) DEFAULT NULL COMMENT '差评数',
  `stock` int(11) DEFAULT NULL COMMENT '库存数量',
  `shopname` varchar(200) DEFAULT NULL COMMENT '店铺名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`id`, `name`, `price`, `saled`, `better`, `bad`, `stock`, `shopname`)
VALUES
	(1,'【苏宁直发】Apple/苹果 iPhone6s Plus 全网通4G智能手机',5499.00,3255,3200,200,999,'苏宁易购官方旗舰店'),
	(2,'【京东直发】Apple/苹果 iPhone6s Plus 全网通4G智能手机',5499.00,255,200,0,999,'苏宁易购官方旗舰店'),
	(3,'【天猫直发】Apple/苹果 iPhone6 Plus 电信通4G智能手机',4499.00,1255,1255,0,999,'苏宁易购官方旗舰店'),
	(4,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',1499.00,11,9,2,999,'京东官方旗舰店'),
	(5,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4599.00,567,560,7,999,'京东官方旗舰店'),
	(6,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4679.00,88943,3200,200,999,'京东官方旗舰店'),
	(7,'【京东直发】Apple/安卓 iPhone6 Plus 电信4G智能手机',490.00,213,3200,200,999,'京东官方旗舰店'),
	(8,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',1099.00,5432,3200,200,999,'京东官方旗舰店'),
	(9,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4422.00,544,3200,200,999,'京东官方旗舰店'),
	(10,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',3569.00,8765,3200,200,999,'京东官方旗舰店'),
	(11,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',8923.00,1,3200,200,999,'京东官方旗舰店'),
	(12,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',1029.00,23,3200,200,999,'京东官方旗舰店'),
	(13,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,96,3200,200,999,'京东官方旗舰店'),
	(14,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,30,3200,200,999,'京东官方旗舰店'),
	(15,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,329,3200,200,999,'京东官方旗舰店'),
	(16,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3155,3200,200,999,'京东官方旗舰店'),
	(17,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,34214,3200,200,999,'京东官方旗舰店'),
	(18,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3809,3200,200,999,'京东官方旗舰店'),
	(19,'【京东直发】Apple/桔子 iPhone6 Plus 移动3G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(20,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(21,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(22,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(23,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(24,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(25,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(26,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(27,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(28,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(29,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(30,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(31,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(32,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(33,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(34,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(35,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(36,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(37,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(38,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(39,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(40,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(41,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(42,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(43,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(44,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(45,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(46,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(47,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(48,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(49,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(50,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(51,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(52,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(53,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(54,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(55,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(56,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(57,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(58,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(59,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(60,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(61,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(62,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(63,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(64,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(65,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(66,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(67,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(68,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(69,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(70,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(71,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(72,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店'),
	(73,'【京东直发】Apple/苹果 iPhone6 Plus 电信4G智能手机',4499.00,3255,3200,200,999,'京东官方旗舰店');

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `username`, `password`)
VALUES
	(1,'admin','admin');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
