'use strict';

/**
 * @ngdoc function
 * @name frontendv1App.controller:SearchPropertyCtrl
 * @description
 * # SearchPropertyCtrl
 * Controller of the frontendv1App
 */
angular.module('frontendv1App')
  .controller('SearchPropertyCtrl', function ($scope, $location, $interval, $timeout, persons, checkout, constants, request) {
    
    /**
	 * CONSTANTS
	 */
	var INITIAL_INCREMENTAL = 1;
	var INITIAL_REPETIONS_TO_FINISH = 95;
	var MILLISECONDS_BETWEEN_EACH_INCREMENTAL = 100;
	var MILLISECONDS_BETWEEN_CHANGE_RADIUS = 25;
	var MILLISECONDS_TO_FINISH = 10000;
	
	var MILLISECONDS_TO_CHANGE_ZOOM = 3000;

	var initialRadius = 10000000;
	var initialDecRadius = 100000;
	//var decRadius = 25000;

	/**
	 * Private variables
	 */
	var isFinish = false;
	var circle;
	var mapPosition = {
		lat: '39.4718716',
		long: '-96.7261627'
	};

	/**
	 * Scope variables
	 */
	$scope.barValue = 5;
	$scope.address = {};

    $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key='+constants.GoogleAPIKey;
    $scope.mapPosition = ['39.4718716', '-96.7261627'];
    $scope.mapZoom = 4;
    $scope.circleRadius = initialRadius;

	/**
	 * Event-Listner for Back-Button
	 */
	$scope.$on('$locationChangeStart', function(event) {
	    // Here you can take the control and call your own functions:
	    if (!isFinish || ($location.path() !== '/checkout')) {
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
	
	/**
	 * Private functions
	 */
	var incrementBar = function(pIncremental) {
		$scope.barValue += pIncremental;
	};

	var zoomMap = function() {
		if ($scope.mapZoom<8) {
			$scope.mapZoom++;
			initialRadius -= 2000000;
			initialDecRadius -= 20000;
			//decRadius -= 2500;
		}
	};

	var finishProgressBar = function() {
		isFinish = true;

		console.log($scope.address);

		$location.path('/checkout').search({
			address: $scope.address.description,
			mapPosition: $scope.mapPosition,
			city: $scope.address.administrative_area_level_2,
			state: $scope.address.locality
	    });
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
	    		lat: mapPosition.lat,
	    		lng: mapPosition.long
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
		$scope.address = $location.search();

		request.get('https://maps.googleapis.com/maps/api/geocode/json?components=administrative_area:'+$scope.address.administrative_area_level_2+'&administrative_area:'+$scope.address.administrative_area_level_1+'|country:US&key='+constants.GoogleAPIKey)
        .then(function(mapData) {
          if(mapData.results.length) {
          	mapPosition.lat = mapData.results[0].geometry.location.lat;
            mapPosition.long = mapData.results[0].geometry.location.lng;
            
            $scope.mapPosition = mapPosition.lat +','+ mapPosition.long;
            if (circle) {
	            circle.center = {
	            	lat: mapPosition.lat,
	            	lng: mapPosition.long
	            };
	        }
          }
        }).catch(function(pError) {
          return pError;
        });

		if ($location.search().s) {
            checkout.setTrackId($location.search().s);
        }

        $interval(updateRadius, MILLISECONDS_BETWEEN_CHANGE_RADIUS);
        $interval(zoomMap, MILLISECONDS_TO_CHANGE_ZOOM);

        //interval(fn,delay,number_of_times,invoke_apply, params)
        progress = $interval(incrementBar, MILLISECONDS_BETWEEN_EACH_INCREMENTAL, INITIAL_REPETIONS_TO_FINISH, true, INITIAL_INCREMENTAL);
        $timeout(finishProgressBar, MILLISECONDS_TO_FINISH);
    };

    init();
  });
