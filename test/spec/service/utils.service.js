describe('Service: Utils', function() {
  var utilsService,
      spy,
      showFn = { show : function(){}, hide : function(){} },
      fakeElement = function(){ return showFn };

  beforeEach(angular.mock.module('petStoreApp'));

  beforeEach(inject(function(_UtilsService_) {
    utilsService = _UtilsService_;
    spy = spyOn(angular, 'element').and.callFake(fakeElement);
  }));


  afterEach(function() {
    spy.and.callThrough();  
  });

  it('should exist', function() {
    expect(utilsService).toBeDefined();
    expect(utilsService.show).toBeDefined();
    expect(utilsService.hide).toBeDefined();
    expect(utilsService.isNumber).toBeDefined();
  });

  it('should show spinner', function() {
    spyOn(showFn, 'show');
    
    utilsService.show();
    
    expect(angular.element).toHaveBeenCalledWith('#full-screen-spinner');
    
    expect(showFn.show).toHaveBeenCalled();
  });

  it('should hide spinner', function() {
    spyOn(showFn, 'hide');
    
    utilsService.hide();
    
    expect(angular.element).toHaveBeenCalledWith('#full-screen-spinner');
    
    expect(showFn.hide).toHaveBeenCalled();
  });

  it('should return false when pass string+number to isNumber fn', function(){
    var result = utilsService.isNumber("abc");
    expect(result).toBe(false);
    var result = utilsService.isNumber("a12");
    expect(result).toBe(false);
  });

  it('should return false when pass empty to isNumber fn', function(){
    var result = utilsService.isNumber("");
    expect(result).toBe(false);
  });

  it('should return ture when pass number to isNumber fn', function(){
    var result = utilsService.isNumber(123);
    expect(result).toBe(true);
    var result = utilsService.isNumber('123');
    expect(result).toBe(true);
  });

});