define(['controllers/controllers', 'text!../../../static/views/inscricao.html'],	function (controllers, template) {
	'use strict';
	
	controllers.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/inscricao', {template: template, controller: 'InscricaoCtrl'});
	}]);
	
	
	controllers.controller('InscricaoCtrl', function ($scope, $window) {
		$window.document.title = 'Inscrição';
		
		$scope.listaTeste = ['ABC', 'DEF', 'GHI'];
	});
});
