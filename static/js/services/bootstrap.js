define(['services/services'], function (services) {
	'use strict';
	
	services.service('$bootstrap', function ($timeout, $rootScope, $route) {
	
		var ready = false;
		var progress = 0;
				
		this.isReady = function () {
			return ready;
		};

		this.ready = function () {
			ready = true;
			
			$timeout(function () {
				if (!$route.current) {
					$route.reload();
				}
				
				$rootScope.$broadcast('coreReady', true);
				
			}, 500);
		};
		
		this.getProgress = function () {
			return progress;
		};
		
		this.setProgress = function (value) {
			progress = value;
		};
	});
		
	services.run(function ($rootScope, $bootstrap) {
		
		$rootScope.$on('$locationChangeStart', function (event) {
			if (!$bootstrap.isReady()) {
				return event.preventDefault();
			}
		});
				
	});
	
	
	
	
});