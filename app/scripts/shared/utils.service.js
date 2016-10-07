'use strict';

angular.module('petStoreApp')
		.service('UtilsService', [UtilsService]);

		function UtilsService() {
			this.show = function() {
				angular.element('#full-screen-spinner').show();
			};

			this.hide = function(){
				angular.element('#full-screen-spinner').hide();	
			};

			this.isNumber = function(n) {
				return !isNaN(parseFloat(n)) && isFinite(n);
			}

		}