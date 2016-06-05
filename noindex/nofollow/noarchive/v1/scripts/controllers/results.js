'use strict';

/**
 * @ngdoc function
 * @name frontendv1App.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the frontendv1App
 */
angular.module('frontendv1App')
  .controller('ResultsCtrl', function ($scope, $location, $uibModal, persons) {
    
  	/**
     * CONSTANTS
     */
    var SELECT_STATE_TEXT = 'Select State';
    var FIRST_NAME_RESPONSE = 'first_name';
    var LAST_NAME_RESPONSE = 'last_name';
    var CURRENT_STEP = 0;

    var STEPS = [{
      templateUrl: '../../views/search-4.html',
      controller: 'Search4Ctrl'
    },{
      templateUrl: '../../views/search-5-modal.html',
      controller: 'Search5ModalCtrl'
    }];

    /**
     * SCOPE VARIABLES
     */
    $scope.person = {
      firstname: {},
      lastname: {},
    	state: {
        value: SELECT_STATE_TEXT
      }
    };
    $scope.results = [];
    $scope.resultName = '';

    /**
     * scope functions
     */
    $scope.getReport = function(pPerson) {
      persons.setPerson(pPerson);
      var modalInstance = $uibModal.open({
          templateUrl: '../../views/search-results-modal.html',
          controller: 'SearchResultsModalCtrl',
          size: 'lg',
          backdrop: 'static',
          keyboard: false,
          resolve: {
            person: function () {
              return $scope.person;
            }
          }
      });

      modalInstance.result.then(function () {
        openNextStep(pPerson, STEPS[CURRENT_STEP]);
      }, function () {
        //console.log('Modal dismissed at: ' + new Date());
      });
    };

    /**
     * Private functions
     */
    var openNextStep = function(pPerson, pStep) {
      var secondModalInstance = $uibModal.open({
        templateUrl: pStep.templateUrl,
        controller: pStep.controller,
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
        resolve: {
          person: function () {
            return $scope.person;
          }
        }
      });

      secondModalInstance.result.then(function () {
        CURRENT_STEP++;
        if (CURRENT_STEP===STEPS.length) {
          $location.path('/checkout').search({
            name: pPerson[FIRST_NAME_RESPONSE] + ' ' + pPerson[LAST_NAME_RESPONSE],
            age: pPerson.age,
            location: pPerson.state
          });
        } else {
          openNextStep(pPerson, STEPS[CURRENT_STEP]);
        }
      }, function () {
        //console.log('Modal dismissed at: ' + new Date());
      });
    };

    var init = function() {
    	$scope.person.firstname.value = $location.search().firstname;
    	$scope.person.lastname.value = $location.search().lastname;
    	$scope.person.state.value = $location.search().state;

      $scope.results = persons.getPersons() ? persons.getPersons() : [];

      if (!$scope.results.length) {
        $scope.results = [
          {first_name: 'Josue', last_name: 'Santamaria', age: 24, state: 'New York', relatives: [{first_name: 'Lisa', last_name: 'Badilla'}, {first_name: 'Pablo', last_name: 'Santamaria'}]},
          {first_name: 'Josue', last_name: 'Santamaria', age: 24, state: 'New York', relatives: [{first_name: 'Lisa', last_name: 'Badilla'}, {first_name: 'Pablo', last_name: 'Santamaria'}]},
          {first_name: 'Josue', last_name: 'Santamaria', age: 24, state: 'New York', relatives: [{first_name: 'Lisa', last_name: 'Badilla'}, {first_name: 'Pablo', last_name: 'Santamaria'}]},
          {first_name: 'Josue', last_name: 'Santamaria', age: 24, state: 'New York', relatives: [{first_name: 'Lisa', last_name: 'Badilla'}, {first_name: 'Pablo', last_name: 'Santamaria'}]},
          {first_name: 'Josue', last_name: 'Santamaria', age: 24, state: 'New York', relatives: [{first_name: 'Lisa', last_name: 'Badilla'}, {first_name: 'Pablo', last_name: 'Santamaria'}]},
          {first_name: 'Josue', last_name: 'Santamaria', age: 24, state: 'New York', relatives: [{first_name: 'Lisa', last_name: 'Badilla'}, {first_name: 'Pablo', last_name: 'Santamaria'}]},
          {first_name: 'Josue', last_name: 'Santamaria', age: 24, state: 'New York', relatives: [{first_name: 'Lisa', last_name: 'Badilla'}, {first_name: 'Pablo', last_name: 'Santamaria'}]}
        ];
      }

      if ($scope.results.length) {
        $scope.resultName = $scope.results[0][FIRST_NAME_RESPONSE] + ' ' + $scope.results[0][LAST_NAME_RESPONSE];
      }
    };

    init();
  });
