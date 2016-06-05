

angular.module('frontendv1App').controller('Search4Ctrl', function ($scope, $interval, $timeout, $uibModalInstance, persons) {

	/**
	 * CONSTANTS
	 */
	var INITIAL_INCREMENTAL = 1;
	var INCREMENTAL_TO_FINISH = 1;
	var PROGRESSBAR_TOTAL = 100;
	var INITIAL_REPETIONS_TO_FINISH = 95;
	var MILLISECONDS_BETWEEN_EACH_INCREMENTAL = 100;

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
	$scope.person = persons.getPerson();
	$scope.barValue = 5;

	$scope.tabs = [
		{
			header: 'Criminal',
			icon: 'icon-handcuffs',
			description: 'Criminal Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.<br><br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
			disabled: true
		},
		{ 
			header: 'Public',
			icon: 'icon-personInfo',
			description: 'Public Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.<br><br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
			disabled: true
		},
		{ 
			header: 'Personal',
			icon: 'icon-clipboard',
			description: 'Personal Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.<br><br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
			disabled: true
		}
	];
	

	/**
	 * SCOPE functions
	 */
	/*$scope.$on(ON_MESSAGE, function (event, pData) {
		if (pData===CURRENT_TAB) {
			init();
		}
	});*/

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
		totalItems = $scope.tabs.length;
		breakpoint = Math.floor(PROGRESSBAR_TOTAL / totalItems);
		nextBreakPoint = breakpoint <= $scope.barValue ? $scope.barValue+1 : breakpoint;

        progress = $interval(incrementBar, MILLISECONDS_BETWEEN_EACH_INCREMENTAL, INITIAL_REPETIONS_TO_FINISH, true, INITIAL_INCREMENTAL);
        $timeout(finishProgressBar, MILLISECONDS_BETWEEN_EACH_INCREMENTAL * PROGRESSBAR_TOTAL);
    };

    init();
});