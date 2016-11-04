<?php
include "common.php";
class Items {

	function __construct() {
		global $conn;
		$this->conn = $conn;
	}
	public function getAllItems($start = 1, $end = 10, $orderBy,$orderType, $searchKey) {
		$start = ($start - 1) * $end;
		$sql = "SELECT * FROM products where 1=1 ";
		$sql2 = "";
		if ($searchKey != "all") {
			$sql2 .= " AND name like '%{$searchKey}%'";
		}
		if ($orderBy != "all") {
			$sql2 .= " ORDER BY $orderBy";
			if($orderType!="all"){
				$sql2 .= " $orderType";
			}
		}
		$total = $this->getTotal($sql2);
		$sql .= $sql2 . " LIMIT {$start},{$end}";
		$result = mysqli_query($this->conn, $sql);
		$arr = array();
		while ($row = mysqli_fetch_assoc($result)) {
			array_push($arr, $row);
		}
		$obj = "";
		$obj->total = $total;
		$obj->data = $arr;
		return $obj;
	}
	private function getTotal($sql) {

		$s = "SELECT COUNT(*) AS count FROM products where 1=1";
		$s .= $sql;
		$result = mysqli_query($this->conn, $s);
		$row = mysqli_fetch_assoc($result);
		return $row["count"];
	}
}
$currentPage = $_REQUEST["currentPage"];
$pageSize = $_REQUEST["pageSize"];
$orderBy = $_REQUEST["orderBy"];
$searchKey = $_REQUEST["searchKey"];
$orderType = $_REQUEST["orderType"];
$item = new Items();
$items = $item->getAllItems($currentPage, $pageSize, $orderBy,$orderType, $searchKey);
echo json_encode($items);
?>
