/* jshint camelcase: false */
define({
		
	loading: 'Carregando…',
	modalEsc: 'Utilize ESC para cancelar',
			
	validation: {
		type: {
			email: 'valor deve ser um e-mail válido',
			number: 'valor deve ser um número válido',
			currency: 'valor deve ser uma moeda válida',
			digits: 'valor deve ser um dígito válido',
			date: 'valor deve ser uma data válida ({{pattern}})',
			phone: 'valor deve ser um número de telefone válido',
			cpf: 'valor deve ser um CPF válido',
			cnpj: 'valor deve ser um CNPJ válido',
			cep: 'valor deve ser um CEP válido'
		},
	    
		defaultMessage: 'valor parece estar inválido',
		required: 'valor é obrigatório',
		regexp: 'valor parece estar inválido',
		min: 'valor deve ser maior do que ou igual a {{min}.',
		max: 'valor deve ser inferior ou igual a {{max}.',
		range: 'valor deve estar entre {{min}} e {{max}.',
		minlength: 'valor é muito pequeno. Ele deve ter {{minlength}} caracteres ou mais.',
		maxlength: 'valor é muito grande. Ele deve ter {{maxlength}} caracteres ou menos',
		rangelength: 'tamanho deste valor é inválido. Ele deve possuir entre {{minlength}} e {{maxlength}} caracteres',
		mincheck: 'você deve selecionar pelo menos {{mincheck}} opções',
		maxcheck: 'você deve selecionar {{maxcheck}} opções ou menos',
		rangecheck: 'você deve selecionar entre {{mincheck}} e {{maxcheck}} opções',
		equalto: 'valor deve ser o mesmo',
		minwords:  'valor deve possuir no mínimo {{minwords}} palavras',
		maxwords: 'valor deve possuir no máximo {{maxwords}} palavras',
		rangewords: 'valor deve possuir entre {{minwords}} e {{maxwords}} palavras',
		greaterthan: 'valor deve ser maior do que {{greaterthan}}',
		lessthan: 'valor deve ser inferior a {{lessthan}}',
		beforedate: 'data deve ser antes de {{beforedate}}',
		afterdate: 'data deve ser após {{afterdate}}'
	},
	
	select2: {
		formatNoMatches: 'Nenhum resultado encontrado',
		formatLoadMore: 'Carregando mais resultados...',
		formatSearching: 'Buscando...',
 
		formatInputTooShort: {
			one: 'Informe {{count}} caracter',
			other:  'Informe {{count}} caracteres'
		},
 
		formatInputTooLong: {
			one: 'Apague {{count}} caracter',
			other:  'Apague {{count}} caracteres'
		},

		formatSelectionTooBig: {
			one: 'Só é possível selecionar {{count}} elemento',
			other:  'Só é possível selecionar {{count}} elementos'
		}
	},
	
	maxlength: {
		statusText: 'caracteres disponíveis',
		alertText: 'Você digitou muitos caracteres.'
	},
		
	datascroller: {
		info: {
			one: 'Exibindo {{startRecord}} a {{endRecord}} de {{count}} registro',
			other: 'Exibindo {{startRecord}} a {{endRecord}} de {{count}} registros'
		},
			
		nomatches: 'Nenhum registro foi encontrado',
		serverfirst: 'Ir para a primeira página',
		serverprevious: 'Ir para a página anterior',
		servernext: 'Ir para a próxima página',
		serverlast: 'Ir para a última página',
		gotopage: 'Ir para a página {{page}}'
	},
	
	header: {
		logout: 'Sair'
	},
	
	subheader: {
		quickaccess: 'Acesso Rápido',
		attendance: 'Iniciar atendimento paralelo'
	},
	
	sidebar: {
		toggle: 'Ocultar menu automaticamente'
	},
	
	boxcustomer: {
		hideinfo: 'Ocultar alertas',
		showinfo: 'Exibir alertas'
	},
		
	exception: {
		info: 'Informação',
		success: 'Sucesso',
		warning: 'Cuidado',
		error: 'Erro',
		
		validation: 'Corrija os erros de validação e tente novamente',
		title: 'Erro inesperado, favor tente novamente',
		pageNotFound: 'Página não encontrada',
		
		page: {
			header: 'Ocorreu um erro!',
			subheader: 'Ocorreu um erro durante a operação.',
			back: 'Voltar',
			backToHome: 'Voltar para Home',
			support: 'Contate Suporte'
		},
		
		code: {
			'401': 'Acesso não autorizado',
			'403': 'Acesso proibido',
			'404': 'Recurso não encontrado',
			'405': 'Método não permitido',
			'407': 'Autenticação de proxy necessária',
			'408': 'Tempo de resposta excedido',
			'422': 'Corrija os erros de validação e tente novamente',
			'500': 'Erro inesperado, favor tente novamente'
		}
	},
	
	date: {
		formats: {
			'fullDate': 'EEEE, d \'de\' MMMM \'de\' y',
			'longDate': 'd \'de\' MMMM \'de\' y',
			'medium': 'dd/MM/yyyy HH:mm:ss',
			'mediumDate': 'dd/MM/yyyy',
			'mediumTime': 'HH:mm:ss',
			'short': 'dd/MM/yy HH:mm',
			'shortDate': 'dd/MM/yy',
			'shortTime': 'HH:mm',
		},
		
		today: 'Hoje',
		day_names: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
		abbr_day_names: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
		month_names: [null, 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
		abbr_month_names: [null, 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
		meridian: ['AM', 'PM']
	},
	
	number: {
		currency_sym: 'R$',
		decimal_sep: ',',
		group_sep: '.'
	}
});