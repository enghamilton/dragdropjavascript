jQuery(document).ready(function(){//http://www.phpzag.com/image-upload-and-crop-in-modal-with-php-and-jquery/
	/* When click on change profile pic */	
	jQuery('#change-profile-pic').on('click', function(e){
        jQuery('#profile_pic_modal').modal({show:true});        
    });
	jQuery('#upload_imagecrop').on('click', function(e){
        jQuery('#profile_pic_modal').modal({show:true});
    });
	jQuery('#upload_cover').on('click', function(e){
        jQuery('#profile_cover_modal').modal({show:true});
    });
	jQuery('#profile-pic').on('change', function()	{
		jQuery("#preview-profile-pic").html('');
		jQuery("#preview-profile-pic").html('Uploading....');
		/*
		if (typeof jQuery != 'undefined') {
			alert($().jquery);
		}
		*/
		//jQuery("#preview-profile-pic").html('<img src="images/900000202/photo1.jpg" id="photo" />');
		var u = URL.createObjectURL(this.files[0]);
		var img = new Image();
		img.onload = function() {
			var max_width = 500;
			if(img.width > max_width){
				scale = (max_width/img.width);
				preview_width = (img.width * scale);
				preview_height = (img.height * scale);
				return false;
			} else {
				preview_width = img.width;
				preview_height = img.height;
				return false;
			}
		};
		img.src = u;
		
		jQuery("#cropimage").ajaxForm(
		{
		target: '#preview-profile-pic',
		success:    function() {
				objAreaSelect = jQuery('img#photo').imgAreaSelect({
					instance: true,
					aspectRatio: '1:1',
					handles: true,
					onSelectEnd: getSizes,
					x1:(0.3 * preview_width),
					y1:(0.3 * preview_height),
					x2:(0.7 * preview_width),
					y2:(0.7 * preview_height)
				});
				
				/*
				jQuery('img#photo').imgAreaSelect({
				aspectRatio: '1:1',
				onSelectEnd: getSizes,
				x1:(0.3 * preview_width),
				y1:(0.3 * preview_height),
				x2:(0.7 * preview_width),
				y2:(0.7 * preview_height)
				});
				*/
				jQuery('#image_name').val(jQuery('#photo').attr('file-name'));
				jQuery('#cancel_crop').on('click', function(e){
					jQuery('#preview-profile-pic').html('');
					objAreaSelect.setOptions({ hide: true});
					objAreaSelect.update();
				});
				jQuery('.close').on('click', function(e){
					jQuery('#preview-profile-pic').html('');
					objAreaSelect.setOptions({ hide: true});
					objAreaSelect.update();
				});
				
			},
		clearForm: true
		}).submit();

	});
	jQuery('#profile-pic-cover').on('change', function()	{
		jQuery("#preview-profile-pic-cover").html('');
		jQuery("#preview-profile-pic-cover").html('Uploading....');
		
		//jQuery("#preview-profile-pic").html('<img src="images/900000202/photo1.jpg" id="photo" />');
		var u = URL.createObjectURL(this.files[0]);
		var img = new Image();
		img.onload = function() {
			var max_width = 500;
			if(img.width > max_width){
				scale = (max_width/img.width);
				preview_width = (img.width * scale);
				preview_height = (img.height * scale);
				return false;
			} else {
				preview_width = img.width;
				preview_height = img.height;
				return false;
			}
		};
		img.src = u;
		
		jQuery("#cropimagecover").ajaxForm(
		{
		target: '#preview-profile-pic-cover',
		success:    function() {
				/*
				objAreaSelect = jQuery('img#photo').imgAreaSelect({
					instance: true,
					aspectRatio: '1:1',
					handles: true,
					onSelectEnd: getSizes,
					x1:(0.3 * preview_width),
					y1:(0.3 * preview_height),
					x2:(0.7 * preview_width),
					y2:(0.7 * preview_height)
				});
				*/
				jQuery('#image_name_cover').val(jQuery('#photo-cover').attr('file-name'));
				jQuery('#cancel_cover_crop').on('click', function(e){
					jQuery('#preview-profile-pic-cover').html('');
					//objAreaSelect.setOptions({ hide: true});
					//objAreaSelect.update();
				});
				jQuery('.close').on('click', function(e){
					jQuery('#preview-profile-pic-cover').html('');
					//objAreaSelect.setOptions({ hide: true});
					//objAreaSelect.update();
				});
				
			},
		clearForm: true
		}).submit();

	});
	/* handle functionality when click crop button  */
	jQuery('#save_crop').on('click', function(e){
    e.preventDefault();
    params = {
            targetUrl: 'change_pic.php?action=save',
            action: 'save',
            x_axis: jQuery('#hdn-x1-axis').val(),
            y_axis : jQuery('#hdn-y1-axis').val(),
            x2_axis: jQuery('#hdn-x2-axis').val(),
            y2_axis : jQuery('#hdn-y2-axis').val(),
            thumb_width : jQuery('#hdn-thumb-width').val(),
            thumb_height:jQuery('#hdn-thumb-height').val()
        };
        saveCropImage(params);
    });
    /* Function to get images size */
    function getSizes(img, obj){
        var x_axis = obj.x1;
        var x2_axis = obj.x2;
        var y_axis = obj.y1;
        var y2_axis = obj.y2;
        var thumb_width = obj.width;
        var thumb_height = obj.height;
        if(thumb_width > 0) {
			jQuery('#hdn-x1-axis').val(x_axis);
			jQuery('#hdn-y1-axis').val(y_axis);
			jQuery('#hdn-x2-axis').val(x2_axis);
			jQuery('#hdn-y2-axis').val(y2_axis);
			jQuery('#hdn-thumb-width').val(thumb_width);
			jQuery('#hdn-thumb-height').val(thumb_height);
        } else {
            alert("Please select portion..!");
		}
    }
    /* Function to save crop images */
    function saveCropImage(params) {
		jQuery.ajax({
			url: params['targetUrl'],
			cache: false,
			dataType: "html",
			data: {
				action: params['action'],
				id: jQuery('#hdn-profile-id').val(),
				 t: 'ajax',
									w1:params['thumb_width'],
									x1:params['x_axis'],
									h1:params['thumb_height'],
									y1:params['y_axis'],
									x2:params['x2_axis'],
									y2:params['y2_axis'],
									image_name :jQuery('#image_name').val()
			},
			type: 'Post',
		   	success: function (response) {
					jQuery('#profile_pic_modal').modal('hide');
					jQuery(".imgareaselect-border1,.imgareaselect-border2,.imgareaselect-border3,.imgareaselect-border4,.imgareaselect-border2,.imgareaselect-outer").css('display', 'none');
					
					jQuery("#profile_picture").attr('src', response);
					jQuery("#preview-profile-pic").html('');
					jQuery("#profile-pic").val();
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert('status Code:' + xhr.status + 'Error Message :' + thrownError);
			}
		});
    }
});