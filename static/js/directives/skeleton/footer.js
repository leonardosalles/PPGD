define(['directives/directives', 'text!../../../views/skeleton/footer.html'], function (directives, template) {
    
	'use strict';
	directives.directive('ppgdFooter', function ($rootScope) {

		return {
			
			restrict: 'A',
			replace: true,
			template: template,
			scope: {},

			link: function (scope, element, attrs) {
				scope.footer = $rootScope.footer;
				
				$rootScope.$watch('footer', function (newFooter) {
					scope.footer = newFooter;
				});
			}
		};
	});
});