define(['controllers/controllers', 'text!../../../static/views/corpo-docente.html'],	function (controllers, template) {
	'use strict';
	
	controllers.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/corpo-docente', {template: template, controller: 'CorpoDocenteCtrl'});
	}]);
	
	
	controllers.controller('CorpoDocenteCtrl', function ($scope, $window) {
		$window.document.title = 'Corpo Docente';
		
		$scope.listaTeste = ['ABC', 'DEF', 'GHI'];
	});
});
