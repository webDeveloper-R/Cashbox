'use strict';

/**
 * @ngdoc directive
 * @name frontendv1App.directive:searchBar
 * @description
 * # searchBar
 */
angular.module('frontendv1App')
  .directive('searchBar', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/common/search-bar.html',
        controller: 'SearchBarController',
        scope: {
            //person: '='
        }
    };
  });
