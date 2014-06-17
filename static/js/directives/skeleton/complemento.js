define(['directives/directives', 'text!../../../views/skeleton/complemento.html'], function (directives, template) {

	'use strict';
	directives.directive('ppgdComplemento', function ($rootScope, $compile) {

		return {

			restrict: 'A',
			replace: true,
			template: template,
			scope: {},

			link: function (scope, element, attrs) {
        var evalStr = 'complemento.' + attrs.ppgdComplemento;
				scope.bar = $rootScope.$eval(evalStr);

				if (scope.bar.content.length && scope.bar.content.length === 1) {
					return;
				}

				if (scope.bar && scope.bar.content && scope.bar.data) {
					scope.bar.content = $compile(scope.bar.content)(scope);
				}


			}
		};
	});
});
