define(['directives/directives'], function (directives) {
	'use strict';
	
	directives.directive('hover', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				if (attrs.hover !== 'dropdown') {
					return;
				}
				$(element).dropdownHover();
			}
		};
		
	});
	
});