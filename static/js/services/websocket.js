define(['services/services'], function (services) {
	'use strict';
	
	services.factory('$websocket', function ($rootScope, $log) {

		var debug = false;
		var connection = null;
		
		function log(msg) {
			if (debug) {
				$log.debug('websocket DEBUG: ' + msg);
			}
		}
		
		function broadcast(event, response) {
			var data = response.responseBody;
			log('data received: ' + data);
			if (typeof data === 'string' && data) {
				data = angular.fromJson(data);
				response.json = data;
			}
			event = 'websocket:' + event;
			log('broadcasting event: ' + event);
			$rootScope.$broadcast(event, response);
		}
		
		return {
			init: function (url) {
				var request = {
					url : url,
					transport : 'sse',
					contentType : 'application/json',
					logLevel : (debug === true ? 'debug' : 'info'),
					trackMessageLength : true,
					reconnectInterval: 5000,
					fallbackTransport : 'long-polling'
				};
				
				request.onMessage = function (response) {
					log('received response from server');
					broadcast('onmessage', response);
				};
				
				request.onError = function (response) {
					log('WebSocket connection error');
					broadcast('onerror', response);
				};
				
				request.onOpen = function (response) {
					log('WebSocket connection opened');
					broadcast('onopen', response);
				};
				
				request.onTransportFailure = function (reason, request) {
					log('WebSocket transport failure');
					broadcast('ontransportfailure', request);
				};
				
				request.onReconnect = function (response) {
					log('WebSocket reconnected');
					broadcast('onreconnect', response);
				};
				
				request.onMessagePublished = function (response) {
					log('WebSocket message published');
					broadcast('onmessagepublished', response);
				};
				
				request.onClose = function (response) {
					log('WebSocket OnClose');
					broadcast('onclose', response);
				};
				
				connection = $.atmosphere.subscribe(request);
				log('connection made to: ' + connection.getUrl());
			},
			
			isOpen: function () {
				return connection !== null;
			},
			
			close : function () {
				connection.close();
				$.atmosphere.unsubscribe();
				connection = null;
			},
			
			push: function (msg) {
				log('sending data');
				connection.push(angular.toJson(msg));
			},
			
			debug: function (enable) {
				debug = enable;
			}
		};

	});

});
