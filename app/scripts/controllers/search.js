'use strict';

/**
 * @ngdoc function
 * @name frontendv1App.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the frontendv1App
 */
angular.module('frontendv1App')
  .controller('SearchCtrl', function ($scope, $location, $interval, $window, $timeout, persons, checkout) {
    
    /**
	 * CONSTANTS
	 */
	var INITIAL_INCREMENTAL = 1;
	var INCREMENTAL_TO_FINISH = 1;
	var PROGRESSBAR_TOTAL = 100;
	var INITIAL_REPETIONS_TO_FINISH = 95;
	var MILLISECONDS_BETWEEN_EACH_INCREMENTAL = 100;
	var MILLISECONDS_TO_FINISH = 60000;
	
	var MILLISECONDS_TO_CHANGE_SLIDER = 7000;

	/**
	 * Private variables
	 */
	var isFinish = false;
	var getResults = false;

	/**
	 * Scope variables
	 */
	$scope.barValue = 5;
	$scope.person = {
      firstname: {},
      middlename: {},
      lastname: {},
      age: {},
      city: {},
      state: {}
    };

	$scope.isReadonly = true;
	$scope.currentTestimonial = 0;
	$scope.testimonials = [{
		img: 'img3.gif',
		description: 'I found out that my daughter\'s boyfriend went to JAIL for ASSAULT.',
		name: 'Daughter\'s BF',
		city: 'New York',
		isCurrent: true
	},{
		img: 'img1.gif',
		description: 'I ran a search on myself. Wow! I\'m surprised how much of my past comes up.',
		name: 'Myself',
		city: 'California',
		isCurrent: false
	},{
		img: 'img6.gif',
		description: 'I found out my new date has been in lot of trouble with the law. No thanks!',
		name: 'Dating',
		city: 'Texas',
		isCurrent: false
	},{
		img: 'img2.gif',
		description: 'In my expensive neighborhood 2 of my neighbors are sex offenders. ',
		name: 'Neighbor',
		city: 'New York',
		isCurrent: false
	}];

	/**
	 * Event-Listner for Back-Button
	 */
	$scope.$on('$locationChangeStart', function(event) {
	    // Here you can take the control and call your own functions:
	    if (!isFinish || ($location.path() !== '/results' && $location.path() !== '/results-not-found')) {
	    	event.preventDefault();
	    }
	});

	/**
	 * Private variables
	 */
	var progress;
	var totalTestimonials;

	/**
	 * Private functions
	 */
	var incrementBar = function(pIncremental) {
		$scope.barValue += pIncremental;
	};

	var changeTestimonial = function() {
		$scope.testimonials[$scope.currentTestimonial].isCurrent = false;
		$scope.currentTestimonial = $scope.currentTestimonial===totalTestimonials-1 ? 0 : $scope.currentTestimonial+1;
		$scope.testimonials[$scope.currentTestimonial].isCurrent = true;
	};

	var fireConversion = function() {
		$window.google_trackConversion({
		 	google_conversion_id : 1061441233,
		 	google_conversion_language : 'en',
		 	google_conversion_format : '3',
		 	google_conversion_color : 'ffffff',
		 	google_conversion_label : '4W5nCPvN-GMQ0Z2R-gM',
		 	google_remarketing_only : false
		});
	};

	var finishProgressBar = function() {
		isFinish = true;

		if(getResults) {
			$location.path('/results').search({
				firstname: $scope.person.firstname.value,
	            middlename: $scope.person.middlename.value,
	            lastname: $scope.person.lastname.value,
	            age: $scope.person.age.value,
	            city: $scope.person.city.value,
	            state: $scope.person.state.value
		    });
		} else {
			$location.path('/results-not-found').search({
				firstname: $scope.person.firstname.value,
	            middlename: $scope.person.middlename.value,
	            lastname: $scope.person.lastname.value,
	            age: $scope.person.age.value,
	            city: $scope.person.city.value,
	            state: $scope.person.state.value
		    });
		}
	};

	var init = function() {
		fireConversion();
		
		$scope.person.firstname.value = $location.search().firstname;
		$scope.person.middlename.value = $location.search().middlename;
		$scope.person.lastname.value = $location.search().lastname;
		$scope.person.age.value = $location.search().age;
		$scope.person.city.value = $location.search().city;
		$scope.person.state.value = $location.search().state;

		if ($location.search().s) {
            checkout.setTrackId($location.search().s);
        }

		totalTestimonials = $scope.testimonials.length;

		persons.getMatchPersons({
            fn: $scope.person.firstname.value,
            ln: $scope.person.lastname.value,
            s: $scope.person.state.value,

            mn: $scope.person.middlename.value,
            ag: $scope.person.age.value,
            ci: $scope.person.city.value
        }).then(function(pResults) {
        	if (pResults && pResults.length > 0) {
        		getResults = true;
        	}
        
        	if (angular.isDefined(progress)) {
        		$interval.cancel(progress);
        		progress = undefined;
        	}

        	var progressMissing = PROGRESSBAR_TOTAL - $scope.barValue;
        	var milliseconds = (MILLISECONDS_TO_FINISH / progressMissing);

        	if (milliseconds>MILLISECONDS_BETWEEN_EACH_INCREMENTAL) {
        		//interval(fn,delay,number_of_times,invoke_apply, params)
        		progress = $interval(incrementBar, progressMissing, progressMissing, true, INITIAL_INCREMENTAL);
        		$timeout(finishProgressBar, (progressMissing*MILLISECONDS_BETWEEN_EACH_INCREMENTAL));
        	} else {
        		//interval(fn,delay,number_of_times,invoke_apply, params)
        		progress = $interval(incrementBar, milliseconds, (progressMissing / INCREMENTAL_TO_FINISH), true, INCREMENTAL_TO_FINISH);
        		$timeout(finishProgressBar, MILLISECONDS_TO_FINISH);
        	}
        }).catch(function(pError) {
        	console.log(pError);
        });

        $interval(changeTestimonial, MILLISECONDS_TO_CHANGE_SLIDER);

        //interval(fn,delay,number_of_times,invoke_apply, params)
        progress = $interval(incrementBar, MILLISECONDS_BETWEEN_EACH_INCREMENTAL, INITIAL_REPETIONS_TO_FINISH, true, INITIAL_INCREMENTAL);
    };

    init();
  });
