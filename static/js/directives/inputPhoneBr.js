define(['directives/directives'], function (directives) {
	'use strict';

	directives.directive('spaInputPhoneBr', function () {
				
		return {
			restrict: 'A',
			require: 'ngModel',
			 
			link: function (scope, element, attr, ctrl) {
				var opts = angular.extend({mask: '99 9999-99999', autoTab: false}, scope.$eval(attr.spaInputPhoneBr));
				 
				element.setMask(opts);
				element.addClass('input-medium');
				
				element.bind('keyup', function () {
					$(this).setMask({mask: this.value.length > 12 ? '99 99999-9999' : '99 9999-99999', autoTab: false});
				});
				 
				 
				ctrl.$formatters.push(function (value) {
					if (!value) {
						element.removeAttr('data-spa-validate-phone');
						ctrl.$setValidity('phone', true);
						return value;
					}
					 
					var region = PhoneNumber.Parse('+55 ' + value, 'BR');
					if (region) {
						element.removeAttr('data-spa-validate-phone');
						ctrl.$setValidity('phone', true);
						return region.internationalFormat.replace('+55 ', '');
					 
					} else {
						element.attr('data-spa-validate-phone', scope.$eval(attr.spaInputPhoneMessage) || I18n.t('spa.validation.type.phone'));
						ctrl.$setValidity('phone', false);
						return jQuery.mask.string(value, opts.mask);
					}
				});
				 
				 
				ctrl.$parsers.push(function (value) {
					if (!value) {
						element.removeAttr('data-spa-validate-phone');
						ctrl.$setValidity('phone', true);
						return value;
					}
					
					/* global PhoneNumber */
					var region = PhoneNumber.Parse('+55 ' + value, 'BR');
					if (region && region.nationalFormat) {
						element.removeAttr('data-spa-validate-phone');
						ctrl.$setValidity('phone', true);
						return region.nationalNumber;
				         
					} else {
						element.attr('data-spa-validate-phone', scope.$eval(attr.spaInputPhoneMessage) || I18n.t('spa.validation.type.phone'));
						ctrl.$setValidity('phone', false);
						return undefined;
					}
				});
			}
		};
	});
});