define(['directives/directives'], function (directives) {
	'use strict';

	directives.directive('spaInputPhone', function () {
		
		return {
			restrict: 'A',
			require: 'ngModel',
		
			link: function (scope, element, attr, ctrl) {
				var opts = angular.extend({flag: true}, scope.$eval(attr.spaInputPhone));

				if (opts.flag) {
					element.wrap('<div class="input-icon ' + (attr['class'] || 'input-medium pull-left') + '"></div>');
					element.after('<i></i>');
					element.css('width', '100%');
					
				} else if (!attr['class']) {
					element.addClass('input-medium');
				}

				

				ctrl.$formatters.push(function (value) {
					if (!value) {
						element.removeAttr('data-spa-validate-phone');
						ctrl.$setValidity('phone', true);
						 
						if (opts.flag) {
							element.parent().find('i').removeAttr('class').attr('class', '');
						}
						return value;
					}
					 
					var region = PhoneNumber.Parse(value, 'BR');
					if (region) {
						element.removeAttr('data-spa-validate-phone');
						ctrl.$setValidity('phone', true);
						 
						if (opts.flag) {
							element.parent().find('i').removeAttr('class').attr('class', '').addClass('flag flag-' + region.region.toLowerCase());
						}
						return region.internationalFormat;
					
					} else {
						element.attr('data-spa-validate-phone', scope.$eval(attr.spaInputPhoneMessage) || I18n.t('spa.validation.type.phone'));
						ctrl.$setValidity('phone', false);
						 
						if (opts.flag) {
							element.parent().find('i').removeAttr('class').attr('class', '');
						}
						return value;
					}
				});
				 
				 
				ctrl.$parsers.push(function (value) {
					if (!value) {
						element.removeAttr('data-spa-validate-phone');
						ctrl.$setValidity('phone', true);
						 
						if (opts.flag) {
							element.parent().find('i').removeAttr('class').attr('class', '');
						}
						return value;
					}
					 
					var region = PhoneNumber.Parse(value, 'BR');
					if (region && region.internationalFormat) {
						element.removeAttr('data-spa-validate-phone');
						ctrl.$setValidity('phone', true);
				         
						if (opts.flag) {
							element.parent().find('i').removeAttr('class').attr('class', '').addClass('flag flag-' + region.region.toLowerCase());
						}
						return PhoneNumber.Normalize(value);

					} else {
						element.attr('data-spa-validate-phone', scope.$eval(attr.spaInputPhoneMessage) || I18n.t('spa.validation.type.phone'));
						ctrl.$setValidity('phone', false);
				         
						if (opts.flag) {
							element.parent().find('i').removeAttr('class').attr('class', '');
						}
						return undefined;
					}
				});
				 
				element.change(function () {
					var region = PhoneNumber.Parse($(this).val(), 'BR');
					if (region && region.internationalFormat) {
						$(this).val(region.internationalFormat);
					}
				});
			}
		};
	});
});