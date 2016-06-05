

angular.module('frontendv1App').controller('Search2Ctrl', function ($scope, $interval, $timeout, persons) {

	/**
	 * CONSTANTS
	 */
	var INITIAL_INCREMENTAL = 1;
	var INCREMENTAL_TO_FINISH = 1;
	var PROGRESSBAR_TOTAL = 100;
	var INITIAL_REPETIONS_TO_FINISH = 95;
	var MILLISECONDS_BETWEEN_EACH_INCREMENTAL = 200;

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
	$scope.person = {};

	$scope.barValue = 5;
	$scope.socialNetworks = [
		{
			ready: false,
			icon: 'social social-google',
			name: 'Google'
		},
		{
			ready: false,
			icon: 'social social-behance',
			name: 'Behance'
		},
		{
			ready: false,
			icon: 'social social-instagram',
			name: 'Instagram'
		},
		{
			ready: false,
			icon: 'social social-paypal',
			name: 'Paypal'
		},
		{
			ready: false,
			icon: 'social social-wordpress',
			name: 'Wordpress'
		},
		{
			ready: false,
			icon: 'social social-pinterest',
			name: 'Pinterest'
		},
		{
			ready: false,
			icon: 'social social-linkedin',
			name: 'Linkedin'
		},
		{
			ready: false,
			icon: 'social social-twitter',
			name: 'Twitter'
		},
		{
			ready: false,
			icon: 'social social-facebook',
			name: 'Facebook'
		},
		{
			ready: false,
			icon: 'social social-flickr',
			name: 'Flickr'
		},
		{
			ready: false,
			icon: 'social social-bebo',
			name: 'Bebo'
		},
		{
			ready: false,
			icon: 'social social-digg',
			name: 'Digg'
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

        var person = persons.getPerson();
        $scope.person.first_name = person.names[0].first_name;
        $scope.person.last_name = person.names[0].last_name;
    };
});
