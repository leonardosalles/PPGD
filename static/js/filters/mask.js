define(['filters/filters'], function (filters) {
	'use strict';
	
	filters.filter('mask', function ($parse) {
	
		return function (value, interpolateParams) {
			if (!value) { return value; }
		
			if (typeof(interpolateParams) !== 'undefined' && !angular.isObject(interpolateParams)) {
				interpolateParams = $parse(interpolateParams)();
				return jQuery.mask.string(value, interpolateParams);
			}
		
			return value;
		};
	});


});