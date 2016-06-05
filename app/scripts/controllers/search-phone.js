'use strict';

/**
 * @ngdoc function
 * @name frontendv1App.controller:SearchPhoneCtrl
 * @description
 * # SearchPhoneCtrl
 * Controller of the frontendv1App
 */
angular.module('frontendv1App')
  .controller('SearchPhoneCtrl', function ($scope, $location, $interval, $timeout, persons, checkout, constants) {
    
    /**
	 * CONSTANTS
	 */
	var INITIAL_INCREMENTAL = 1;
	var INCREMENTAL_TO_FINISH = 1;
	var PROGRESSBAR_TOTAL = 100;
	var INITIAL_REPETIONS_TO_FINISH = 95;
	var MILLISECONDS_BETWEEN_EACH_INCREMENTAL = 100;
	var MILLISECONDS_BETWEEN_CHANGE_RADIUS = 25;
	var MILLISECONDS_TO_FINISH = 60000;
	
	var MILLISECONDS_TO_CHANGE_ZOOM = 3000;

	var initialRadius = 10000000;
	var initialDecRadius = 100000;
	//var decRadius = 25000;

	/**
	 * Private variables
	 */
	var isFinish = false;
	var getResults = false;
	var circle;

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

    $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key='+constants.GoogleAPIKey;
    $scope.mapPosition = ['39.4718716', '-96.7261627'];
    $scope.mapZoom = 4;
    $scope.circleRadius = initialRadius;

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

	$scope.getRadius = function(num) {
		return Math.sqrt(num) * 100;
    };

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

	var zoomMap = function() {
		$scope.testimonials[$scope.currentTestimonial].isCurrent = false;
		$scope.currentTestimonial = $scope.currentTestimonial===totalTestimonials-1 ? 0 : $scope.currentTestimonial+1;
		$scope.testimonials[$scope.currentTestimonial].isCurrent = true;

		if ($scope.mapZoom<8) {
			$scope.mapZoom++;
			initialRadius -= 2000000;
			initialDecRadius -= 20000;
			//decRadius -= 2500;
		}
	};

	var finishProgressBar = function() {
		/*isFinish = true;

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
		}*/
	};

	$scope.$on('mapInitialized', function(event, map) {
      	map.setOptions({
	        zoomControl: false,
	        scrollwheel: false,
	        disableDoubleClickZoom: true,
	    	draggable: false
		});
	  	circle = new google.maps.Circle({
	      	strokeColor: '#FF0000',
	    	strokeOpacity: 0.8,
	    	strokeWeight: 2,
	    	fillColor: '#FF0000',
	    	fillOpacity: 0.35,
	    	map: map,
	    	center: {
	    		lat: 39.4718716,
	    		lng: -96.7261627
	    	},
	    	radius: $scope.getRadius($scope.circleRadius)
  		});
    });

    var updateRadius = function() {
    	$scope.circleRadius = $scope.circleRadius>0 ? $scope.circleRadius-initialDecRadius : initialRadius;
		
		if (circle) {
			circle.setRadius($scope.getRadius($scope.circleRadius));
		}
    };

	var init = function() {
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

        $interval(updateRadius, MILLISECONDS_BETWEEN_CHANGE_RADIUS);
        $interval(zoomMap, MILLISECONDS_TO_CHANGE_ZOOM);

        //interval(fn,delay,number_of_times,invoke_apply, params)
        progress = $interval(incrementBar, MILLISECONDS_BETWEEN_EACH_INCREMENTAL, INITIAL_REPETIONS_TO_FINISH, true, INITIAL_INCREMENTAL);
    };

    init();
  });
