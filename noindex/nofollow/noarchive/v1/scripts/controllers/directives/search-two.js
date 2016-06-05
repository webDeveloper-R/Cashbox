

angular.module('frontendv1App').controller('Search2Ctrl', function ($scope, $interval, $timeout, persons) {

	/**
	 * CONSTANTS
	 */
	var INITIAL_INCREMENTAL = 1;
	var INCREMENTAL_TO_FINISH = 1;
	var PROGRESSBAR_TOTAL = 100;
	var INITIAL_REPETIONS_TO_FINISH = 95;
	var MILLISECONDS_BETWEEN_EACH_INCREMENTAL = 100;

	var CURRENT_TAB = 2;
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
	$scope.socialNetworks = [
		{
			ready: false,
			icon: 'social social-google'
		},
		{
			ready: false,
			icon: 'social social-behance'
		},
		{
			ready: false,
			icon: 'social social-instagram'
		},
		{
			ready: false,
			icon: 'social social-paypal'
		},
		{
			ready: false,
			icon: 'social social-wordpress'
		},
		{
			ready: false,
			icon: 'social social-pinterest'
		},
		{
			ready: false,
			icon: 'social social-linkedin'
		},
		{
			ready: false,
			icon: 'social social-twitter'
		},
		{
			ready: false,
			icon: 'social social-facebook'
		},
		{
			ready: false,
			icon: 'social social-flickr'
		},
		{
			ready: false,
			icon: 'social social-bebo'
		},
		{
			ready: false,
			icon: 'social social-digg'
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
		$scope.socialNetworks.forEach( function (pSocial) {
			if (!pSocial.ready) {
				counter++;
				if (counter === random) {
					pSocial.ready = true;
				}
			}
		});
	};

	var finishProgressBar = function() {
		$scope.$emit(EMIT_MESSAGE, CURRENT_TAB);
	};

	var init = function() {
		totalItems = $scope.socialNetworks.length;
		breakpoint = Math.floor(PROGRESSBAR_TOTAL / totalItems);
		nextBreakPoint = breakpoint;

        progress = $interval(incrementBar, MILLISECONDS_BETWEEN_EACH_INCREMENTAL, INITIAL_REPETIONS_TO_FINISH, true, INITIAL_INCREMENTAL);
        $timeout(finishProgressBar, MILLISECONDS_BETWEEN_EACH_INCREMENTAL * PROGRESSBAR_TOTAL);
    };
});