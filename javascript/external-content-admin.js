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

		$('.external-content-edit-form.cms-edit-form').entwine({
			/**
			 * Function: onsubmit
			 * 
			 * Suppress submission unless it is handled through ajaxSubmit().
			 */
			onsubmit: function(e, button) {
				console.log(button); 
				if(!button) return false;

				button = $(button);

				var data = this.serializeArray();
				data.push({name:button.attr('name'),value:button.val()});

				this.closest('.cms-container').submitForm(
					this,
					button,
					function() {
						// Tree updates are triggered by Form_EditForm load events
						button.removeClass('loading');
					},
					{
						type: 'POST',
						data: data,
						// Refresh the whole area to avoid reloading just the form, without the tree around it
						headers: {'X-Pjax': 'Content'}
					}
				);

				return false;
				// Only submit if a button is present.
				// This supressed submits from ENTER keys in input fields,
				// which means the browser auto-selects the first available form button.
				// This might be an unrelated button of the form field,
				// or a destructive action (if "save" is not available, or not on first position).
				if(this.prop("target") != "_blank") {
					if(button) this.closest('.cms-container').submitForm(this, button);
					return false;
				}
			}
		});

	});

}(jQuery));
