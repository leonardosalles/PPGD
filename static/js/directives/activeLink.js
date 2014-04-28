define(['directives/directives'], function (directives) {
	'use strict';
	
	directives.directive('spaActiveLink', function ($location) {
		return {
			
			restrict: 'A',
			
			link: function (scope, element, attrs) {
				
				var clazz = attrs.spaActiveLink || 'active';
				var path = attrs.href.substring(1);
					
				scope.$watch('$location.path()', function () {
					var newPath = $location.path();
					
					var active = path === newPath;

					if (active) {
						element.addClass(clazz);
						if ($(element).closest('li')) {
							element.parent().addClass(clazz);
						}

					} else if (element.hasClass(clazz)) {
						element.removeClass(clazz);
						if ($(element).closest('li')) {
							element.parent().removeClass(clazz);
						}
					}
				});
			}
		};
	});
});