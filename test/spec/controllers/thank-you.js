'use strict';

describe('Controller: ThankYouCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendv1App'));

  var ThankYouCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ThankYouCtrl = $controller('ThankYouCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
