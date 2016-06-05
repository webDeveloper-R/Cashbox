'use strict';

/**
 * @ngdoc function
 * @name frontendv1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendv1App
 */
angular.module('frontendv1App').controller('MainCtrl', function ($scope) {
    /**
     * CONSTANTS
     */
    
    /**
     * SCOPE VARIABLES
     */
    $scope.rate = 3;
    $scope.max = 3;
    $scope.isReadonly = true;
    

    /**
     * Private functions
     */

    var init = function () {
        
    };

    init();
});
