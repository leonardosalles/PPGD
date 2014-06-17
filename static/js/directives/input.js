define(['directives/directives'], function (directives) {
	'use strict';

	var input = function () {

		return {
			restrict: 'E',
			require: '?ngModel',


			link: function (scope, element, attr, ctrl) {
				if (!ctrl) {
					return;
				}

				scope.$watch(function () {
					var log = '';

					angular.forEach(ctrl.$error, function (value, key) {
						if (value) {
							log += key + ',';
						}
					});


					return log;

				}, function () {

					if (ctrl.$valid) {
						if ($(element).data('bs.tooltip')) {
							$(element).tooltip('destroy');
						}

					} else {
						if ($(element).data('bs.tooltip')) {
							$(element).tooltip('destroy');
						}

						$(element).tooltip({animation: false, placement: 'top', trigger: 'manual', delay: {show: 100, hide: 0}});
						$(element).data('bs.tooltip').options.title = function () {
							var log = '';
							angular.forEach(ctrl.$error, function (value, key) {
								if (value) {
									log = $(element).attr('data-jet-validate-' + key) || I18n.t('spa.validation.defaultMessage');
								}
							});
							return log;
						};

						if ($(element).is(':focus')) {
							$(element).tooltip('show');
						}
					}
				});

				$(element).focus(function () {
					if ($(this).data('bs.tooltip')) {
						$(this).tooltip('show');
					}
				});

				$(element).blur(function () {
					if ($(this).data('bs.tooltip')) {
						$(this).tooltip('hide');
					}
				});

			}
		};
	};

	directives.directive('input', input);
	directives.directive('textarea', input);

});
