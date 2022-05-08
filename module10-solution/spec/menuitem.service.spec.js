describe('MenuService getMenuItem test', function () {

  var menuService;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should find favorite menu item', function() {
    var favorite = 'L4';

    $httpBackend.whenGET(ApiPath + '/menu_items/' + favorite + '.json').respond(['Kung Pao Chicken']);

    menuService.getMenuItem(favorite).then(function(response) {
      expect(response).toEqual(['Kung Pao Chicken']);
    });

    $httpBackend.flush();
  });

});
