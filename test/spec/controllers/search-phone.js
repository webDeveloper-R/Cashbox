'use strict';

describe('Controller: SearchPhoneCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendv1App'));

  var SearchPhoneCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchPhoneCtrl = $controller('SearchPhoneCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
