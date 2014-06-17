define([
	'translates/locale_pt-br',
	'translates/locale_en',
	'text!../../static/views/direito-tributario-bar.html',
	'text!../../static/views/eventos-bar.html',
	'text!../../static/views/inscricao-bar.html',

	'core',

	'controllers/controllers',
	'controllers/home-ctrl',
	'controllers/sobre-o-curso-ctrl',
	'controllers/corpo-docente-ctrl',
	'controllers/inscricao-ctrl',
	'controllers/contato-ctrl',

], function (localePtBR, localeEn, templateDireitoTributario, templateEventos, templateInscricao) {

	'use strict';

	var app = angular.module('app', ['$strap.directives', 'app.services', 'app.controllers', 'app.directives', 'app.filters']);


	app.config(function ($translateProvider) {
		$translateProvider.translations('pt-BR', localePtBR);
		$translateProvider.translations('en', localeEn);
	});

	app.run(function ($rootScope, $bootstrap, $timeout) {
		$rootScope.complemento = {};

		$rootScope.complemento.direitoTributario = {
			title: 'Direito Tributário',
			content: templateDireitoTributario
		};

		var eventosArr = [
			{titulo: 'Evento Teste', data: '10/08/2014', descricao: 'Evento 1 de teste'},
			{titulo: 'Evento Teste 2', data: '10/09/2014', descricao: 'Evento 2 de teste'},
			{titulo: 'Evento Teste 3', data: '10/10/2014', descricao: 'Evento 3 de teste'},
			{titulo: 'Evento Teste 4', data: '10/11/2014', descricao: 'Evento 4 de teste'}
		];

		$rootScope.complemento.eventos = {
			title: 'Eventos',
			content: templateEventos,
			data: eventosArr
		};

		$rootScope.complemento.inscricao = {
			title: 'Inscrições',
			content: templateInscricao
		};

		$rootScope.menu = [
			{description: I18n.t('menu.inicio'), href: '#/'},
			{description: I18n.t('menu.sobreOCurso'), href: '#/sobre-o-curso'},
			{description: I18n.t('menu.corpoDocente'), href: '#/corpo-docente'},
			{description: I18n.t('menu.inscricao'), href: '#/inscricao'},
			{description: I18n.t('menu.contato'), href: '#/contato'},
		];

		/*$timeout(function () {
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
		}, 5000);*/

		$timeout(function () {
			$bootstrap.ready();
		}, 0);
	});


	return app;
});
