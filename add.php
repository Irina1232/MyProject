<?php
require_once("config.php");
if($_SERVER["REQUEST_METHOD"] == "POST") {
	$name = testInput($_POST["item_name"]);
	$pid = (int) $_POST["parent_id"];
	if (!empty($name) && $pid > 0) {
		$escapeName = mysqli_real_escape_string($conn, $name);
		$sql = "INSERT INTO tbl_items (`name`, `parent_id`) VALUES ('" . $escapeName . "','" . $pid . "')";
		$res = mysqli_query($conn, $sql);
	}
}

function testInput($value) {
	$value = trim($value);
	$value = stripslashes($value);
	$value = strip_tags($value);
	$value = htmlspecialchars($value);
	return $value;
}
	
?>