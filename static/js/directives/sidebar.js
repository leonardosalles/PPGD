define(['directives/directives', 'text!../../views/core/sidebar.html'], function (directives, template) {
	'use strict';
	
	directives.directive('spaSidebar', function ($window,  $location, $webstorage) {
		
		var buildTemplate = function (items, ul) {
			if (!ul) {
				ul = ['<ul class="nav nav-list">', '</ul>'];
			}
			
			angular.forEach(items, function (item, index) {
				var li = '<li ';

				if (item.group) {
					li += 'class="nav-group" ';
					
				} else if (item.submenu && item.submenu.length > 0) {
					li += 'class="nav-header" ';
					
				} else if (item.submenu && item.submenu.length === 0) {
					li += 'class="nav-simple" ';
				}

				li += '>' + '<a ' + ((!item.submenu || item.submenu.length === 0) && item.href ? ' href="' + item.href + '"' : '') + '">' + (item.text || '') + '</a>';
				if (item.submenu && item.submenu.length) {
					li += buildTemplate(item.submenu).join('\n');
				}
		        
				li += '</li>';
				ul.splice(index + 1, 0, li);
			});

			return ul;
		};
		
		    
		return {
			restrict: 'A',
			replace: true,
			template: template,
			scope: true,
			
			link: function ($scope, element, attr) {
				
				var routeChangeSuccess = function () {
					var li = element.find('ul').find('a[href="#' + $location.path() + '"]').parent();
					if (li) {
						li.addClass('active open').parents('li').addClass('open').siblings().removeClass('open').find('li').removeClass('open');
						li.siblings().removeClass('open').find('li').removeClass('open');
					}
					 
					if ($scope.auto) {
						$('body').addClass('sidebar-close').removeClass('sidebar-open');
					}
				};
				
				$scope.$watchCollection(attr.spaSidebar, function () {
					var items = $scope.$eval(attr.spaSidebar);
					 
					var accordion = angular.element(buildTemplate(items).join(''));
					element.find('> ul').remove();
					 
					element.prepend(accordion);
					accordion.bind('li.nav-header > a').click(function (e) {
						$(e.target).parent().toggleClass('open');
						 
						if ($(e.target).parent().hasClass('open') === false) {
							$(e.target).parent().find('li').removeClass('open');
						}
					});
					 
					routeChangeSuccess();
				});
				 
				 
				$scope.$on('$routeChangeStart', function () {
					element.find('ul').find('li.active').removeClass('active');
				});
				 
				 
				$scope.$on('$routeChangeSuccess', routeChangeSuccess);
				
				$scope.auto = $webstorage.local.get('spa.sidebar.auto');
									 
				if ($scope.auto) {
					$('body').addClass('sidebar-close').removeClass('sidebar-open');
				} else {
					$('body').removeClass('sidebar-close').addClass('sidebar-open');
				}
				 
				$scope.storage = function () {
					$webstorage.local.add('spa.sidebar.auto',  $scope.auto);
				};
			}
		};
	});
});