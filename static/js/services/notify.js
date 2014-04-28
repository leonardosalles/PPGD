define(['services/services'], function (services) {
	'use strict';
	
	services.service('$notify', function ($bootstrap, $rootScope, $interpolate) {
		
		var template = '<div class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false">' +
					'<div class="modal-dialog">' +
						'<div class="modal-content modal-{{type}}">' +
							'<div class="modal-header">' +
								'<h3>{{title}}</h3>' +
							'</div>' +
					
							'<div class="modal-body">' +
								'<p>{{msg}}</p>' +
								'<br/>' +
								'<div class="row-fluid text-center">' +
									'<button class="btn btn-large" onclick="location.reload();">Tentar Novamente</button>' +
								'</div>' +
							'</div>' +
						'</div>';
					'</div>';
				'</div>';
	   
	   
		var templateReady = '<div class="modal fade" tabindex="-1">' +
						'<div class="modal-dialog">' +
							'<div class="modal-content modal-{{type}}">' +
								'<div class="modal-header">' +
									'<div class="control-close">' +
										'<span>{{esc}}</span>' +
										'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
									'</div>' +
									'<h3>{{title}}</h3>' +
								'</div>' +
	
								'<div class="modal-body">' +
									'<p>{{msg}}</p>' +
									'<br/>' +
									'<div class="row-fluid text-center">' +
										'<button class="btn btn-large btn-{{button}}" data-dismiss="modal">Ok</button>' +
									'</div>' +
								'</div>' +
							'</div>';
						'</div>';
					'</div>';
		
	   
		this.warning = function (msg) {
			var compiled = $interpolate($bootstrap.isReady() ? templateReady : template)({type: 'warning', button: 'warning', title: I18n.t('spa.exception.warning'), msg: msg, esc: I18n.t('spa.modalEsc')});
			$(compiled).modal();
		};
		
		this.info = function (msg) {
			var compiled = $interpolate($bootstrap.isReady() ? templateReady : template)({type: 'info', button: 'info', title: I18n.t('spa.exception.info'), msg: msg, esc: I18n.t('spa.modalEsc')});
			$(compiled).modal();
		};
		
		this.error = function (msg) {
			var compiled = $interpolate($bootstrap.isReady() ? templateReady : template)({type: 'error', button: 'danger', title: I18n.t('spa.exception.error'), msg: msg, esc: I18n.t('spa.modalEsc')});
			$(compiled).modal();
		};
		
		this.success = function (msg) {
			var compiled = $interpolate($bootstrap.isReady() ? templateReady : template)({type: 'success', button: 'success', title: I18n.t('spa.exception.success'), msg: msg, esc: I18n.t('spa.modalEsc')});
			$(compiled).modal();
		};
		
	});
	
});
