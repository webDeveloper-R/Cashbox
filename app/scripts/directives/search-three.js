'use strict';

/**
 * @ngdoc directive
 * @name frontendv1App.directive:searchThree
 * @description
 * # searchThree
 */
angular.module('frontendv1App')
  .directive('searchThree', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/search-3.html',
        controller: 'Search3Ctrl',
        scope: {
        }
    };
  });
