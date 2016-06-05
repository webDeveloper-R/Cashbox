'use strict';

/**
 * @ngdoc function
 * @name frontendv1App.controller:FooterController
 * @description
 * # MainCtrl
 * Controller of the frontendv1App
 */
angular.module('frontendv1App')
  .controller('FooterController', function ($scope, $location) {
    $scope.display = $location.path()==='/404' ? false : true;
    $scope.isCollapsed = true;
  });