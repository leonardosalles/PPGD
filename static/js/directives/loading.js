define(['directives/directives'], function (directives) {
	'use strict';
	
	directives.directive('ppgdLoading', function ($http, $filter) {
        
		return {
			restrict: 'A',
			replace: true,
			template: '<div class="body-loader">' +
						'<div class="body-loader-inner">' +
							'<p><i class="fa fa-spinner fa-spin-anim"></span></p>' +
							'<p><span class="loading-text">{{"spa.loading" | i18n}}</span></p>' +
						'</div>' +
					  '</div>',

			controller: function ($scope, $element) {
				
				$scope.$watchCollection(function () {
					return $http.pendingRequests;
				}, function () {
				
					var array = $filter('filter')($http.pendingRequests, function (request) {
						return (request.headers['ppgd-loading'] === undefined || request.headers['ppgd-loading']);
					});
					
					if (array.length > 0) {
						$element.addClass('active');
					} else {
						$element.removeClass('active');
					}
				}, true);
			}
		};
	});
});
