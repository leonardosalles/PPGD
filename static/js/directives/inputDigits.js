define(['directives/directives'], function (directives) {
	'use strict';

	directives.directive('spaInputDigits', function () {

		return {
			restrict: 'A',
			require: 'ngModel',
			 
			link: function (scope, element, attr, ctrl) {
				 
				element.setMask({mask: '9', type: 'repeat', autoTab: false});
				 
				ctrl.$formatters.push(function (value) {
					var validated = !value || /^\d+$/.test(value);
					if (validated) {
						element.removeAttr('data-spa-validate-digits');
					} else {
						element.attr('data-spa-validate-digits', scope.$eval(attr.spaInputDigitsMessage) || I18n.t('spa.validation.type.digits'));
					}
					ctrl.$setValidity('digits', validated);
					return value;
				});
				 
				 
				ctrl.$parsers.push(function (value) {
					if (!value || /^\d+$/.test(value)) {
						element.removeAttr('data-spa-validate-digits');
						ctrl.$setValidity('digits', true);
						return value ? Number(value) : null;

					} else {

						element.attr('data-spa-validate-digits', scope.$eval(attr.spaInputDigitsMessage) || I18n.t('spa.validation.type.digits'));
						ctrl.$setValidity('digits', false);
						return undefined;
					}

				});
			}
		};
	});
});