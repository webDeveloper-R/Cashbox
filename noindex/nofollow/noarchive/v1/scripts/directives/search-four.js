'use strict';

/**
 * @ngdoc directive
 * @name frontendv1App.directive:searchFour
 * @description
 * # searchFour
 */
angular.module('frontendv1App')
  .directive('searchFour', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/search-4.html',
        controller: 'Search4Ctrl',
        scope: {
        }
    };
  });
