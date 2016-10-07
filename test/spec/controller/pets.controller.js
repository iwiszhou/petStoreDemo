describe('Controller: PetsController', function() {
  var $controller, PetsController, UtilsApi, deferred, MSG;

  beforeEach(angular.mock.module('petStoreApp'));

  beforeEach(inject(function(_$rootScope_, _$componentController_, _$q_, _UtilsApi_, _MSG_) {
    $controller = _$componentController_;

    MSG = _MSG_;

    scope = _$rootScope_.$new();

    deferred = _$q_.defer();

    UtilsApi = _UtilsApi_;

    spyOn(UtilsApi, 'getPetsList').and.returnValue(deferred.promise);

    PetsController = $controller("pets", {$scope: scope, UtilsApi:UtilsApi});

  }));

  it('should be defined', function() {
    expect(PetsController).toBeDefined();
  });

  it('should be invoked getPetList fn', function() {
    PetsController.$onInit();
    expect(UtilsApi.getPetsList).toBeDefined();
  });

  it('should resolve promise with data', function() {
    PetsController.$onInit();
    deferred.resolve( [ {name: 'pet1'}, {name: 'pet2'} ] );
    
    scope.$apply();
    
    expect(PetsController.pets).toBeDefined();
    expect(PetsController.pets[0].name).toBe("pet1");
    expect(PetsController.pets[1].name).toBe("pet2");
  });

  it('should resolve promise with empty', function() {
    PetsController.$onInit();
    deferred.resolve();
    
    scope.$apply();
    
    expect(PetsController.pets).not.toBeDefined();
    expect(PetsController.errorMsg).toBe(MSG.NOT_FOUND_MSG);
  });

  it('should reject promise', function () {
    PetsController.$onInit();
    deferred.reject();
    
    scope.$apply();

    expect(PetsController.pets).toBe(undefined);
    expect(PetsController.errorMsg).toBe(MSG.SERVER_DOWN_MSG);
  });

});