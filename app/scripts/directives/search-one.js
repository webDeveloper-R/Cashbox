'use strict';

/**
 * @ngdoc directive
 * @name frontendv1App.directive:serachOne
 * @description
 * # serachOne
 */
angular.module('frontendv1App')
  .directive('searchOne', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/search-1.html',
        controller: 'Search1Ctrl',
        scope: {
        }
    };
  });
