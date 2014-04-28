define(['directives/directives'], function (directives) {
	'use strict';
	
	directives.directive('spaCounter', function () {
		return {
			restrict: 'A',

			link: function (scope, element, attr) {
				var maxlength = element.attr('maxlength') || 10;
				 
				var opts = angular.extend({
					maxCharacters: maxlength,
					statusText: I18n.t('spa.maxlength.statusText'),
					alertText: I18n.t('spa.maxlength.alertText'),
					slider: true,
					events: ['keyup', 'focus'],
					statusClass: 'counter-status',
				}, scope.$eval(attr.spaMaxlength));
				 
				$(element).maxlength(opts);
			}
		};

	});
	
});