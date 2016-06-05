

angular.module('frontendv1App').controller('Search3Ctrl', function ($scope, $interval, $timeout, persons) {

	/**
	 * CONSTANTS
	 */
	var INITIAL_INCREMENTAL = 1;
	var INCREMENTAL_TO_FINISH = 1;
	var PROGRESSBAR_TOTAL = 100;
	var INITIAL_REPETIONS_TO_FINISH = 95;
	var MILLISECONDS_BETWEEN_EACH_INCREMENTAL = 100;

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
	
	/**
	 * Scope variables
	 */
	$scope.person = persons.getPerson();
	$scope.barValue = 5;
	$scope.searchReady = false;
	$scope.features = [
		{
			ready: false,
			description: 'Online Activity'
		},
		{
			ready: false,
			description: 'Court Records'
		},
		{
			ready: false,
			description: 'Arrest Records'
		},
		{
			ready: false,
			description: 'Sexual Offenses'
		},
		{
			ready: false,
			description: 'Relatives'
		},
		{
			ready: false,
			description: 'Online Activity'
		},
		{
			ready: false,
			description: 'Court Records'
		},
		{
			ready: false,
			description: 'Arrest Records'
		},
		{
			ready: false,
			description: 'Sexual Offenses'
		},
		{
			ready: false,
			description: 'Relatives'
		},
		{
			ready: false,
			description: 'Online Activity'
		},
		{
			ready: false,
			description: 'Court Records'
		},
		{
			ready: false,
			description: 'Arrest Records'
		},
		{
			ready: false,
			description: 'Sexual Offenses'
		},
		{
			ready: false,
			description: 'Relatives'
		},
		{
			ready: false,
			description: 'Arrest Records'
		},
		{
			ready: false,
			description: 'Sexual Offenses'
		},
		{
			ready: false,
			description: 'Relatives'
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
		var random = Math.floor((Math.random() * totalItems) + 1);
		totalItems--;

		var counter = 0;
		$scope.features.forEach( function (pFeature) {
			if (!pFeature.ready) {
				counter++;
				if (counter === random) {
					pFeature.ready = true;
				}
			}
		});
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
    };
});