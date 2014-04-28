define(['directives/directives'], function (directives) {
	'use strict';
	
	directives.directive('spaTablesorter', function () {
		return {
			restrict: 'A',

			link: function (scope, element, attr) {
				var opts = angular.extend({}, scope.$eval(attr.spaTablesorter));
				
				$(element).tablesorter(opts);
				 
				$(element).bind('sortEnd', function () {
					var sorting = [];
					for (var i = 0; i < this.config.sortList.length; i++) {
						var sort = this.config.sortList[i];
						var header = this.config.headerList[sort[0]];

						var type = sort[1] === 0 ? '+' : '-';
						sorting.push(type + $(header).metadata().id);
					}
					  
					scope.$apply(function () {
						if (!opts.pager) { return; }
	
						opts.pager.sorting = sorting;
						opts.pager.reload();
					});
				});
			}
		};
	});
	
});