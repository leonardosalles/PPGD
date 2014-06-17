define(['controllers/controllers',
			'text!../../../static/views/home.html'], function (controllers, template) {
	'use strict';

	controllers.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {template: template, controller: 'HomeCtrl'});
	}]);


	controllers.controller('HomeCtrl', function ($scope, $rootScope, $window, Twitter, $notify) {
		$window.document.title = 'Inicio';


	});
});
