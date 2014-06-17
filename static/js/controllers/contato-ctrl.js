define(['controllers/controllers', 'text!../../../static/views/contato.html'],	function (controllers, template) {
	'use strict';

	controllers.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/contato', {template: template, controller: 'ContatoCtrl'});
	}]);


	controllers.controller('ContatoCtrl', function ($scope, $window) {
		$window.document.title = 'Contato';

		$scope.listaTeste = ['ABC', 'DEF', 'GHI'];

		$scope.send = function () {
			if ($scope.formContato.isInvalid()) { return; }
		}

		$scope.clean = function () {
			$scope.entity = null;
		}
	});
});
