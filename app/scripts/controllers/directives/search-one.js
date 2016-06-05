

angular.module('frontendv1App').controller('Search1Ctrl', function ($scope, $interval, $timeout) {

	/**
	 * CONSTANTS
	 */
	var INITIAL_INCREMENTAL = 1;
	var INCREMENTAL_TO_FINISH = 1;
	var PROGRESSBAR_TOTAL = 100;
	var INITIAL_REPETIONS_TO_FINISH = 95;
	var MILLISECONDS_BETWEEN_EACH_INCREMENTAL = 150;

	var CURRENT_TAB = 1;
	var EMIT_MESSAGE = 'Finish';
	
	/**
	 * Scope variables
	 */
	$scope.barValue = 5;
	$scope.features = [
		[{ready: false, description: "Arrest Records", loading: true},{ready: false, description: "Sex Offenders", loading: false},{ready: false, description: "Misdemeanors/Felonies", loading: false}],
		[{ready: false, description: "Related Persons", loading: false},{ready: false, description: "Career Info", loading: false},{ready: false, description: "Location Info", loading: false}],
		[{ready: false, description: "Contact Info", loading: false},{ready: false, description: "Court Records", loading: false},{ready: false, description: "Online Profiles", loading: false}]
	];
	
	/**
	 * Private variables
	 */
	var progress;
	var totalItems = 0;
	var breakpoint = 0;
	var nextBreakPoint = 0;
	var index = 0;

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
		$scope.features[Math.floor(index / $scope.features.length)][index % $scope.features.length].ready = true;
		$scope.features[Math.floor(index / $scope.features.length)][index % $scope.features.length].loading = false;
		index++;
		
		if(index<totalItems) {
			$scope.features[Math.floor(index / $scope.features.length)][index % $scope.features.length].loading = true;
		}
	};

	var finishProgressBar = function() {
		$scope.$emit(EMIT_MESSAGE, CURRENT_TAB);
	};

	var init = function() {
		$scope.features.forEach(function (pFeature) {
			totalItems += pFeature.length;
		});
		breakpoint = Math.floor(PROGRESSBAR_TOTAL / totalItems);
		nextBreakPoint = breakpoint;

        progress = $interval(incrementBar, MILLISECONDS_BETWEEN_EACH_INCREMENTAL, INITIAL_REPETIONS_TO_FINISH, true, INITIAL_INCREMENTAL);
        $timeout(finishProgressBar, MILLISECONDS_BETWEEN_EACH_INCREMENTAL * PROGRESSBAR_TOTAL);
    };

    init();
});
