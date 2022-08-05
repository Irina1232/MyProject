<?php
	require_once("config.php");
	if(isset($_POST['id']) && (int) $_POST['id'] > 0) {
		$query = "SELECT * FROM tbl_items";
		$result = mysqli_query($conn, $query);

		if (mysqli_num_rows($result) > 0) {
			$cats = [];
			foreach($result as $row) {
				$cats[$row['parent_id']][$row['id']] =  $row;
			}
		}
		$idItem = (int) $_POST['id'];
		$ids = [$idItem];
		$buildTree = function($cats, $parent_id) use (&$buildTree, $ids) {
			$issetParent = is_array($cats) && isset($cats[$parent_id]);
			if (!$issetParent) 	return false;
			
			foreach($cats[$parent_id] as $cat) {
				$ids[] = $cat['id'];
				$buildTree($cats, $cat['id']);
			}
		};
        $buildTree($cats, $idItem);
		$sql = "DELETE FROM tbl_items WHERE id IN ('" . implode("', '", $ids) . "')";
		$res = mysqli_query($conn, $sql);
	}

?>