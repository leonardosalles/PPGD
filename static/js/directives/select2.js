define(['directives/directives'], function (directives) {
	'use strict';

	var select2 =  function () {

		return {
			restrict: 'AE',
			require: '?ngModel',
			
			link: function (scope, element, attr, ctrl) {
				if (attr.spaDuallistbox || element.data('select2')) {
					return;
				}
				 
				element.bind('$destroy', function () {
					if (element.data('select2')) {
						element.select2('destroy');
					}
				});
				
				var opts = angular.extend({placeholder: attr.placeholder || '', allowClear: true, width: 'off'}, scope.$eval(attr.spaSelect2));
				if (!ctrl) {
					element.select2(opts);
					return;
				}
				
				var verify = function () {
					var container = element.data('select2').container;
					if (ctrl.$valid && $(container).data('tooltip')) {
						$(container).tooltip('destroy');
					}
				};

				var focus = function () {
					
					verify();
					if (ctrl.$valid) {
						return;
					}
					
					
					var container = element.data('select2').container;
					$(container).tooltip({animation: false, placement: 'top', trigger: 'manual', delay: {show: 100, hide: 0}});
					$(container).data('tooltip').options.title = function () {
						var log = '';
						angular.forEach(ctrl.$error, function (value, key) {
							if (value) {
								log = $(element).attr('data-spa-validate-' + key) || I18n.t('spa.validation.defaultMessage');
							}
						});
							 
						return log;
					};
					 
					$(container).tooltip('show');
				};
				 
				var blur = function () {
					var container = element.data('select2').container;
					if ($(container).data('tooltip')) {
						$(container).tooltip('destroy');
					}
				};
				
				ctrl.$formatters.push(function (value) {
					return angular.isArray(value) ? value : value || "";
				});
				
				ctrl.$parsers.push(function (value) {
					return angular.isArray(value) ? value : value || null;
				});
					 
				if (element.is('select')) {
					
					scope.$watch(function () {
						if (element.data('select2')) {
							var value = element.val();
							element.select2('val', angular.isArray(value) ? value : value || null);
						} else {
							element.select2(opts);
						}
						
						verify();
					});
					
					element.on('select2-focus', focus);
					element.on('select2-blur', blur);
					element.on('change', function () {
						if (element.data('select2').container.hasClass('select2-container-active')) {
							element.trigger('select2-focus');
						}
					});
					
					
				} else {
													 
					ctrl.$render = function () {
						if (!element.data('select2')) {
							element.select2(opts);
							element.on('select2-focus', focus);
							element.on('select2-blur', blur);
							 
							element.on('change', function () {
								ctrl.$setViewValue(element.select2('val'));
								if (element.data('select2').container.hasClass('select2-container-active')) {
									element.trigger('select2-focus');
								}
								 
							});
						}
						 
						element.select2('val', ctrl.$viewValue);
						verify();
					};
					
					element.bind('change', function () {
						if (scope.$$phase) { return; }
						
						scope.$apply(function () {
							ctrl.$setViewValue(element.select2('val'));
						});
					});
				}
			}
		};
	};
	
	directives.directive('select', select2);
	directives.directive('spaSelect2', select2);
	
});