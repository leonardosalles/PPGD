define(['directives/directives', 'text!../../../views/skeleton/subheader.html'], function (directives, template) {
    
	'use strict';
	directives.directive('ppgdSubheader', function ($rootScope) {

		return {
			
			restrict: 'A',
			replace: true,
			template: template,
			scope: {},

			link: function (scope, element, attrs) {
				scope.subheader = $rootScope.subheader;
				
				$rootScope.$watch('subheader', function (newSubheader) {
					scope.subheader = newSubheader;
				});
			}
		};
	});
});