'use strict';

describe('Directive: searchFour', function () {

  // load the directive's module
  beforeEach(module('frontendv1App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<search-four></search-four>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the searchFour directive');
  }));
});
