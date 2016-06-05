'use strict';

/**
 * @ngdoc directive
 * @name frontendv1App.directive:ngEnter
 * @description
 * # ngEnter
 */
angular.module('frontendv1App')
  .directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
          //Enter key
          if(event.which === 13) {
            scope.$apply(function (){
              scope.$eval(attrs.ngEnter);
            });
            event.preventDefault();
          }
        });
      };
  });
