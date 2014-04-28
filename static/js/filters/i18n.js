define(['filters/filters'], function (filters) {
	'use strict';
	
	filters.filter('i18n', function ($parse) {

		return function (value, interpolateParams) {

			if (typeof(interpolateParams) !== 'undefined' && !angular.isObject(interpolateParams)) {
				interpolateParams = $parse(interpolateParams)();
			}
		
			return I18n.t(value, interpolateParams);
		};

	});
	
});