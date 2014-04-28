define(['filters/filters'], function (filters) {
	'use strict';
	
	filters.filter('cpf', function () {
	
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
		
			var newValue = angular.isNumber(value) ? lpad(value.toString(), 11) : value;
			return jQuery.mask.string(newValue, '999.999.999-99');
		};
		
	});
	
});