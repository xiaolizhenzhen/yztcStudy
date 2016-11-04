<?php
error_reporting(E_ERROR);
header("Content-type:text/html;charset=utf-8");
date_default_timezone_set('PRC');
$conn = mysqli_connect('localhost:3306', 'root', '', "shop");
mysqli_set_charset($conn, "utf8");
// mysqli_query("set names utf8");
// mysqli_select_db("shop");
// $file = "file.txt";
// function _log($str) {
// 	global $file;
// 	file_put_contents($file, $str . "\r\n", FILE_APPEND);
// }
?>
