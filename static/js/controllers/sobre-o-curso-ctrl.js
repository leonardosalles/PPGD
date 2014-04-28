define(['controllers/controllers', 'text!../../../static/views/sobre-o-curso.html'], function (controllers, template) {
	'use strict';
	
	controllers.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/sobre-o-curso', {template: template, controller: 'SobreOCursoCtrl'});
	}]);
	
	
	controllers.controller('SobreOCursoCtrl', function ($scope, $window) {
		$window.document.title = 'Sobre o curso';
		
		$scope.listaTeste = ['ABC', 'DEF', 'GHI'];
	});
});