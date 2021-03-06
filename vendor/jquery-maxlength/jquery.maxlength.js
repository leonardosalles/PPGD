/**
 * jQuery Maxlength plugin
 * @version		$Id: jquery.maxlength.js,v 1.1 2013/07/10 15:25:58 l901062 Exp $
 * @package		jQuery maxlength 1.0.5
 * 				Copyright (C) 2009 Emil Stjerneman / http://www.anon-design.se
 * 				GNU/GPL, see LICENSE.txt
 */

(function($) 
{

	$.fn.maxlength = function(options)
	{
		var settings = jQuery.extend(
		{
			events:				      [], // Array of events to be triggerd
			maxCharacters:		  10, // Characters limit
			status:				      true, // True to show status indicator bewlow the element
			statusClass:		    "status", // The class on the status div
			statusText:			    "character left", // The status text
			notificationClass:	"notification",	// Will be added to the emement when maxlength is reached
			showAlert: 			    false, // True to show a regular alert message
			alertText:			    "You have typed too many characters.", // Text in the alert message
			slider:				      false // Use counter slider
		}, options );
		
		// Add the default event
		$.merge(settings.events, ['keyup']);

		return this.each(function() 
		{
			var item = $(this);
			var charactersLength = $(this).val().length;
			
      // Update the status text
			function updateStatus()
			{
				var charactersLeft = settings.maxCharacters - charactersLength;
				
				if(charactersLeft < 0) 
				{
					charactersLeft = 0;
				}

				item.nextAll("div."+settings.statusClass+":first").html(charactersLeft + " " + settings.statusText);
			}

			function checkChars() 
			{
				var valid = true;
				
				// Too many chars?
				if(charactersLength >= settings.maxCharacters) 
				{
					// Too may chars, set the valid boolean to false
					valid = false;
					// Add the notifycation class when we have too many chars
					item.addClass(settings.notificationClass);
					// Cut down the string
					item.val(item.val().substr(0,settings.maxCharacters));
					// Show the alert dialog box, if its set to true
					showAlert();
				} 
				else 
				{
					// Remove the notification class
					if(item.hasClass(settings.notificationClass)) 
					{
						item.removeClass(settings.notificationClass);
					}
				}

				if(settings.status)
				{
					updateStatus();
				}
			}
						
			// Shows an alert msg
			function showAlert() 
			{
				if(settings.showAlert)
				{
					alert(settings.alertText);
				}
			}

			// Check if the element is valid.
			function validateElement() 
			{
				var ret = false;
				
				if(item.is('textarea')) {
					ret = true;
				} else if(item.filter("input[type=text]")) {
					ret = true;
				} else if(item.filter("input[type=password]")) {
					ret = true;
				}

				return ret;
			}

			// Validate
			if(!validateElement()) 
			{
				return false;
			}
			
			// Loop through the events and bind them to the element
			$.each(settings.events, function (i, n) {
				item.bind(n, function(e) {
					charactersLength = item.val().length;
					checkChars();
				});
			});

			// Insert the status div
			if(settings.status) 
			{
				item.after($("<div/>").addClass(settings.statusClass).html('-'));
				updateStatus();
			}

			// Remove the status div
			if(!settings.status) 
			{
				var removeThisDiv = item.nextAll("div."+settings.statusClass+":first");
				
				if(removeThisDiv) {
					removeThisDiv.remove();
				}

			}

			// Slide counter
			if(settings.slider) {
				item.nextAll("div."+settings.statusClass+":first").hide();
				
				item.focus(function(){
					item.nextAll("div."+settings.statusClass+":first").css({
		                position: "absolute",
		                top: $(item).position().top + $(item).outerHeight(),
		                left: $(item).position().left,
		                zindex: 999
		            }).slideDown('fast');
				});

				item.blur(function(){
					item.nextAll("div."+settings.statusClass+":first").slideUp('fast');
				}); 
			}

		});
	};
})(jQuery);
