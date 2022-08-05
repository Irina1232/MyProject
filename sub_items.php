<?php
	require_once("config.php");
	$root[]  = [
		'val' => '0',
		'text' => 'Root'
	];

	$query = "SELECT * FROM tbl_items";
	$result = mysqli_query($conn, $query);

	if (mysqli_num_rows($result) > 0){
		$cats = [];
		foreach($result as $row) {
			$cats[$row['parent_id']][$row['id']] =  $row;
		}
	}
	$tree = [];
	$i = 1;
	$buildTree = function($cats, $parent_id) use (&$buildTree, $tree, $i) {
		$issetParent = is_array($cats) && isset($cats[$parent_id]);
		if (!$issetParent) 	return [];
	
		foreach($cats[$parent_id] as $cat) {
			$tree[$i] = [
				'val' => $cat['id'],
				'text' => htmlspecialchars_decode($cat['name'])
			];
			$i++;
			$tree = array_merge($tree, $buildTree($cats, $cat['id']));
		}
		return $tree;
	};
	echo json_encode(array_merge($root, $buildTree($cats, 0)));
?>