<!DOCTYPE html>
<html>
	<head>
		<title>Treeview</title>
		<!-- Added some libraries -->
		<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
		<link rel="stylesheet" href="css/bootstrap.min.css" />
		<link rel="stylesheet" href="./css/treeview.css" />
		<script src="js/jquery.min.js"></script>    
		<script src="js/script.js?t=21212s"></script>
		<script src="js/treeview.js"></script>

	</head>
	<body>
		<div class="container" style="width:900px;">
			<h2 align="center">TreeView</h2>
			<br/><br/>
				<div class="row">
					<div class="col-md-9">
						<h3 align="center"><u>Items</u></h3>
						<br />

					<!-- For tree structure -->	
					<div id="tree"></div>
				</div>
			</div>
		</div>

		<!-- Modal delete confirm -->
		<div class="modal popup" popup-name="popup-delete" id="deleteItemModal" role="dialog" aria-labelledby="deleteItemModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="deleteItemModalLabel">Delete Confirmation</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"  popup-close="deleteItemModal">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						This is very dangerous, you shouldn't do it! Are you really really sure?
					</div>
					<div class="modal-footer">
						<div class="row w-100">
							<div id="counter" class="w-50 text-danger" style="font-size: 18px;">
								20
							</div>
							<div class="w-50 text-right">
								<button type="button" class="btn btn-primary" id="rmv-btn" >Yes I am</button>
								<button type="button" class="btn btn-secondary cancel"  popup-close="deleteItemModal"  data-dismiss="modal">No</button>
							</div>
						</div>	
					</div>
				</div>
			</div>
		</div>
			<!-- Modal add confirm -->
		<div class="modal popup" popup-name="popup-add"  id="addItemModal" role="dialog" aria-labelledby="addItemModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="addItemModalLabel">Add Item</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" popup-close="addItemModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<form method="post" id="treeview_form">
						<div class="modal-body">
							<!-- Create Itm Form -->
							<div class="form-group">
								<label>Select Parent Item</label>
									<select name="parent_id" id="parent_item" class="form-control" required="">
									</select>
							</div>
							<div class="form-group">
								<label>Enter Item Name</label>
								<input type="text" name="item_name" value="" id="item_name" class="form-control" required="">
							</div>

						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary cancel"  popup-close="addItemModal" data-dismiss="modal">Cancel</button>
							<input type="submit" name="action" id="action" value="Add" class="btn btn-info" />
						</div>
					</form>
				</div>
			</div>
		</div>

	</body>
</html>