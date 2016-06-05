'use strict';

/**
 * @ngdoc directive
 * @name frontendv1App.directive:searchTwo
 * @description
 * # searchTwo
 */
angular.module('frontendv1App')
  .directive('searchTwo', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/search-2.html',
        controller: 'Search2Ctrl',
        scope: {
        }
    };
  });
