'use strict';

angular.module('petStoreApp')
	.component('pets', {
		templateUrl: 'scripts/pets/pets.html',
    	controller: PetsController,
    	bindings: { $router: '<' }
	});

	function PetsController(UtilsApi,MSG){
		var NOT_FOUND_MSG = MSG.NOT_FOUND_MSG,
			SERVER_DOWN_MSG = MSG.SERVER_DOWN_MSG;

		this.$onInit = function(){
			_getPetList.call(this);
		}

		function _getPetList(){
			UtilsApi.getPetsList().then(
				_successCB_getPetList.bind(this),
				_errorCB_getPetList.bind(this)
			);
		}

		function _successCB_getPetList(response){
			this.pets = response;
			if(!this.pets || this.pets.length == 0){
				this.errorMsg = NOT_FOUND_MSG;
			}
		}

		function _errorCB_getPetList(response){
			this.errorMsg = SERVER_DOWN_MSG;
		}
	}