define(['directives/directives'], function (directives) {
	'use strict';

	directives.directive('ppgdInputCpf', function () {

		return {
			restrict: 'A',
			require: 'ngModel',
			 
			link: function (scope, element, attr, ctrl) {
				var opts = angular.extend({mask: '999.999.999-99', autoTab: false}, scope.$eval(attr.spaInputCpf));
				 
				$(element).setMask(opts);
				$(element).addClass('input-medium');
				
				ctrl.$formatters.push(function (value) {
					var newValue = angular.isNumber(value) ? lpad(value.toString(), 11) : value;
					newValue = jQuery.mask.string(newValue, opts.mask);
				     
					var validated = !newValue || validator(newValue);
					if (validated) {
						element.removeAttr('data-spa-validate-cpf');
					} else {
						element.attr('data-spa-validate-cpf', scope.$eval(attr.spaInputCpfMessage) || I18n.t('spa.validation.type.cpf'));
					}
					ctrl.$setValidity('cpf', validated);
					return newValue;
				});
				 
				 
				ctrl.$parsers.push(function (value) {
					if (!value || validator(value)) {
						element.removeAttr('data-spa-validate-cpf');
						ctrl.$setValidity('cpf', true);
						return value ? Number(value.replace(new RegExp($.mask.options.fixedChars, 'g'), '')) : null;

					} else {
						element.attr('data-spa-validate-cpf', scope.$eval(attr.spaInputCpfMessage) || I18n.t('spa.validation.type.cpf'));
						ctrl.$setValidity('cpf', false);
						return undefined;
					}
				});
				 

				scope.$on('$destroy', function () {
					 
				});
				 
				 
				var lpad = function (value, padding) {
					var zeroes = '0';
					for (var i = 0; i < padding; i++) { zeroes += '0'; }
					return (zeroes + value).slice(padding * -1);
				};
				 
				 
				var validator = function (cpf) {
					cpf = cpf.replace(/[^\d]+/g, '');
				 
					if (cpf.length !== 11 || cpf === '') {
						return false;
					}
					 
				    // Elimina CPFs invalidos conhecidos
					if (cpf === '00000000000' ||
				        cpf === '11111111111' ||
				        cpf === '22222222222' ||
				        cpf === '33333333333' ||
				        cpf === '44444444444' ||
				        cpf === '55555555555' ||
				        cpf === '66666666666' ||
				        cpf === '77777777777' ||
				        cpf === '88888888888' ||
				        cpf === '99999999999') {
						return false;
					}
					     
					// Valida 1o digito
					var add = 0;
					for (var i = 0; i < 9; i++) {
						add += parseInt(cpf.charAt(i), 10) * (10 - i);
					}
					
					var rev = 11 - (add % 11);
					if (rev === 10 || rev === 11) {
						rev = 0;
					}
				    
					if (rev !== parseInt(cpf.charAt(9), 10)) {
						return false;
					}
				     
				    // Valida 2o digito
					add = 0;
					for (i = 0; i < 10; i++) {
						add += parseInt(cpf.charAt(i), 10) * (11 - i);
					}
				    
					rev = 11 - (add % 11);
					if (rev === 10 || rev === 11) {
						rev = 0;
					}
				    
					if (rev !== parseInt(cpf.charAt(10), 10)) {
						return false;
					}
				    
					return true;
				};
			}
		};
	});
	
});
