'use strict';

/**
 * @ngdoc function
 * @name frontendv1App.controller:ThankYouCtrl
 * @description
 * # ThankYouCtrl
 * Controller of the frontendv1App
 */
angular.module('frontendv1App')
  .controller('ThankYouCtrl', function ($scope, $sce, $location, $window, checkout) {
    $scope.checkoutInfo = checkout.getCheckoutInfo();

    $scope.trustSrc = function(pSrc) {
      return $sce.trustAsResourceUrl(pSrc);
    };

    var fireConversion = function() {
      $window.google_trackConversion({
        google_conversion_id : 1061441233,
        google_conversion_language : 'en',
        google_conversion_format : '3',
        google_conversion_color : 'ffffff',
        google_conversion_label : 'feTZCNWTg2QQ0Z2R-gM',
        google_remarketing_only : false
      });
    };

    var init = function() {
    	fireConversion();

      if (!$scope.checkoutInfo) {
    		$location.path('/');
    	}
    };

    init();
  });
