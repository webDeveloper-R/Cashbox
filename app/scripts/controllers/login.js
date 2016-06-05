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

    var URL_LOGIN = 'http://members.playclick.net/sign-in';
    
    /**
     * SCOPE VARIABLES
     */
    $scope.user = {
        email: {},
        password: {},
        persistent_login: {}
    };

    var postLogin = function(path, params, method) {
        method = method || 'post'; // Set method to post by default if not specified.

        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement('form');
        form.setAttribute('method', method);
        form.setAttribute('action', path);

        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                var hiddenField = document.createElement('input');
                hiddenField.setAttribute('type', 'hidden');
                hiddenField.setAttribute('name', key);
                hiddenField.setAttribute('value', params[key]);

                form.appendChild(hiddenField);
             }
        }

        document.body.appendChild(form);
        form.submit();
    };

    /**
     * SCOPE functions
     */
    $scope.login = function () {
        cleanErrors();
        if (validateFields()) {
          postLogin(URL_LOGIN, {
            login: $scope.user.email.value,
            password: $scope.user.password.value,
            persistent_login: $scope.user.persistent_login.value
          });
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
  });
