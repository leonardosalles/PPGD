require.config({
  
	baseUrl: 'static/js',
	
	paths: {
		'angular': '../../vendor/angular/angular',
		'angular-resource': '../../vendor/angular/angular-resource',
		'angular-cookies': '../../vendor/angular/angular-cookies',
		'angular-loader': '../../vendor/angular/angular-loader',
		'angular-sanitize': '../../vendor/angular/angular-sanitize',
		'angular-bootstrap-prettify': '../../vendor/angular/angular-bootstrap-prettify',
		
		'angular-strap': '../../vendor/angular-strap/angular-strap',
		
		'bootstrap': '../../vendor/bootstrap/js/bootstrap',
		'bootstrap-datetimepicker': '../../vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker',
		'bootstrap-hover-dropdown': '../../vendor/bootstrap-hover-dropdown/bootstrap-hover-dropdown',
		'bootstrap-duallistbox': '../../vendor/bootstrap-duallistbox/bootstrap-duallistbox',
		'bootstrap-modal': '../../vendor/bootstrap-modal/js/bootstrap-modal',
		'bootstrap-modalmanager': '../../vendor/bootstrap-modal/js/bootstrap-modalmanager',
		
		'jquery': '../../vendor/jquery/jquery',
		'jquery-browser': '../../vendor/jquery-browser/jquery.browser',
		'jquery-meiomask': '../../vendor/jquery-meiomask/jquery.meio.mask',
		'jquery-autonumeric': '../../vendor/jquery-autonumeric/jquery-autonumeric',
		'jquery-metadata': '../../vendor/jquery-metadata/jquery.metadata',
		'jquery-tablesorter': '../../vendor/jquery-tablesorter/jquery.tablesorter',
		'jquery-maxlength': '../../vendor/jquery-maxlength/jquery.maxlength',
		'jquery-nicescroll': '../../vendor/jquery-nicescroll/jquery.nicescroll',
		'jquery-scrollspy': '../../vendor/jquery-scrollspy/jquery-scrollspy',
		
		'moment': '../../vendor/moment/moment',
		'moment-timezone': '../../vendor/moment-timezone/moment-timezone',
		'moment-timezone-data': '../../vendor/moment-timezone/moment-timezone-data',

		'phone-number': '../../vendor/phone-number/PhoneNumber',
		'phone-number-metadata': '../../vendor/phone-number/PhoneNumberMetaData',

		'atmosphere': '../../vendor/atmosphere/jquery.atmosphere',

		'select2': '../../vendor/select2/select2',
		'i18n' : '../../vendor/i18njs/i18n',

		'text' : '../../vendor/requirejs-text/text',

		'views': '../../views'
	},
	

	shim: {
		'angular': {
			deps: ['jquery'],
			exports: 'angular'
		},
        
		'angular-resource': {
			deps: ['angular']
		},
        
		'angular-cookies': {
			deps: ['angular']
		},
        
		'angular-loader': {
			deps: ['angular']
		},
        
		'angular-sanitize': {
			deps: ['angular']
		},
		
		'angular-bootstrap-prettify': {
			deps: ['angular']
		},
        
		'angular-strap': {
			deps: ['angular', 'bootstrap']
		},
        
		'angular-ui-bootstrap': {
			deps: ['angular', 'bootstrap']
		},
        
		'angular-ui-utils': {
			deps: ['angular', 'bootstrap', 'jquery']
		},
                
		'bootstrap': {
			deps: ['jquery']
		},
				
		'bootstrap-datetimepicker': {
			deps: ['bootstrap']
		},
		
		'bootstrap-hover-dropdown': {
			deps: ['bootstrap']
		},
		
		'bootstrap-duallistbox': {
			deps: ['bootstrap']
		},
		
		'bootstrap-modal': {
			deps: ['bootstrap']
		},
				
		'bootstrap-modalmanager': {
			deps: ['bootstrap-modal']
		},
		
		'jquery': {
			exports: '$'
		},
		
		'jquery-browser': {
			deps: ['jquery']
		},
		
		'jquery-meiomask': {
			deps: ['jquery', 'jquery-browser']
		},
		
		'jquery-autonumeric': {
			deps: ['jquery']
		},
		
		'jquery-metadata': {
			deps: ['jquery']
		},
		
		'jquery-tablesorter': {
			deps: ['jquery', 'jquery-metadata']
		},
		
		'jquery-maxlength': {
			deps: ['jquery']
		},
		
		'jquery-nicescroll': {
			deps: ['jquery']
		},
		
		'jquery-scrollspy': {
			deps: ['jquery']
		},
		
		'phone-number': {
			deps: ['phone-number-metadata']
		},
		
		'moment-timezone': {
			deps: ['moment']
		},
		
		'moment-timezone-data': {
			deps: ['moment-timezone']
		},

		'i18n': {
			exports: 'I18n'
		},
		
		'select2': {
			deps: ['jquery']
		},
		
		'atmosphere' : {
			deps: ['jquery']
		}
	}
	
});


require(['app', 'jquery'], function () {
	'use strict';
	
	$(document).ready(function () {
		angular.bootstrap(document, ['app']);
	});
	
});