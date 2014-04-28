define(['filters/filters'], function (filters) {
	'use strict';
	
	filters.filter('phoneBr', function () {
	
		return function (value) {
			if (!value) { return value; }
		  
			var region = PhoneNumber.Parse('+55 ' + value, 'BR');
			return region && region.internationalFormat ? region.internationalFormat.replace('+55 ', '') : value;
		};
	
	});


});