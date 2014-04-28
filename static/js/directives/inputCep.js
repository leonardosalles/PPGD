define(['directives/directives'], function (directives) {
	'use strict';
	
	directives.directive('spaInputCep', function () {

		return {
			restrict: 'A',
			require: 'ngModel',
			 
			link: function (scope, element, attr, ctrl) {
				var opts = angular.extend({mask: '99999-999', autoTab: false}, scope.$eval(attr.spaInputCep));
				 
				element.setMask(opts);
				element.addClass('input-small');
				
				ctrl.$formatters.push(function (value) {
					var newValue = angular.isNumber(value) ? lpad(value.toString(), 8) : value;
					newValue = jQuery.mask.string(newValue, opts.mask);
					
					var validated = !newValue || validator(newValue);
					if (validated) {
						element.removeAttr('data-spa-validate-cep');
					} else {
						element.attr('data-spa-validate-cep', scope.$eval(attr.spaInputCepMessage) || I18n.t('spa.validation.type.cep'));
					}
					
					ctrl.$setValidity('cep', validated);
					return newValue;
				});
				 
				 
				ctrl.$parsers.push(function (value) {
					if (!value || validator(value)) {
						 
						element.removeAttr('data-spa-validate-cep');
						ctrl.$setValidity('cep', true);
						return value ? Number(value.replace(new RegExp($.mask.options.fixedChars, 'g'), '')) : null;
					
					} else {
					
						element.attr('data-spa-validate-cep', scope.$eval(attr.spaInputCepMessage) || I18n.t('spa.validation.type.cep'));
						ctrl.$setValidity('cep', false);
						return undefined;
					}
					 
				});

				scope.$on('$destroy', function () {
					 
				});
				 
				 
				var lpad = function (value, padding) {
					var zeroes = '0';
					for (var i = 0; i < padding; i++) {
						zeroes += '0';
					}
				    
					return (zeroes + value).slice(padding * -1);
				};
				
				var validator = function (cep) {
					cep = cep.replace(new RegExp(/[^\d]+/g), '');
					if (cep === '' || cep.length !== 8) {
						return false;
					}

					return new RegExp(/^\d+$/).test(cep);
				};
			}
		};
		
	});
	
});