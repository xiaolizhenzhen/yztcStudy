<?php
error_reporting(E_ERROR);
header("Content-type:text/html;charset=utf-8");
// header("Access-Control-Allow-Origin:*");
class Users {
	function __construct() {
		$this->conn = mysqli_connect("localhost:3306", "root", "", "shop");
	}
	public function login($user, $password) {
		$sql = "select * from user where username='{$user}' and password='{$password}'";
		$result = mysqli_query($this->conn, $sql);
		$num = mysqli_num_rows($result);
		return $num;
	}
	public function reg($user, $password) {
		$sql = "insert into user (username,password) values ('{$user}','{$password}')";
		$result = mysqli_query($this->conn, $sql);
		// $id = mysqli_insert_id($result);
		return $result;
	}
}
$user = new Users();
$type = $_REQUEST['type'];
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
$obj->status = 0;
$obj->msg = "执行成功";
if ($type == "login") {
	$num = $user->login($username, $password);

	if ($num > 0) {
		$obj->msg = "登录成功";
	} else {
		$obj->status = 1;
		$obj->msg = "用户名或密码不正确";
	}
}
if ($type == "reg") {
	$num = $user->reg($username, $password);
	if ($num > 0) {
		$obj->msg = "注册成功";
	} else {
		$obj->status = 2;
		$obj->msg = "注册失败，请联系管理员";
	}
}
echo json_encode($obj);
?>
