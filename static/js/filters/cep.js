define(['filters/filters'], function (filters) {
	'use strict';
	
	filters.filter('cep', function ($filter) {
	
		return function (value) {
			if (!value) {
				return value;
			}
		
			var newValue = angular.isNumber(value) ?  $filter('lpad')(value.toString(), 8) : value;
			return jQuery.mask.string(newValue.length > 8 ? newValue.substring(0, 8) : newValue, '99999-999');
		};

	});
	
});