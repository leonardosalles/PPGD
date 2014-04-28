define(['services/services'], function (services) {
	'use strict';
	
	services.factory('listaAreaResponsavel', function (AreaResponsavel) {
		return AreaResponsavel.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('listaProduto', function (Produto) {
		return Produto.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('listaProdutoAtivo', function (ProdutoAtivo) {
		return ProdutoAtivo.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('listaTipoAnalise', function (TipoAnalise) {
		return TipoAnalise.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('listaCanalCaptacao', function (CanalCaptacaoTodos) {
		return CanalCaptacaoTodos.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('listaGrupoProduto', function (GrupoProduto) {
		return GrupoProduto.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('listaCanal', function (Canal) {
		return Canal.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('listaFluxo', function (Fluxo) {
		return Fluxo.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('listaNacionalidade', function (DominioNacionalidade) {
		return DominioNacionalidade.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('listaUnidadesFederativas', function (UnidadeFederativa) {
		return UnidadeFederativa.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('listaTipoResidencia', function (TipoResidencia) {
		return TipoResidencia.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('listaTipoTelefone', function (TipoTelefone) {
		return TipoTelefone.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('listaTipoAfinidade', function (TipoAfinidade) {
		return TipoAfinidade.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('listaOcupacao', function (Ocupacao) {
		return Ocupacao.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('listaCargo', function (Cargo) {
		return Cargo.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('listaSituacaoProposta', function (SituacaoProposta) {
		return SituacaoProposta.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('listaTipoDocumento', function (TipoDocumento) {
		return TipoDocumento.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('escolaridades', function (Escolaridade) {
		return Escolaridade.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('estadosCivis', function (EstadoCivil) {
		return EstadoCivil.query().$then(function (response) {
			return response.data;
		});
	});
	
	services.factory('listaTipoDocumento', function (TipoDocumento) {
		return TipoDocumento.query().$then(function (response) {
			return response.data;
		});
	});
	
	
	//TODO REMOVER
	services.service('sexos', function () {
		return [ {id: 'M', descricao: I18n.t('sexo.masculino')},
		         {id: 'F', descricao: I18n.t('sexo.feminino')}
		];
	});
	
	//TODO REMOVER
	services.service('produtos', function () {
		return [ {id: 'option1', descricao: 'Cartão Débito'},
		         {id: 'option2', descricao: 'Cartão Crédito'},
		         {id: 'option3', descricao: 'Cartão Presente'},
		         {id: 'option4', descricao: 'Financiamento de Veículos'},
		         {id: 'option5', descricao: 'Refinanciamento de Veículos'},
		         {id: 'option6', descricao: 'Crédito Pessoal'},
		         {id: 'option7', descricao: 'Consignado'},
		         {id: 'option8', descricao: 'Empréstimo com Garantia de Imóvel'}
		];
	});
});