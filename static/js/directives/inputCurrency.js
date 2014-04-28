define(['directives/directives'], function (directives) {
	'use strict';

	directives.directive('spaInputCurrency', function () {
		
		return {
			restrict: 'A',
			require: 'ngModel',
			
			link: function (scope, element, attr, ctrl) {
				/* jshint camelcase: false */
				var opts = angular.extend({
					aSep: I18n.lookup('spa.number').group_sep,
					aDec: I18n.lookup('spa.number').decimal_sep,
					aSign: I18n.lookup('spa.number').currency_sym + ' '
				}, scope.$eval(attr.spaInputCurrency));

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
						element.removeAttr('data-spa-validate-currency');
						ctrl.$setValidity('currency', true);
						return value;
					}

					element.attr('data-spa-validate-currency', scope.$eval(attr.spaInputCurrencyMessage) || I18n.t('spa.validation.type.currency'));
					ctrl.$setValidity('currency', false);
					return undefined;
				});
				 
				 
				scope.$on('$destroy', function () {
				});
				
			}
		};
	});
});
