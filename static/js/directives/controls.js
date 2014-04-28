define(['directives/directives'], function (directives) {
	'use strict';

	directives.directive('spaControls', function () {

		return {

			restrict: 'A',

			compile: function (element) {
				var controls = angular.element('<div class="controls controls-row"></div>');
				controls.append(element.contents());

				element.addClass('control-group');
				element.html('');
				element.append(angular.element('<label class="control-label"></label>'));
				element.append(controls);
			},

			controller: function ($scope, $element, $attrs) {
				$attrs.$observe('label', function (value) {
					$($element).find('> label').html(value);
				});
			}
		};
		
	});
	
});