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
    $scope.login = function() {
    	$location.path('/login');
    };

    $scope.signUp = function() {
    	$location.path('/sign-up');
    };
  });