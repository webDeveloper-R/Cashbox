'use strict';

describe('Controller: SearchPropertyCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendv1App'));

  var SearchPropertyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchPropertyCtrl = $controller('SearchPropertyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
