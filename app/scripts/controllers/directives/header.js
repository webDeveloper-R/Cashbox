'use strict';

/**
 * @ngdoc function
 * @name frontendv1App.controller:HeaderController
 * @description
 * # MainCtrl
 * Controller of the frontendv1App
 */
angular.module('frontendv1App')
  .controller('HeaderController', function ($scope, $location) {
    $scope.display = $location.path()==='/404' ? false : true;
  });