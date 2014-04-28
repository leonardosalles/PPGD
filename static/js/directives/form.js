define(['directives/directives'], function (directives) {
	'use strict';
	
	directives.directive('form', function ($notify) {
		
		return {
			restrict: 'E',
					 
			link: function (scope, element, attrs) {
				var INVALID_CLASS = 'ng-invalid',
					PRISTINE_CLASS = 'ng-pristine',
					DIRTY_CLASS = 'ng-dirty';

				element.attr('novalidate', 'novalidate');

				var form = scope[attrs.name];
				if (!form) {
					return;
				}

				form.isValid = function (options) {
					if (form.$valid) {
						return true;
					}

					var opts = angular.extend({focus: true, notify: null}, options);

					var input = element.find('.ng-invalid:visible:first');
					if (opts.notify || (input.length === 0 && opts.notify === null)) {
						$notify.warning(I18n.t('spa.exception.validation'));
					}

					if (opts.focus && input.hasClass('select2-container')) {
						input.find(':input').focus().select();

					} else if (opts.focus) {
						input.focus().select();
					}

					return false;
				};

				form.isInvalid = function () {
					return !form.isValid();
				};

				element.submit(function () {
					var selected = element.find('.' + INVALID_CLASS);

					selected.each(function (index, bindElement) {
						$(this).removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);
						if (form.$valid) {
							if ($(this).data('bs.tooltip')) {
								$(this).tooltip('destroy');
							}
						} else {
							if ($(this).data('bs.tooltip')) {
								$(this).tooltip('destroy');
							}
							$(this).tooltip({animation: false, placement: 'top', trigger: 'manual', delay: {show: 100, hide: 0}});
							$(this).data('bs.tooltip').options.title = function () {
								var log = '';
								angular.forEach(form.$error, function (value, key) {
									if (value) {
										var attribute = $(bindElement).attr('data-ppgd-validate-' + key);
										if (attribute) {
											log = attribute;
										}
									}
								});
								return log;
							};

							if (index === 0) {
								$(this).tooltip('show');
							}
						}
					});
				});
			}
		};

	});
	
});
