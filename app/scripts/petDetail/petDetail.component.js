'use strict';

angular.module('petStoreApp')
	.component('petDetail', {
		templateUrl: 'scripts/petDetail/petDetail.html',
    	controller: PetDetailController,
    	bindings: { $router: '<' }
	});

	function PetDetailController(UtilsApi, $interval, MSG){
		var _petId,
			interval,
			NOT_FOUND_MSG = MSG.NOT_FOUND_MSG,
			SERVER_DOWN_MSG = MSG.SERVER_DOWN_MSG,
			SUCCESS_DELETE_MSG = MSG.SUCCESS_DELETE_MSG,
			DELETE_COMFIRMATION_MSG = MSG.DELETE_COMFIRMATION_MSG;

		this.$onInit = function(){
			
		}

		this.$onDestroy = function(){
			if(interval){
				$interval.cancel(interval);	
			}
		}

		this.$routerOnActivate = function(next) {
		
			_petId = next.params.id;
			
			if(!_petId){
				this.errorMsg = NOT_FOUND_MSG;
			}else{
				_getPetById.call(this, _petId);	
			}
			
		};

		this.deletePet = function(petId){
			if(window.confirm(DELETE_COMFIRMATION_MSG)){
				_deletePetById.call(this,petId);
			}
		}

		//Delete Pet By Id
		function _deletePetById(petId){
			this.errorMsg="";
			UtilsApi.deletePetById(petId).then(
				_successCB_deletePetById.bind(this),
				_errorCB_deletePetById.bind(this)
			);
		}

		function _successCB_deletePetById(response){
			
			this.countDown = 5;
			
			this.successMsg = SUCCESS_DELETE_MSG;

			interval = $interval(function(){
				this.countDown -= 1;
				
				if(this.countDown <= 0){
					$interval.cancel(interval);
					this.$router.navigate(['Pets']);
				}

			}.bind(this),1000);
			
		}

		function _errorCB_deletePetById(response){
			this.errorMsg = SERVER_DOWN_MSG;
		}

		//Get Pet By Id
		function _getPetById(petId){
			this.errorMsg="";
			UtilsApi.getPetById(petId).then(
				_successCB_getPetById.bind(this),
				_errorCB_getPetById.bind(this)
			);
		}

		function _successCB_getPetById(response){
			this.pet = response;
		}

		function _errorCB_getPetById(response){
			if(response.status == 404){
				this.errorMsg = NOT_FOUND_MSG;
			}else{
				this.errorMsg = SERVER_DOWN_MSG;	
			}
			
		}
	}