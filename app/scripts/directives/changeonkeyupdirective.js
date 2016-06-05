'use strict';

/**
 * @ngdoc directive
 * @name frontendv1App.directive:changeOnKeyupDirective
 * @description
 * # changeOnKeyupDirective
 */
angular.module('frontendv1App')
  .directive('changeOnKeyup', function() {
	  return function changeOnKeyupPostLink(scope, elem) {
	    elem.on('keyup', elem.triggerHandler.bind(elem, 'change'));
	  };
  });
