'use strict';

/**
 * @ngdoc function
 * @name frontendv1App.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the frontendv1App
 */
angular.module('frontendv1App')
  .controller('ContactCtrl', function ($scope, constants) {

  	/**
  	 * CONSTANTS
  	 */
  	var REQUIRED_FIELD = '* This field is required';

    /**
     * SCOPE VARIABLES
     */
    $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key='+constants.GoogleAPIKey;
    $scope.map = {
      position: '37.804595,-122.411395'
    };

    $scope.contact = {
    	firstname: {
    		required: true
    	},
    	lastname: {
    		required: true
    	},
    	email: {
    		required: true
    	},
    	question: {
    		required: true
    	}
    };

    /**
     * SCOPE Functions
     */
    $scope.submit = function () {
    	cleanErrors();
        if (validateFields()) {
        	var data = {};
        	for (var key in $scope.contact) {
        		data[key] = $scope.contact[key].value;
        	}

            console.log('Next step');
            console.log(data);
        }
    };

    /**
     * Private functions
     */
    var cleanErrors = function () {
    	for (var key in $scope.contact) {
    		$scope.contact[key].error = undefined;
    	}
    };

    var validateFields = function () {
        var isValid = true;

        for (var key in $scope.contact) {
    		if(($scope.contact[key].required) && (!$scope.contact[key].value)) {
    			$scope.contact[key].error = REQUIRED_FIELD;
    			isValid = false;
    		}
    	}

        return isValid;
    };
  });
