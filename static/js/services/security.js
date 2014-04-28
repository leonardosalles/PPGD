define(['services/services'], function (services) {
	'use strict';
	
	services.service('$security', function ($rootScope) {
		
		var roles = {};
		
		this.addRole = function () {
			
			for (var i = 0; i < arguments.length; i++) {
				if (angular.isArray(arguments[i])) {
					this.addRole.apply(this, arguments[i]);
				
				} else if (!roles[arguments[i]]) {
					roles[arguments[i]] = true;
				}
			}
			
		};
		
		this.removeRole = function () {
			
			for (var i = 0; i < arguments.length; i++) {
				
				if (angular.isArray(arguments[i])) {
					this.removeRole.apply(this, arguments[i]);
					
				} else if (roles[arguments[i]]) {
					delete roles[arguments[i]];
				}
			}
		};
		
		
		this.hasRole = function () {
		
			for (var i = 0; i < arguments.length; i++) {
				if (angular.isArray(arguments[i]) && this.hasRole.apply(this, arguments[i])) {
					return true;
					
				} else if (angular.isArray(arguments[i]) === false && roles[arguments[i]]) {
					return true;
				}
			}
			
			return false;
		};
		
		
		$rootScope.hasRole = this.hasRole;
	});
	
	
	services.run(function ($rootScope, $q, $location, $route, $security) {
		
		angular.forEach($route.routes, function (route) {
			if (route.redirectTo || !route.rolesAllowed) { return; }
			
			route.resolve =  angular.extend({auth: function () {
				var defer = $q.defer();
				if ($security.hasRole(route.rolesAllowed)) {
					defer.resolve();
				} else {
					defer.reject();
				}
				return defer.promise;
		        
			}}, route.resolve);
		});
		
		$rootScope.$on('$routeChangeError', function () {
			$location.path('/error403').replace();
		});
		
	});
	
});