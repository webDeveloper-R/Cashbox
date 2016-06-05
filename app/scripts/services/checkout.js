'use strict';

/**
 * @ngdoc service
 * @name frontendv1App.checkout
 * @description
 * # checkout
 * Service in the frontendv1App.
 */
angular.module('frontendv1App')
  .service('checkout', function (request, settings) {
    var baseUrl = settings.getSetting('membersURL');
	var billingURL = baseUrl + '/billing';//'http://httpbin.org/post';

	var trackId;
	var checkoutInfo;

	this.setTrackId = function (pTrackId) {
		trackId = pTrackId;
	};

	this.getTrackId = function () {
		return trackId;
	};

	this.setCheckoutInfo = function (pCheckoutInfo) {
		checkoutInfo = pCheckoutInfo;
	};

	this.getCheckoutInfo = function () {
		return checkoutInfo;
	};

	this.processPayment = function(pData) {
		return request.post(billingURL, pData)
		.then(function(pResult) {
	        return pResult;
	    }).catch(function(pError) {
	    	return pError;
	    });
	};
  });
