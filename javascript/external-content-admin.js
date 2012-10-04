/**
 * File: external-content-admin.js
 */
(function($) {

	$.entwine('ss', function($){

		/**
		 * Name
		 */
		$('.cms-edit-form input[name=Name]').entwine({
			onchange: function() {
				this.updateTreeLabel(this.val());
			},

			/**
			 * Function: updateTreeLabel
			 * 
			 * Update the tree
			 * (String) title
			 */
			updateTreeLabel: function(title) {
				var id = $('.cms-edit-form input[name=ID]').val();

				// only update immediate text element, we don't want to update all the nested ones
				var treeItem = $('.item:first', $('.cms-tree').find("[data-id='" + id + "']"));
				if (title && title != "") {
					treeItem.text(title);
				}
			}
		});

		// TODO something like this may need to be used to override the default behaviour for form submissions,
		// to get around what is currently lacking - eg. updating of tree state after submission

		$('#Form_EditForm.ExternalContentAdmin').entwine({
			/**
			 * Function: onsubmit
			 * 
			 * Suppress submission unless it is handled through ajaxSubmit().
			 */
			onsubmit: function(e, button) {
				if(button) this.closest('.cms-container').submitForm(this, button, function(){
					// refresh tree - gets around the fact the updatetreenodes does not work in the case of 
					// a external content item being deleted
					$('#cms-content-treeview').load($('#cms-content-treeview').data('url'));
				});

				return false;
			}
		});

	});

}(jQuery));
