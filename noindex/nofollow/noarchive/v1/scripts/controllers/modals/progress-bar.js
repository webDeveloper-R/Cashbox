

angular.module('frontendv1App').controller('ProgressBarModalCtrl', function ($scope, $uibModalInstance, $interval, $timeout, persons, person) {

	/**
	 * CONSTANTS
	 */
	var INITIAL_INCREMENTAL = 1;
	var INCREMENTAL_TO_FINISH = 1;
	var PROGRESSBAR_TOTAL = 100;
	var INITIAL_REPETIONS_TO_FINISH = 95;
	var MILLISECONDS_BETWEEN_EACH_INCREMENTAL = 100;
	var MILLISECONDS_TO_FINISH = 50000;
	//var MILLISECONDS_TO_FINISH = 1000;

	var MILLISECONDS_TO_CHANGE_SLIDER = 7000;
	var TOTAL_TESTIMONIALS = 3;

	/**
	 * Scope variables
	 */
	$scope.barValue = 5;
	$scope.person = person;

	$scope.rate = 3;
	$scope.max = 3;
	$scope.isReadonly = true;
	$scope.currentTestimonial = 1;

	/**
	 * Private variables
	 */
	var progress;

	/**
	 * Private functions
	 */
	var incrementBar = function(pIncremental) {
		$scope.barValue += pIncremental;
	};

	var changeTestimonial = function() {
		$scope.currentTestimonial = $scope.currentTestimonial===TOTAL_TESTIMONIALS ? 1 : $scope.currentTestimonial+1;
	};

	var finishProgressBar = function() {
		$uibModalInstance.close();
	};

	var init = function() {
		persons.getMatchPersons({
            fn: person.firstname.value,
            ln: person.lastname.value,
            s: person.state.value
        }).then(function(pResults) {
        	if (angular.isDefined(progress)) {
        		$interval.cancel(progress);
        		progress = undefined;
        	}

        	var progressMissing = PROGRESSBAR_TOTAL - $scope.barValue;
        	var milliseconds = (MILLISECONDS_TO_FINISH / progressMissing);

        	if (milliseconds>MILLISECONDS_BETWEEN_EACH_INCREMENTAL) {
        		progress = $interval(incrementBar, progressMissing, progressMissing, true, INITIAL_INCREMENTAL);
        		$timeout(finishProgressBar, (progressMissing*MILLISECONDS_BETWEEN_EACH_INCREMENTAL));
        	} else {
        		progress = $interval(incrementBar, milliseconds, (progressMissing / INCREMENTAL_TO_FINISH), true, INCREMENTAL_TO_FINISH);
        		$timeout(finishProgressBar, MILLISECONDS_TO_FINISH);
        	}
        }).catch(function(pError) {
            $uibModalInstance.dismiss('cancel');
        });

        $interval(changeTestimonial, MILLISECONDS_TO_CHANGE_SLIDER);

        progress = $interval(incrementBar, MILLISECONDS_BETWEEN_EACH_INCREMENTAL, INITIAL_REPETIONS_TO_FINISH, true, INITIAL_INCREMENTAL);
    };

    init();
});