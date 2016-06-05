'use strict';

describe('Controller: ResultsNotFoundCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendv1App'));

  var ResultsNotFoundCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResultsNotFoundCtrl = $controller('ResultsNotFoundCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
