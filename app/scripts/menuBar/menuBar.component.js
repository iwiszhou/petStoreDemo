'use strict';

angular.module('petStoreApp')
	.component('menuBar', {
		templateUrl: 'scripts/menuBar/menuBar.html',
    	controller: MenuBarCtrl,
    	bindings: { $router: '<' }
	});

	function MenuBarCtrl($rootScope, UtilsService){

		this.$onInit = function(){

			//Mobile only
			angular.element(document).on('click','.navbar-collapse.in',function(e) {
				if( $(e.target).is('a') ) {
					$(this).collapse('hide');
				}
			});
		}

		//Mobile only
		this.toggleMenu = function(){
			angular.element('.navbar-collapse').collapse('hide');
		}

		this.$onDestroy = function(){

		}

		
		
	}
