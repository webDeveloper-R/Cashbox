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
      templateUrl: '../../app/views/search-4.html',
      controller: 'Search4Ctrl'
    },{
      templateUrl: '../../app/views/search-5-modal.html',
      controller: 'Search5ModalCtrl'
    }];

    /**
     * Private variables
     */
    var isFinish =  false;
    var newSearch = false;

    /**
     * SCOPE VARIABLES
     */
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
    $scope.results = [];
    $scope.resultName = '';
    $scope.totalResults = 0;

    /**
     * scope functions
     */
    $scope.getReport = function(pPerson) {
      persons.setPerson(pPerson);
      var modalInstance = $uibModal.open({
          templateUrl: '../../app/views/search-results-modal.html',
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

    $scope.openCustomSearch = function() {
      var modalInstance = $uibModal.open({
          templateUrl: '../../views/custom-search.html',
          controller: 'CustomSearchModalCtrl',
          size: 'lg',
          resolve: {
            person: function () {
              return $scope.person;
            }
          }
      });

      modalInstance.result.then(function () {
        isFinish = true;
        $location.path('/search').search({
            firstname: $scope.person.firstname.value,
            middlename: $scope.person.middlename.value,
            lastname: $scope.person.lastname.value,
            age: $scope.person.age.value,
            city: $scope.person.city.value,
            state: $scope.person.state.value
        });
      }, function () {
        //console.log('Modal dismissed at: ' + new Date());
      });
    };

    $scope.toTitleCase = function(pStr) {
      return pStr ? pStr.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : pStr;
    };

    $scope.$on('newSearch', function() { 
      newSearch = true; 
    });

    /**
     * Event-Listner for Back-Button
     */
    $scope.$on('$locationChangeStart', function(event) {
        // Here you can take the control and call your own functions:
        if ((!newSearch && !isFinish) || ($location.path() !== '/checkout' && $location.path() !== '/search')) {
          event.preventDefault();
        }
    });

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
          isFinish = true;
          $location.path('/checkout').search({
            name: pPerson.names[0][FIRST_NAME_RESPONSE] + ' ' + pPerson.names[0][LAST_NAME_RESPONSE],
            age: pPerson.age,
            location: pPerson.addresses[0].state
          });
        } else {
          openNextStep(pPerson, STEPS[CURRENT_STEP]);
        }
      }, function () {
        //console.log('Modal dismissed at: ' + new Date());
      });
    };

    var init = function() {
      var allResults;
    	
      $scope.person.firstname.value = $location.search().firstname;
      $scope.person.middlename.value = $location.search().middlename;
      $scope.person.lastname.value = $location.search().lastname;
      $scope.person.age.value = $location.search().age;
      $scope.person.city.value = $location.search().city;
      $scope.person.state.value = $location.search().state;

      allResults = persons.getAllResults();

      if(allResults) {
        $scope.results = allResults.data;
        $scope.totalResults = allResults.found;
        $scope.resultName = allResults.search[FIRST_NAME_RESPONSE] + ' ' + allResults.search[LAST_NAME_RESPONSE];
      } else {
        newSearch = true;
        $location.path('/search').search({
          firstname: $scope.person.firstname.value,
          middlename: $scope.person.middlename.value,
          lastname: $scope.person.lastname.value,
          age: $scope.person.age.value,
          city: $scope.person.city.value,
          state: $scope.person.state.value
        });
      }

      //TEST IN LOCAL ENVIRONMENT
      /*if (!$scope.results.length) {
        $scope.results = [
          {first_name: 'Josue', last_name: 'Santamaria', age: 24, state: 'New York', relatives: [{first_name: 'Miguel', last_name: 'Santamaria'}, {first_name: 'Pablo', last_name: 'Santamaria'}]},
          {first_name: 'Josue', last_name: 'Santamaria', age: 24, state: 'New York', relatives: [{first_name: 'Miguel', last_name: 'Santamaria'}, {first_name: 'Pablo', last_name: 'Santamaria'}]},
          {first_name: 'Josue', last_name: 'Santamaria', age: 24, state: 'New York', relatives: [{first_name: 'Miguel', last_name: 'Santamaria'}, {first_name: 'Pablo', last_name: 'Santamaria'}]},
          {first_name: 'Josue', last_name: 'Santamaria', age: 24, state: 'New York', relatives: [{first_name: 'Miguel', last_name: 'Santamaria'}, {first_name: 'Pablo', last_name: 'Santamaria'}]},
          {first_name: 'Josue', last_name: 'Santamaria', age: 24, state: 'New York', relatives: [{first_name: 'Miguel', last_name: 'Santamaria'}, {first_name: 'Pablo', last_name: 'Santamaria'}]},
        ];
      }
      $scope.totalResults = $scope.results.length;
      $scope.resultName = $scope.results[0][FIRST_NAME_RESPONSE] + ' ' + $scope.results[0][LAST_NAME_RESPONSE];*/

    };

    init();
  });
