define([
	'translates/locale_pt-br',
	'translates/locale_en',

	'core',
		
	'controllers/controllers',
	'controllers/home-ctrl',
	'controllers/sobre-o-curso-ctrl',
	'controllers/corpo-docente-ctrl',
	'controllers/inscricao-ctrl',
	'controllers/contato-ctrl',
    
], function (localePtBR, localeEn) {

	'use strict';
	
	var app = angular.module('app', ['$strap.directives', 'app.services', 'app.controllers', 'app.directives', 'app.filters']);
	
	
	app.config(function ($translateProvider) {
		$translateProvider.translations('pt-BR', localePtBR);
		$translateProvider.translations('en', localeEn);
	});

	app.run(function ($rootScope, $bootstrap, $timeout) {
		$rootScope.menu = [
			{description: I18n.t('menu.inicio'), href: '#/'},
			{description: I18n.t('menu.sobreOCurso'), href: '#/sobre-o-curso'},
			{description: I18n.t('menu.corpoDocente'), href: '#/corpo-docente'},
			{description: I18n.t('menu.inscricao'), href: '#/inscricao'},
			{description: I18n.t('menu.contato'), href: '#/contato'},
		];
		
		$timeout(function () {
			$bootstrap.setProgress(20);
		}, 1000);
		
		$timeout(function () {
			$bootstrap.setProgress(40);
		}, 2000);
		
		$timeout(function () {
			$bootstrap.setProgress(60);
		}, 3000);
		
		$timeout(function () {
			$bootstrap.setProgress(80);
		}, 4000);
		
		$timeout(function () {
			$bootstrap.setProgress(100);
		}, 5000);
		
		$timeout(function () {
			$bootstrap.ready();
		}, 5200);
	});
	

	return app;
});
