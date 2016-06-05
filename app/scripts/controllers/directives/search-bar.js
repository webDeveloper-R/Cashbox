'use strict';

/**
 * @ngdoc function
 * @name frontendv1App.controller:HeaderController
 * @description
 * # MainCtrl
 * Controller of the frontendv1App
 */
angular.module('frontendv1App')
  .controller('SearchBarController', function ($scope, $location, $uibModal, constants) {
    /**
     * CONSTANTS
     */
    var REGULAR_EXP_TEXT = /^[a-zA-Z\u00C0-\u017F'-]+$/;
    var MIN_LETTERS = 1;

    var FIRST_NAME_REQUIRED = 'First name is required';
    var LAST_NAME_REQUIRED = 'Last name is required';
    var FIRST_NAME_ONLY_LETTERS = 'First name must contain only letters';
    var LAST_NAME_ONLY_LETTERS = 'Last name must contain only letters';
    
    var ENTER_FIRST_NAME = 'Enter a First Name to begin';
    var MIN_LETTERS_INVALID = 'The field must contain more than one letter';

    /**
     * SCOPE VARIABLES
     */
    $scope.states = constants.STATES;
    $scope.bigButton = true;
    $scope.isHomePage = false;

    $scope.person = {
        firstname: {},
        middlename: {},
        lastname: {},
        age: {},
        city: {},
        state: {
            value: constants.STATES.ALL
        }
    };

    /**
     * scope functions
     */
    $scope.isEmptyFN = function () {
        if (!$scope.person.firstname.value) {
            $scope.person.firstname.error = ENTER_FIRST_NAME;
        } else {
            $scope.person.firstname.error = '';
        }
    };

    $scope.validateLN = function () {
        if ($scope.person.lastname.value) {
            $scope.person.lastname.error = '';
            checkMinLetters($scope.person.lastname);
        }
    };

    $scope.search = function () {
        console.log($scope.person);
        cleanErrors();
        if (validateFields()) {
            $scope.$emit('newSearch', true);

            $location.path('/search').search({
                firstname: $scope.person.firstname.value,
                middlename: $scope.person.middlename.value,
                lastname: $scope.person.lastname.value,
                age: $scope.person.age.value,
                city: $scope.person.city.value,
                state: $scope.person.state.value
            });
        }
    };

    /**
     * Private functions
     */
    var cleanErrors = function () {
        $scope.person.firstname.error = '';
        $scope.person.lastname.error = '';
        $scope.person.state.error = '';
    };

    var checkMinLetters = function (pField) {
        if (pField.value.length <= MIN_LETTERS) {
            pField.error = MIN_LETTERS_INVALID;
            return false;
        }
        return true;
    };

    var validateFields = function () {
        var isValid = true;
        if (!$scope.person.firstname.value) {
            isValid = false;
            $scope.person.firstname.error = FIRST_NAME_REQUIRED;
        } else {
            if (checkMinLetters($scope.person.firstname)) {
                if (!REGULAR_EXP_TEXT.test($scope.person.firstname.value)) {
                    isValid = false;
                    $scope.person.firstname.error = FIRST_NAME_ONLY_LETTERS;
                }
            } else {
                isValid = false;
            }
        }
        if(!$scope.person.lastname.value) {
            isValid = false;
            $scope.person.lastname.error = LAST_NAME_REQUIRED;
        } else {
            if (checkMinLetters($scope.person.lastname)) {
                if(!REGULAR_EXP_TEXT.test($scope.person.lastname.value)) {
                    isValid = false;
                    $scope.person.lastname.error = LAST_NAME_ONLY_LETTERS;
                }
            } else {
                isValid = false;
            }
        }
        return isValid;
    };

    var init = function() {
        if (Object.keys($location.search()).length!==0) {
            $scope.person.firstname.value = $location.search().firstname;
            $scope.person.middlename.value = $location.search().middlename;
            $scope.person.lastname.value = $location.search().lastname;
            $scope.person.age.value = $location.search().age;
            $scope.person.city.value = $location.search().city;
            $scope.person.state.value = $location.search().state;
        }

        if ($location.path()==='/results') {
            $scope.bigButton = false;
        }

        if ($location.path()==='/') {
            $scope.isHomePage = true;
        }
    };

    init();
  });