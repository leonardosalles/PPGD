define(['services/services'], function (services) {
	'use strict';
	
	services.provider('$webstorage', function () {
		
		var prefix = 'ppgdcore.';
		
		
		this.setPrefix = function (value) {
			prefix = value;
		};
		
		
		this.$get = function ($notify) {
							
			function addToLocal(key, value) {
				try { localStorage.setItem(prefix + key, JSON.stringify(value)); } catch (e) { return croak(e); }
				return true;
			}
		
			function addToSession(key, value) {
				try { sessionStorage.setItem(prefix + key, JSON.stringify(value)); } catch (e) { return croak(e); }
				return true;
			}
		
			function getFromLocal(key) {
				try {
					var value = localStorage.getItem(prefix + key);
					return value && JSON.parse(value);
				} catch (e) { return croak(e); }
			}
		
			function getFromSession(key) {
				try {
					var value = sessionStorage.getItem(prefix + key);
					return value && JSON.parse(value);
				} catch (e) { return croak(e); }
			}
		
			function removeFromLocal(key) {
				try { localStorage.removeItem(prefix + key); } catch (e) { return croak(e); }
				return true;
			}
		
			function removeFromSession(key) {
				try { sessionStorage.removeItem(prefix + key); } catch (e) { return croak(e); }
				return true;
			}
		

			
			function clearLocal() {
				var prefixLength = prefix.length;
				try {
					for (var key in localStorage) {
						if (key.substr(0, prefixLength) === prefix) {
							localStorage.removeItem(key);
						}
					}
				} catch (e) { return croak(e); }
				return true;
			}
		

			function clearSession() {
				var prefixLength = prefix.length;
				try {
					for (var key in sessionStorage) {
						if (key.substr(0, prefixLength) === prefix) {
							sessionStorage.removeItem(key);
						}
					}
				
				} catch (e) { return croak(e); }
				return true;
			}
		
			function croak(error) {
				$notify.error(error.title + ': ' + error.message);
				return false;
			}
			
			return {
				local: {
					add: addToLocal,
					get: getFromLocal,
					remove: removeFromLocal,
					clear: clearLocal
				},
				
				session: {
					add: addToSession,
					get: getFromSession,
					remove: removeFromSession,
					clear: clearSession
				}
			};
		};

	});

});


