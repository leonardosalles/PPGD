define(['directives/directives', 'text!../../../views/skeleton/menu.html'], function (directives, template) {
    
	'use strict';
	directives.directive('ppgdMenu', function ($rootScope, $location) {

		return {
			
			restrict: 'A',
			replace: true,
			template: template,
			scope: {},

			link: function (scope, element, attrs) {
				scope.menu = $rootScope.menu;

				var routeChangeSuccess = function () {
					var li = element.find('ul').find('a[href="#' + $location.path() + '"]').parent();
					if (li) {
						li.addClass('active');
					}

				};

				
				$rootScope.$watch('menu', function (newMenu) {
					scope.menu = newMenu;
				});

				scope.$on('$routeChangeStart', function () {
					element.find('ul').find('li.active').removeClass('active');
				});

				scope.$on('$routeChangeSuccess', routeChangeSuccess);
			},
			
			controller: function ($scope) {
				$scope.login = function () {
					if ($scope.formLoginStudant.isInvalid()) { return; }

					//todo chamada rest login
					alert('Login CPF: ' + $scope.cpf + ' - Senha: ' + $scope.password);
				}
			}
		};
	});
});
