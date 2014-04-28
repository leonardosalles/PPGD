define(['directives/directives'], function (directives) {
	'use strict';

	directives.directive('spaInputDatetimeLocal', function ($timezone) {

		return {
			restrict: 'A',
			require: '?ngModel',
			 
			link: function (scope, element, attr, ctrl) {
				var clazz = attr['class'] || 'input-medium';
				
				element.wrap('<div class="input-append date datepicker ' + clazz + '"></div>');
				element.after('<span class="add-on"><i class="icon-calendar"></i></span>');
				 
				element.setMask({mask: '99/99/9999 29:59:59', autoTab: false});
				element.css('width', '100%');
				element.parent().datetimepicker({format: I18n.lookup('spa.date').formats.medium.replace('HH', 'hh')});
				 
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
					var picker = $(element).parent().data('datetimepicker');
					
					var datelocal = ctrl.$modelValue ? moment(ctrl.$modelValue + '-0300').tz($timezone.read()).format('YYYY-MM-DDTHH:mm:ss') : null;
					picker.setDate(datelocal ? new Date(datelocal) : null);
				};

				ctrl.$parsers.unshift(function (value) {
					if (!value) {
						element.removeAttr('data-spa-validate-datetime');
						ctrl.$setValidity('datetime', true);
						return undefined;

					} else if (angular.isDate(value)) {
						element.removeAttr('data-spa-validate-datetime');
						ctrl.$setValidity('datetime', true);
						
						return moment(moment(value).format('YYYY-MM-DDTHH:mm:ss') +
								      moment().tz($timezone.read()).format('ZZ'))
								      .tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss');

					} else if (angular.isString(value) && value.length === 19) {
						var picker = $(element).parent().data('datetimepicker');

						var date = null;
						if (picker.parseDate(value)) {
							picker.setValue(value);
							date = picker.getLocalDate();
						}
						 
						if (angular.isDate(date)) {
							element.removeAttr('data-spa-validate-datetime');
							ctrl.$setValidity('datetime', true);
							
							return moment(moment(value).format('YYYY-MM-DDTHH:mm:ss') +
										  moment().tz($timezone.read()).format('ZZ'))
										  .tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss');

						} else {
							element.attr('data-spa-validate-datetime', scope.$eval(attr.spaInputDatetimeMessage) || I18n.t('spa.validation.type.date', {pattern: I18n.lookup('spa.date').formats.medium}));
							ctrl.$setValidity('datetime', false);
							return undefined;
						}
				         
					} else {
						element.attr('data-spa-validate-datetime', scope.$eval(attr.spaInputDatetimeMessage) || I18n.t('spa.validation.type.date', {pattern: I18n.lookup('spa.date').formats.medium}));
						ctrl.$setValidity('datetime', false);
						return undefined;
					}
				});

			}
		};
		
	});
	
});