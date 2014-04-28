define(['directives/directives'], function (directives) {
	'use strict';

	directives.directive('spaInputYear', function ($filter) {

		return {
			restrict: 'A',
			require: '?ngModel',

			link: function (scope, element, attr, ctrl) {
				var clazz = attr['class'] || 'input-mini';
				
				element.wrap('<div class="input-append date datepicker ' + clazz + '"></div>');
				element.after('<span class="add-on"><i class="icon-calendar"></i></span>');

				element.setMask({mask: '9999', autoTab: false});
				element.css('width', '100%');
				element.parent().datetimepicker({format: 'yyyy', viewMode: 'years', minViewMode: 'years', pickTime: false});

				scope.$on('$destroy', function () {
					var picker = $(element).parent().data('datetimepicker');
					if (picker) { picker.destroy(); }
				});
				
				element.bind('$destroy', function () {
					var picker = $(element).parent().data('datetimepicker');
					if (picker) { picker.destroy(); }
				});
				 
				if (attr.ngDisabled) {
					scope.$watch(attr.ngDisabled, function (value) {
						var picker = element.parent().data('datetimepicker');
						if (value) {
							picker.disable();
						} else {
							picker.enable();
						}
					});
				}

				if (attr.ngReadonly) {
					scope.$watch(attr.ngReadonly, function (value) {
						var picker = element.parent().data('datetimepicker');
						if (value) {
							picker.disable();
						} else {
							picker.enable();
						}
					});
				}
				 
				if (!ctrl) { return; }

				element.parent().on('changeDate', function (e) {
					scope.$apply(function () {
						ctrl.$setViewValue(e.localDate);
					});
				});
				 
				ctrl.$render = function () {
					var picker = element.parent().data('datetimepicker');
					picker.setDate(ctrl.$modelValue ? new Date(ctrl.$modelValue) : null);
				};

				ctrl.$parsers.unshift(function (value) {
					if (!value) {
						element.removeAttr('data-spa-validate-year');
						ctrl.$setValidity('year', true);
						return undefined;

					} else if (angular.isDate(value)) {
						element.removeAttr('data-spa-validate-year');
						ctrl.$setValidity('year', true);
						return $filter('date')(value, 'yyyy-MM-ddTHH:mm:ss');
						 
					} else if (angular.isString(value) && value.length === 4) {
						var picker = $(element).parent().data('datetimepicker');
						 
						var date = null;
						if (picker.parseDate(value)) {
							picker.setValue(value);
							date = picker.getLocalDate();
						}
						 
						if (angular.isDate(date)) {
							element.removeAttr('data-spa-validate-year');
							ctrl.$setValidity('year', true);
							return $filter('date')(date, 'yyyy-MM-ddTHH:mm:ss');
						
						} else {
							element.attr('data-spa-validate-year', scope.$eval(attr.spaInpuYearMessage) || I18n.t('spa.validation.type.date', {pattern: 'yyyy'}));
							ctrl.$setValidity('year', false);
							return undefined;
						}
					 
					} else {
						element.attr('data-spa-validate-year', scope.$eval(attr.spaInpuYearMessage) || I18n.t('spa.validation.type.date', {pattern: 'yyyy'}));
						ctrl.$setValidity('year', false);
						return undefined;
					}
				});
			}
		};
	});
	
});