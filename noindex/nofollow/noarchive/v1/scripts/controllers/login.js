'use strict';

/**
 * @ngdoc function
 * @name frontendv1App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the frontendv1App
 */
angular.module('frontendv1App')
  .controller('LoginCtrl', function ($scope) {
    /**
     * CONSTANTS
     */
    var INVALID_EMAIL = 'Invalid email value';
    var PASSWORD_REQUIRED = 'Password field is required';
    
    /**
     * SCOPE VARIABLES
     */
    $scope.user = {
        email: {},
        password: {}
    };

    /**
     * SCOPE functions
     */
    $scope.login = function () {
        cleanErrors();
        if (validateFields()) {
            console.log('Next step');
        }
    };

    /**
     * Private functions
     */
    var cleanErrors = function () {
        $scope.user.email.error = undefined;
        $scope.user.password.error = undefined;
    };

    var validateFields = function () {
        var isValid = true;
        if (!$scope.user.email.value) {
            $scope.user.email.error = INVALID_EMAIL;
            isValid = false;
        }
        if (!$scope.user.password.value) {
            $scope.user.password.error = PASSWORD_REQUIRED;
            isValid = false;
        }
        return isValid;
    };

    var init = function () {
        
    };

    init();
  });
