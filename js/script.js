
$(document).ready(function() {
	fill_parent_items();
	fill_treeview();
	let counter = 20;

	function fill_treeview() {
		$.ajax({
			url:"list.php",
			dataType:"json",
			success:function(data) {
				$('#tree').treeview({
					data: data,
					expandIcon: 'fa fa-angle-down fa-fw',
					collapseIcon: 'fa fa-angle-right fa-fw',
					indent: 1.25,
					parentsMarginLeft: '2.5rem',
					openNodeLinkOnNewTab: true 
				});
			}
		})
	}

	//Press button close
	$('.close, button.cancel').click(function (e) {
		e.preventDefault();
		let nameModal =  $(this).attr('popup-close');
		$("#" + nameModal).fadeOut(500);
	});
	

	function fill_parent_items() {
		$.ajax({
			url:'sub_items.php',
			success: function(data) {
				let items = jQuery.parseJSON(data);
				$.each(items, function (index, value) {
					$("#parent_item").append(
						$('<option>', {
							value: value.val,
							text : value.text
						})
					);
				});
			}
		});
	}

	$('#treeview_form').on('submit', function(event) {
		event.preventDefault();
		let dataForm = $(this).serialize();
		if ($(this).find('#item_name').val() != '') {
			$.ajax({
				url: "add.php",
				method: "POST",
				data: dataForm,
				success:function(data) {
					fill_treeview();
					fill_parent_items();
					$('#treeview_form')[0].reset();			
					$('.popup .cancel').click();
				}
			})
		} else {
			alert('Enter Item Name!');
		}
	});

	$('#rmv-btn').on('click', function(e) {
		let id = $(this).attr('data-itm-id');
		let pid = $(this).attr('data-itm-pid');
		$.ajax({
			url:'delete.php',
			method:'POST',
			data:'id='+id+'&pid='+pid,
			success: function(data) {
				fill_treeview();
				fill_parent_items();
				$(this).find('.cancel').click();
				alert('Item deleted successuly..!');
			}
		})
	});

});

