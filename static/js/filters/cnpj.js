define(['filters/filters'], function (filters) {
	'use strict';
	
	filters.filter('cnpj', function () {
	
		return function (value) {
			if (!value) {
				return value;
			}

			var lpad = function (value, padding) {
				var zeroes = '0';
				for (var i = 0; i < padding; i++) {
					zeroes += '0';
				}
				return (zeroes + value).slice(padding * -1);
			};
		
			var newValue = angular.isNumber(value) ? lpad(value.toString(), 14) : value;
			return jQuery.mask.string(newValue, '99.999.999/9999-99');
		};
	});
});