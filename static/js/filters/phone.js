define(['filters/filters'], function (filters) {
	'use strict';
	
	filters.filter('phone', function () {
	
		return function (value) {
			if (!value) { return value; }
			
			var region = PhoneNumber.Parse(value, 'BR');
			return region && region.internationalFormat ? region.internationalFormat : value;
		};
	});

});