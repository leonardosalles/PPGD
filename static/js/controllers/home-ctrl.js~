define(['controllers/controllers', 'text!../../../static/views/home.html'],	function (controllers, template) {
	'use strict';
	
	controllers.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {template: template, controller: 'HomeCtrl'});
	}]);
	
	
	controllers.controller('HomeCtrl', function ($scope, $window, Twitter, $notify) {
		Twitter.get({}, function () {
			$notify.success('Sucesso no request');
		}, function () {
			$notify.info('Modal de info');
			$notify.warning('Modal de warning');
			$notify.error('Modal de erro');
			$notify.success('Modal de sucesso');
		});
	});
});
