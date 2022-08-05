<?php
require_once("config.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = testInput($_POST["item_name"]);
    $id = (int) $_POST["item_id"];
    if (!empty($name) && $id > 0) {
        $escapeName = mysqli_real_escape_string($conn, $name);
        $sql = "UPDATE tbl_items SET `name` = '" . $escapeName . "' WHERE id = " . $id;
        $res = mysqli_query($conn, $sql);
        echo htmlspecialchars_decode($name); 
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