define(['directives/directives'], function (directives) {
	'use strict';

	directives.directive('spaNicescroll', function () {
		return {
			restrict: 'A',
			    
			link: function (scope, element, attr) {
				var opts = angular.extend({}, scope.$eval(attr.spaNicescroll));
				 
				element.niceScroll(opts);
				element.getNiceScroll().hide();
				 
				element.hover(function () {
					element.getNiceScroll().show();
					element.getNiceScroll().resize();
				 
				}, function () {
					element.getNiceScroll().hide();
				});
				 
				element.getNiceScroll()[0].cursor.hover(function () {
					element.getNiceScroll().show();
					element.getNiceScroll().resize();
				 
				}, function () {
					element.getNiceScroll().hide();
				});
				 
				element.getNiceScroll()[0].cursorh.hover(function () {
					element.getNiceScroll().show();
					element.getNiceScroll().resize();
				 
				}, function () {
					element.getNiceScroll().hide();
				});
				 
				 
				element.bind('$destroy', function () {
					element.getNiceScroll()[0].remove();
				});
			}
		
		};
		
	});
	
});