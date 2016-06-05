'use strict';

describe('Controller: AboutUsCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendv1App'));

  var AboutUsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutUsCtrl = $controller('AboutUsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
