define(['services/services',
        'text!../../views/core/stacktrace.html'],
    
    function (services, templateStackTrace) {
	
	'use strict';
	
	services.provider('$error', function () {
		
		var html = '<div>' +
						'<h5 style="margin-top:0">{{error.message}}</h5>' +
						'<ul>' +
							'<li ng-repeat="e in error.errors">{{e.message}}</li>' +
						'</ul>' +
					'</div>';
		
		
		var template = '<div class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false">' +
					'<div class="modal-dialog">' +
						'<div class="modal-content modal-error">' +
							'<div class="modal-header">' +
								'<h3>{{\'spa.exception.error\' | i18n}}</h3>' +
							'</div>' +
					
							'<div class="modal-body">' +
								html +
								'<br/>' +
								'<div class="btn-toolbar text-center">' +
									'<button class="btn" ng-show="error.stackTrace" ng-click="openStackTrace();">Ver Detalhe</button>' +
									'<button class="btn btn-danger" data-dismiss="modal">Ok</button>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';


		var templateReady = '<div class="modal fade" tabindex="-1">' +
					'<div class="modal-dialog">' +
						'<div class="modal-content modal-error">' +
							'<div class="modal-header">' +
								'<h3>{{\'spa.exception.error\' | i18n}}</h3>' +
							'</div>' +
		
							'<div class="modal-body">' +
								html +
								'<br/>' +
								'<div class="btn-toolbar text-center">' +
									'<button class="btn" ng-show="error.stackTrace" ng-click="openStackTrace();">Ver Detalhe</button>' +
									'<button class="btn btn-danger" data-dismiss="modal">Ok</button>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';
		
		
		var actualError = null;
		
		var build = function (response) {
			switch (response.status) {
			case 400:
				return response.data;
			
			case 401:
			case 403:
			case 404:
			case 405:
			case 407:
			case 408:
			case 422:
				return {message: I18n.t('spa.exception.code.' + response.status.toString())};
				
			default:
				return {message: I18n.t('spa.exception.code.500')};
			}
		};

		this.$get = function ($rootScope, $controller, $notify, $filter, $timeout, $location, $bootstrap, $dialog) {


			function notify(response) {
					
				var error = build(response);
					
				var resolverScope = function () {
					var scope = $rootScope.$new();
					scope.error = error;
							
					scope.openStackTrace = function () {
						stacktrace(scope.error.stackTrace);
					};
					
					return scope;
				};
					
				var dialog = $dialog.dialog({template: $bootstrap.isReady() ? templateReady : template, resolve: {$scope: resolverScope}});
				dialog.open();
			}
			
			
			function redirect(response) {
				actualError = build(response);
				$location.path('/error');
			}
			
			function stacktrace(stack) {
				var scope = $rootScope.$new();
				scope.lines = [];
				
				var array = stack.split(new RegExp('\n', 'g'));
				angular.forEach(array, function (value, index) {
					scope.lines.push({id: index, line: value});
				});
										
				var resolverScope = function () {
					return scope;
				};

				var dialog = $dialog.dialog({template: templateStackTrace, resolve: {$scope: resolverScope}});
				dialog.open();
			}

			return {

			    notify: function () {
				    return notify;
			    },
			 
			    redirect: function () {
				    return redirect;
			    },
			    
			    stacktrace: function (stack) {
				    return stacktrace(stack);
			    },

			    get: function () {
				    var value = actualError;
				    actualError = null;
				    return value;
			    }
			  };
		};

	});
	
	

});
