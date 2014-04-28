define([ 'directives/directives' ], function (directives) {
	'use strict';

	directives.directive('spaDuallistbox', function () {
		return {
			restrict: 'AE',
			require: '?ngModel',

			link: function (scope, element, attr) {

				var opts = angular.extend({
					preserveselectiononmove: 'moved',
					moveonselect: false,
					showfilterinputs: false,
					infotextempty: '',
					infotext: '',
					selectorminimalheight: 150
				}, scope.$eval(attr.spaDuallistbox));

				$(element).bootstrapDualListbox(opts);
			}

		};
	});
});