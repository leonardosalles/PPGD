define(['directives/directives'], function (directives) {
	'use strict';
	
	directives.directive('spaInputNumber', function () {
		
		return {
			restrict: 'A',
			require: 'ngModel',
			 
			link: function (scope, element, attr, ctrl) {
				/* jshint camelcase: false */
				var opts = angular.extend({
					aSep: I18n.lookup('spa.number').group_sep,
					aDec: I18n.lookup('spa.number').decimal_sep
				}, scope.$eval(attr.spaInputNumber));

				element.autoNumeric('init', opts);
				
				element.bind('blur keyup change', function () {
					scope.$apply(function () {
						ctrl.$setViewValue(element.autoNumeric('get'));
					});
				});
				
				ctrl.$formatters.push(function (value) {
					if (!value)	{ return ''; }
					element.autoNumeric('set', value);
					return element.val();
				});
				 
				ctrl.$parsers.push(function (value) {
					if (!value || angular.isNumber(value)) {
						element.removeAttr('data-spa-validate-number');
						ctrl.$setValidity('number', true);
						return value;
					}

					element.attr('data-spa-validate-number', scope.$eval(attr.spaInputNumberMessage) || I18n.t('spa.validation.type.number'));
					ctrl.$setValidity('number', false);
					return undefined;
				});
				 
				 
				scope.$on('$destroy', function () {
				});
			}
		};
	});
	
});
