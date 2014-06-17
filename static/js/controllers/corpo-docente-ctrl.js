define(['controllers/controllers', 'text!../../../static/views/corpo-docente.html'],	function (controllers, template) {
	'use strict';

	controllers.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/corpo-docente', {template: template, controller: 'CorpoDocenteCtrl'});
	}]);


	controllers.controller('CorpoDocenteCtrl', function ($scope, $window) {
		$window.document.title = 'Corpo Docente';

		$scope.corpoDocente = [
			{nome: 'ADÃO SERGIO DO NASCIMENTO CASSIANO', graduacao: 'Doutor pela UFRGS', imagem: 'sem-imagem.png'},
			{nome: 'ANDRÉ PEDREIRA IBAÑEZ', graduacao: 'Mestre pela UFRGS'},
			{nome: 'CARLOS KLEIN ZANINI', graduacao: 'Doutor pela USP'},
			{nome: 'CEZAR SALDANHA SOUZA JUNIOR', graduacao: 'Doutor pela USP'},
			{nome: 'DANIEL MITIDIERO', graduacao: 'Doutor pela UFRGS'},
			{nome: 'HUMBERTO ÁVILA', graduacao: 'Doutor pela Ludwig-Maximilians-Universität München'},
			{nome: 'IGOR DANILEVICZ', graduacao: 'Doutor pela UFRGS'},
			{nome: 'LEANDRO PAULSEN', graduacao: 'Doutor pela Universidad de Salamanca'},
			{nome: 'LUIS ALBERTO REICHELT', graduacao: 'Doutor pela UFRGS'},
			{nome: 'LUIZ FELIPE SILVEIRA DIFINI', graduacao: 'Doutor pela UFRGS'},
			{nome: 'ODONE SANGUINÉ', graduacao: 'Doutor pela Universitat Autònoma de Barcelona'},
			{nome: 'SIMONE ANACLETO', graduacao: 'Mestre pela UFRGS'}
		];

		$scope.palestrantes = [
			{nome: 'BETINA TREIGER GRUPENMACHER', graduacao: 'Doutora em Direito Tributário pela UFPR e Pós-Doutora pela Universidade de Lisboa'},
			{nome: 'FABIANA DEL PADRE TOMÉ', graduacao: 'Doutora em Direito pela PUC/SP'},
			{nome: 'JEFERSON TEODOROVICZ', graduacao: 'Mestre em Direito pela PUC/PR'},
			{nome: 'LIZIANE ANGELOTTI MEIRA', graduacao: 'Doutora em Direito pela PUC/SP'},
			{nome: 'PAULO AYRES BARRETO', graduacao: 'Doutor em Direito pela PUC/SP e Livre-Docente pela USP'},
			{nome: 'PAULO DE BARROS CARVALHO', graduacao: 'Doutor em Direito pela PUC/SP; Pós-Doutor em Direito pela USP e pela PUC/SP; Livre-Docente pela PUC/SP'},
			{nome: 'ROBERTO CATALANO BOTELHO FERRAZ', graduacao: 'Doutor em Direito Econômico e Financeiro pela USP; realizou estágio pós-doutoral junto à Université de Paris I – Sorbonne'},
			{nome: 'ROBSON MAIA LINS', graduacao: 'Doutor em Direito pela PUC/SP'},
			{nome: 'TÁCIO LACERDA GAMA', graduacao: 'Doutor em Direito pela PUC/SP'},
		];
	});
});
