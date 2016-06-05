'use strict';

/**
 * @ngdoc function
 * @name frontendv1App.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the frontendv1App
 */
angular.module('frontendv1App')
  .controller('CheckoutCtrl', function ($scope, $location) {
    /**
     * CONSTANTS
     */
    $scope.PACKAGES = [{
        'title': 'Recommended',
        'subtitle': '1 month of Unlimiyed Reports',
        'price': '$22.95/mo',
        'selected': true
    },{
        'title': 'Recommended',
        'subtitle': '1 month of Unlimiyed Reports',
        'price': '$22.95/mo',
        'selected': false
    },{
        'title': 'Recommended',
        'subtitle': '1 month of Unlimiyed Reports',
        'price': '$22.95/mo',
        'selected': false
    }];

    /**
     * SCOPE VARIABLES
     */
    $scope.person = {};

    /**
     * SCOPE FUNCTIONS
     */
    $scope.selectPackage = function(pPackage) {
        cleanSelectedPackage();
        pPackage.selected = true;
    };

    /**
     * PRIVATE FUNCTIONS
     */
    var cleanSelectedPackage = function() {
        $scope.PACKAGES.forEach(function(pPackage) {
            pPackage.selected = false;
        });
    };

    var init = function() {
    	$scope.person.name = $location.search().name;
        $scope.person.age = $location.search().age;
        $scope.person.location = $location.search().location;
    };

    init();
  });
