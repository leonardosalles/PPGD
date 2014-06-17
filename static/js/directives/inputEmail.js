define(['directives/directives'], function (directives) {
	'use strict';

	directives.directive('jetInputEmail', function () {

		return {
			restrict: 'A',
			require: 'ngModel',

			link: function (scope, element, attr, ctrl) {

				ctrl.$formatters.push(function (value) {
					var validated = !value || validator(value);
					if (validated) {
						element.removeAttr('data-jet-validate-email');
					} else {
						element.attr('data-jet-validate-email', scope.$eval(attr.jetInputEmailMessage) || I18n.t('spa.validation.type.email'));
					}
					ctrl.$setValidity('email', validated);
					return value ? value.trim() : '';
				});

				ctrl.$parsers.push(function (value) {
					if (!value || validator(value)) {
						element.removeAttr('data-jet-validate-email');
						ctrl.$setValidity('email', true);
						return value ? value.trim() : null;

					} else {

						element.attr('data-jet-validate-email', scope.$eval(attr.jetInputEmailMessage) || I18n.t('spa.validation.type.email'));
						ctrl.$setValidity('email', false);
						return undefined;
					}

				});

				scope.$on('$destroy', function () {
				});

				var validator = function (email) {
					return new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i).test(email);
				};

			}
		};
	});

});
