

angular.module('frontendv1App').controller('CustomSearchModalCtrl', function ($scope, $uibModalInstance, $location, constants, person) {

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
     * SCOPE VARIABLES
     */
    $scope.states = constants.STATES;

    $scope.person = person;

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
    		$uibModalInstance.close();
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
        if (pField.value.length <= 1) {
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

    var init = function() {
    	/*if (Object.keys($location.search()).length!==0) {
        	$scope.person.firstname.value = $location.search().firstname;
        	$scope.person.lastname.value = $location.search().lastname;
        	$scope.person.state.value = $location.search().state;
        }*/
    };

    init();
});