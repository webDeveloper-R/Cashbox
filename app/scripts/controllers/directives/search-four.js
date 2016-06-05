

angular.module('frontendv1App').controller('Search4Ctrl', function ($scope, $interval, $timeout, $uibModalInstance, persons) {

	/**
	 * CONSTANTS
	 */
	var INITIAL_INCREMENTAL = 1;
	var INCREMENTAL_TO_FINISH = 1;
	var PROGRESSBAR_TOTAL = 100;
	var INITIAL_REPETIONS_TO_FINISH = 95;
	var MILLISECONDS_BETWEEN_EACH_INCREMENTAL = 300;

	//var CURRENT_TAB = 4;
	//var EMIT_MESSAGE = 'Finish';
	//var ON_MESSAGE = 'start';

	/**
	 * Private variables
	 */
	var progress;
	var totalItems = 0;
	var breakpoint = 0;
	var nextBreakPoint = 0;
	var activeTab = 0;
	
	/**
	 * Scope variables
	 */
	$scope.person = {};
	$scope.barValue = 5;
	$scope.tabs = [];

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
		activeTab ++;
		if (activeTab < $scope.tabs.length) {
			$scope.tabs[activeTab].active = true;
		}
	};

	var finishProgressBar = function() {
		$uibModalInstance.close();
	};

	var init = function() {
        var person = persons.getPerson();
        $scope.person.first_name = person.names[0].first_name;
        $scope.person.last_name = person.names[0].last_name;
        $scope.person.age = person.age;
        $scope.person.state = person.addresses[0].state;

        $scope.tabs = [
			{
				header: 'Criminal',
				icon: 'icon-handcuffs',
				description: 'Find out if '+$scope.person.first_name + ' ' + $scope.person.last_name +' has felonies, misdemeanors, sexual offenses, small claims cases, traffic tickets, or legal judgements. <p>Your reports instantly combine all details from: county, state, and federal records. ',
				disabled: true
			},
			{ 
				header: 'Personal',
				icon: 'icon-clipboard',
				description: 'See  marriage & divorce records for '+$scope.person.first_name + ' ' + $scope.person.last_name + '. <p>You can also view '+$scope.person.first_name + ' ' + $scope.person.last_name +'\'s properties, cars, aircrafts, boats, business records, and more.',
				disabled: true
			},
			{ 
				header: 'Deep Search',
				icon: 'icon-personInfo',
				description: 'See '+$scope.person.first_name + ' ' + $scope.person.last_name +'\'s previous addresses, roommates, phone numbers, email addresses, social profiles, online activity... <p>Go beyond Google. Check them before you trust them. ',
				disabled: true
			}
		];

		totalItems = $scope.tabs.length;
		breakpoint = Math.floor(PROGRESSBAR_TOTAL / totalItems);
		nextBreakPoint = breakpoint <= $scope.barValue ? $scope.barValue+1 : breakpoint;

        progress = $interval(incrementBar, MILLISECONDS_BETWEEN_EACH_INCREMENTAL, INITIAL_REPETIONS_TO_FINISH, true, INITIAL_INCREMENTAL);
        $timeout(finishProgressBar, MILLISECONDS_BETWEEN_EACH_INCREMENTAL * PROGRESSBAR_TOTAL);
    };

    init();
});
