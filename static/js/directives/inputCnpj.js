define(['directives/directives'], function (directives) {
	'use strict';

	directives.directive('spaInputCnpj', function () {

		return {
			restrict: 'A',
			require: 'ngModel',
			 
			link: function (scope, element, attr, ctrl) {
				var opts = angular.extend({mask: '99.999.999/9999-99', autoTab: false}, scope.$eval(attr.spaInputCnpj));
					 
				$(element).setMask(opts);
				$(element).addClass('input-medium');
				
				ctrl.$formatters.push(function (value) {
					var newValue = angular.isNumber(value) ? lpad(value.toString(), 14) : value;
					newValue = jQuery.mask.string(newValue, opts.mask);
				     
					var validated = !newValue || validator(newValue);
					if (validated) {
						element.removeAttr('data-spa-validate-cnpj');
					} else {
						element.attr('data-spa-validate-cnpj', scope.$eval(attr.spaInputCnpjMessage) || I18n.t('spa.validation.type.cnpj'));
					}
					ctrl.$setValidity('cnpj', validated);
					return newValue;
				});
				 
				 
				ctrl.$parsers.push(function (value) {
					if (!value || validator(value)) {
						element.removeAttr('data-spa-validate-cnpj');
						ctrl.$setValidity('cnpj', true);
						return value ? Number(value.replace(new RegExp($.mask.options.fixedChars, 'g'), '')) : null;

					} else {
						element.attr('data-spa-validate-cnpj', scope.$eval(attr.spaInputCpfMessage) || I18n.t('spa.validation.type.cnpj'));
						ctrl.$setValidity('cnpj', false);
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
				 
				 
				var validator = function (cnpj) {
					cnpj = cnpj.replace(/[^\d]+/g, '');
					if (cnpj === '') {
						return false;
					}
				     
					if (cnpj.length !== 14) {
						return false;
					}
				 
				    // Elimina CNPJs invalidos conhecidos
					if (cnpj === '00000000000000' ||
				        cnpj === '11111111111111' ||
				        cnpj === '22222222222222' ||
				        cnpj === '33333333333333' ||
				        cnpj === '44444444444444' ||
				        cnpj === '55555555555555' ||
				        cnpj === '66666666666666' ||
				        cnpj === '77777777777777' ||
				        cnpj === '88888888888888' ||
				        cnpj === '99999999999999') {
						return false;
					}
				         
					// Valida DVs
					var tamanho = cnpj.length - 2;
					var numeros = cnpj.substring(0, tamanho);
					var digitos = cnpj.substring(tamanho);
					var soma = 0;
					var pos = tamanho - 7;
			
					for (var i = tamanho; i >= 1; i--) {
						soma += numeros.charAt(tamanho - i) * pos--;
						if (pos < 2) {
							pos = 9;
						}
					}
					
					var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
					if (resultado.toString() !== digitos.charAt(0)) {
						return false;
					}
				         
					tamanho = tamanho + 1;
					numeros = cnpj.substring(0, tamanho);
					soma = 0;
					pos = tamanho - 7;
					
					for (i = tamanho; i >= 1; i--) {
						soma += numeros.charAt(tamanho - i) * pos--;
						if (pos < 2) {
							pos = 9;
						}
					}
					
					resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
					if (resultado.toString() !== digitos.charAt(1)) {
						return false;
					}
					return true;
				};
			}
		};
	});
});