define(['services/services'], function (services) {
	'use strict';
	
	services.provider('$dialog', function () {

		this.$get = function ($timeout, $compile, $rootScope, $controller, $injector, $q) {

			function Dialog(opts) {
				this.options = opts;
			}
		   
			Dialog.prototype.open = function () {
				var self = this;
				
				
				this._loadResolves().then(function (locals) {
					var $scope = locals.$scope = locals.$scope ? locals.$scope : $rootScope.$new();
	
					var modalEl = angular.element('<div>');
					modalEl.html(self.options.template);
					
					
					if (self.options.controller) {
						var ctrl = $controller(self.options.controller, locals);
						modalEl.children().data('ngControllerController', ctrl);
					}
					
					var $modal = $compile(modalEl)($scope).find('.modal');
					
					
					var controlClose = $('<div class="control-close"></div>');
					if (!$modal.attr('data-keyboard') || $modal.attr('data-keyboard') === 'true') {
						controlClose.append($('<span>' + I18n.t('spa.modalEsc') + '</span>'));
					}

					if (!$modal.attr('data-backdrop') || $modal.attr('data-backdrop') !== 'static') {
						controlClose.append($('<button type="button" class="close" data-dismiss="modal">&times;</button>'));
					}

					if ($modal.find('.modal-header').length === 1) {
						$modal.find('.modal-header').find('.control-close').remove();
						$modal.find('.modal-header').prepend(controlClose);
					}
					
					
					$scope.options = self.options;
	
					$scope.resolve = function (result) {
						self.deferred.resolve(result);
						self.deferred = null;
						$modal.modal('hide');
					};
	
					$scope.$on('$destroy', function () {
						$modal.remove();
					});
					
					$scope.$on('$locationChangeSuccess', function () {
						$modal.modal('hide');
					});
	
					$modal.on('hidden', function (event) {
						if (event.target !== $modal[0]) {
							return;
						}
						
						$scope.$apply(function () {
							if (self.deferred) {
								self.deferred.reject();
							}
							$scope.$destroy();
						});
						
					});
	
					$modal.modal('show');
					
				});
				
				this.deferred = $q.defer();
				return this.deferred.promise;
			};
		    
			
			Dialog.prototype._loadResolves = function () {
				var values = [];
				var keys = [];

				angular.forEach(this.options.resolve || [], function (value, key) {
					keys.push(key);
					values.push(angular.isString(value) ? $injector.get(value) : $injector.invoke(value));
				});

				return $q.all(values).then(function (values) {
					var locals = {};
					angular.forEach(values, function (value, index) {
						locals[keys[index]] = value;
					});
					return locals;
				});
			};

			return {
				dialog: function (opts) {
					return new Dialog(opts);
				}
			};
		};
		
	});
	
});