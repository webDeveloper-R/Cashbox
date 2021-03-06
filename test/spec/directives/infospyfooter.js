'use strict';

describe('Directive: infoSpyFooter', function () {

  // load the directive's module
  beforeEach(module('frontendv1App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<info-spy-footer></info-spy-footer>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the infoSpyFooter directive');
  }));
});
