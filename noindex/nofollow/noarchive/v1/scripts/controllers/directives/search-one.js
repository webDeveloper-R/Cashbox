

angular.module('frontendv1App').controller('Search1Ctrl', function ($scope, $interval, $timeout) {

	/**
	 * CONSTANTS
	 */
	var INITIAL_INCREMENTAL = 1;
	var INCREMENTAL_TO_FINISH = 1;
	var PROGRESSBAR_TOTAL = 100;
	var INITIAL_REPETIONS_TO_FINISH = 95;
	var MILLISECONDS_BETWEEN_EACH_INCREMENTAL = 100;

	var CURRENT_TAB = 1;
	var EMIT_MESSAGE = 'Finish';
	
	/**
	 * Scope variables
	 */
	$scope.barValue = 5;
	$scope.features = [
		[{ready: false, description: "text info..."},{ready: false, description: "text info..."},{ready: false, description: "text info..."}],
		[{ready: false, description: "text info..."},{ready: false, description: "text info..."},{ready: false, description: "text info..."}],
		[{ready: false, description: "text info..."},{ready: false, description: "text info..."},{ready: false, description: "text info..."}]
	];
	
	/**
	 * Private variables
	 */
	var progress;
	var totalItems = 0;
	var breakpoint = 0;
	var nextBreakPoint = 0;

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
			pFeature.forEach( function (pItem) {
				if (!pItem.ready) {
					counter++;
					if (counter === random) {
						pItem.ready = true;
					}
				}
			});
		});
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