

angular.module('frontendv1App').controller('Search3Ctrl', function ($scope, $interval, $timeout, persons) {

	/**
	 * CONSTANTS
	 */
	var INITIAL_INCREMENTAL = 1;
	var INCREMENTAL_TO_FINISH = 1;
	var PROGRESSBAR_TOTAL = 100;
	var INITIAL_REPETIONS_TO_FINISH = 95;
	var MILLISECONDS_BETWEEN_EACH_INCREMENTAL = 250;

	var CURRENT_TAB = 3;
	var EMIT_MESSAGE = 'Finish';
	var ON_MESSAGE = 'start';

	/**
	 * Private variables
	 */
	var progress;
	var totalItems = 0;
	var breakpoint = 0;
	var nextBreakPoint = 0;
	var index = 0;
	
	/**
	 * Scope variables
	 */
	$scope.person = {};
	$scope.barValue = 5;
	$scope.searchReady = false;
	$scope.features = [
		{
			ready: false,
			description: 'Online Activity',
			loading: true
		},
		{
			ready: false,
			description: 'Contact Info',
			loading: false
		},
		{
			ready: false,
			description: 'Divorce Records',
			loading: false
		},
		{
			ready: false,
			description: 'Sexual Offenses',
			loading: false
		},
		{
			ready: false,
			description: 'Past Addresses',
			loading: false
		},
		{
			ready: false,
			description: 'Marriage Records',
			loading: false
		},
		{
			ready: false,
			description: 'Court Records',
			loading: false
		},
		{
			ready: false,
			description: 'Age',
			loading: false
		},
		{
			ready: false,
			description: 'Licenses',
			loading: false
		},
		{
			ready: false,
			description: 'Relatives',
			loading: false
		},
		{
			ready: false,
			description: 'Phone Records',
			loading: false
		},
		{
			ready: false,
			description: 'Felonies',
			loading: false
		},
		{
			ready: false,
			description: 'Roommates',
			loading: false
		},
		{
			ready: false,
			description: 'Career Info',
			loading: false
		},
		{
			ready: false,
			description: 'Misdeameanors',
			loading: false
		},
		{
			ready: false,
			description: 'Arrest Records',
			loading: false
		},
		{
			ready: false,
			description: 'Traffic Tickets',
			loading: false
		},
		{
			ready: false,
			description: '... and more!',
			loading: false
		} 
	];

	/**
	 * SCOPE functions
	 */
	$scope.$on(ON_MESSAGE, function (event, pData) {
		if (pData===CURRENT_TAB) {
			init();
		}
	});

	$scope.nextStep = function() {
		if($scope.searchReady) {
			$scope.$emit(EMIT_MESSAGE, CURRENT_TAB);
		}
	};

	/**
	 * Private functions
	 */
	var incrementBar = function(pIncremental) {
		$scope.barValue += pIncremental;
		if ($scope.barValue === nextBreakPoint) {
			nextBreakPoint += breakpoint;
			setReadyFeature();
		}
	};

	var setReadyFeature = function() {
		if(index<totalItems) {
			$scope.features[index].ready = true;
			$scope.features[index].loading = false;
			index++;
		}
		
		if(index<totalItems) {
			$scope.features[index].loading = true;
		}
	};

	var finishProgressBar = function() {
		$scope.searchReady = true;
	};

	var init = function() {
		totalItems = $scope.features.length;
		breakpoint = Math.floor(PROGRESSBAR_TOTAL / totalItems);
		nextBreakPoint = breakpoint <= $scope.barValue ? $scope.barValue+1 : breakpoint;

        progress = $interval(incrementBar, MILLISECONDS_BETWEEN_EACH_INCREMENTAL, INITIAL_REPETIONS_TO_FINISH, true, INITIAL_INCREMENTAL);
        $timeout(finishProgressBar, MILLISECONDS_BETWEEN_EACH_INCREMENTAL * PROGRESSBAR_TOTAL);

        var person = persons.getPerson();
        $scope.person.first_name = person.names[0].first_name;
        $scope.person.last_name = person.names[0].last_name;
    };
});
