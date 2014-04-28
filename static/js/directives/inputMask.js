define(['directives/directives'], function (directives) {
	'use strict';

	directives.directive('spaInputMask', function () {

		return {
			restrict: 'A',
			require: 'ngModel',

			link: function (scope, element, attr, ctrl) {
				var value = scope.$eval(attr.spaInputMask);

				var opts = angular.extend({autoTab: false}, angular.isString(value) ? {mask: value} : value);
				$(element).setMask(opts);

				ctrl.$formatters.push(function (value) {
					return value ? jQuery.mask.string(value, opts.mask) : '';
				});
				
				ctrl.$parsers.push(function (value) {
					return value ? value.replace(new RegExp($.mask.options.fixedChars, 'g'), '') : null;
				});

				scope.$on('$destroy', function () {
				});
			}
		};
	});
});