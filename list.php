<?php
	require_once("config.php");
	$root[]  = [
		'id' => 0,
		'pid' => null,
		'text' => 'Root',
		'nodes' => []
	];

	$query = "SELECT * FROM tbl_items";
	$result = mysqli_query($conn, $query);

	if (mysqli_num_rows($result) > 0){
		$cats = [];
		foreach($result as $row) {
			$cats[$row['parent_id']][$row['id']] =  $row;
		}
	}
	
	$buildTree = function($cats, $parent_id) use (&$buildTree) {
		$issetParent = is_array($cats) && isset($cats[$parent_id]);
		if (!$issetParent) 	return [];
	
		foreach($cats[$parent_id] as $cat) {
			$tree[] = [
				'id' => $cat['id'],
				'pid' => $cat['parent_id'],
				'text' => htmlspecialchars_decode($cat['name']),
				'nodes' =>  $buildTree($cats, $cat['id'])
			]; 
		}
		return $tree;
	};
	echo json_encode(array_merge($root, $buildTree($cats, 0)));


?>
