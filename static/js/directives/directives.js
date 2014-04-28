define([ 'angular' ], function (angular) {
	'use strict';

	var module = angular.module('app.directives', []);

	module.directive('tr', function () {

		return {
			restrict: 'E',
			require: '?ngRepeat',

			link: function (scope, element, attr) {
				if (attr.ngRepeat) {

					scope.$watch(attr.$attr.ngRepeat, function () {
						if (element.parents('table').get(0).config) {
							element.parents('table').trigger('update');
						}
					});

				}

			  
				if (element.parent().is('tbody')) {
				
					element.find('td').each(function (index) {
						if (!$(this).attr('data-title')) {
							var th = element.parents('table').find('thead tr th').get(index);
							$(this).attr('data-title', th ? th.innerHTML : '');
						}
					});
				}
			}
		};

	});

	return module;

});