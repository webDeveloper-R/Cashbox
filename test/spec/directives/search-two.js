'use strict';

describe('Directive: searchTwo', function () {

  // load the directive's module
  beforeEach(module('frontendv1App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<search-two></search-two>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the searchTwo directive');
  }));
});
