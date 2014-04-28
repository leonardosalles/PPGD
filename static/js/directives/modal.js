define(['directives/directives'], function (directives) {
	'use strict';

	directives.directive('spaModal', function ($parse) {
		return {
			restrict: 'A',
			
			
			
			link: function (scope, element, attrs) {
				
				var setClosed = function () {
					scope.$apply(function () {
						$parse(attrs.spaModalClose)(scope);
					});
				};
		        
				scope.$watch(attrs.spaModal, function () {


					var controlClose = $('<div class="control-close"></div>');
					if (!attrs.keyboard || attrs.keyboard === 'true') {
						controlClose.append($('<span>' + I18n.t('spa.modalEsc') + '</span>'));
					}

					if (!attrs.backdrop || attrs.backdrop !== 'static') {
						controlClose.append($('<button type="button" class="close" data-dismiss="modal">&times;</button>'));
					}

					if (element.find('.modal-header').length === 1) {
						element.find('.modal-header').find('.control-close').remove();
						element.find('.modal-header').prepend(controlClose);
					}


					var show = scope.$eval(attrs.spaModal);
					var modal = element.data('modal');

					if (show && modal) {
						element.modal('show');

					} else if (show) {
						element.modal({show: true});

					} else if (modal) {
						element.modal('hide');
					}
				});

				element.on('hide', function (e) {
					if (e.currentTarget !== e.target) { return; }

					var show = scope.$eval(attrs.spaModal);
					if (!show) { return; }

					setClosed();
					e.stopPropagation();
					return false;
				});

				scope.$on('$destroy', function () {
					var modal = element.data('modal');
					if (modal && modal.isShown) { $('body').modalmanager('destroyModal', modal); }
				});
			}
		};
	});
});