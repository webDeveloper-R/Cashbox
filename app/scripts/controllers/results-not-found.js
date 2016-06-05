'use strict';

/**
 * @ngdoc function
 * @name frontendv1App.controller:ResultsNotFoundCtrl
 * @description
 * # ResultsNotFoundCtrl
 * Controller of the frontendv1App
 */
angular.module('frontendv1App')
  .controller('ResultsNotFoundCtrl', function ($scope, $location, $uibModal, persons, constants) {
    
    /**
     * CONSTANTS
     */
    var SELECT_STATE_TEXT = 'Select State';
    var REGULAR_EXP_TEXT = /^[a-zA-Z\u00C0-\u017F'-]+$/;
    var MIN_LETTERS = 1;

    var FIRST_NAME_REQUIRED = 'First name is required';
    var LAST_NAME_REQUIRED = 'Last name is required';
    var FIRST_NAME_ONLY_LETTERS = 'First name must contain only letters';
    var LAST_NAME_ONLY_LETTERS = 'Last name must contain only letters';
    var STATE_INVALID = 'Select one state';

    var ENTER_FIRST_NAME = 'Enter a First Name to begin';
    var MIN_LETTERS_INVALID = 'The field must contain more than one letter';

    /**
     * Private variables
     */

   /**
     * SCOPE VARIABLES
     */
    $scope.states = constants.STATES;
    $scope.person = {
      firstname: {},
      middlename: {},
      lastname: {},
      age: {},
      city: {},
    	state: {
        value: SELECT_STATE_TEXT
      }
    };
    $scope.resultName = '';
    $scope.errors = [];

    /**
     * scope functions
     */
    $scope.isEmptyFN = function () {
        if (!$scope.person.firstname.value) {
            $scope.person.firstname.error = ENTER_FIRST_NAME;
        } else {
            $scope.person.firstname.error = undefined;
        }
    };

    $scope.validateLN = function () {
        if ($scope.person.lastname.value) {
            $scope.person.lastname.error = undefined;
            checkMinLetters($scope.person.lastname);
        }
    };

    $scope.search = function () {
        cleanErrors();
    	if (validateFields()) {
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
        $scope.person.firstname.error = undefined;
        $scope.person.lastname.error = undefined;
        $scope.person.state.error = undefined;
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
        if($scope.person.state.value===SELECT_STATE_TEXT) {
            isValid = false;
            $scope.person.state.error = STATE_INVALID;
        }
        return isValid;
    };
    

    /**
     * Private functions
     */
    

    var init = function() {
        var allResults;

    	$scope.person.firstname.value = $location.search().firstname;
    	$scope.person.middlename.value = $location.search().middlename;
    	$scope.person.lastname.value = $location.search().lastname;
    	$scope.person.age.value = $location.search().age;
    	$scope.person.city.value = $location.search().city;
    	$scope.person.state.value = $location.search().state;

      	$scope.resultName = $scope.person.firstname.value + ' ' + $scope.person.lastname.value;

        allResults = persons.getAllResults();

        if((allResults)&&(allResults.data===undefined)) {
            $scope.errors = allResults;
        }
    };

    init();
  });
