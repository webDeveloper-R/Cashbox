'use strict';

/**
 * @ngdoc function
 * @name frontendv1App.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the frontendv1App
 */
angular.module('frontendv1App')
  .controller('CheckoutCtrl', function ($scope, $location, $window, NgMap, constants, checkout, persons, request, usSpinnerService) {
    /**
     *
     * CONSTANTS
     */
    var INITIAL_EXP_MONTH = 'MONTH';
    var INITIAL_EXP_YEAR = 'YEAR';

    var DEFAULT_COUNTRY_CODE = 'US';

    var ERROR_FIRST_NAME = '* Invalid name, please change it';
    var ERROR_LAST_NAME = '* Invalid last name, please change it';
    var ERROR_EMAIL = '* Invalid email, please change it';
    //var ERROR_ADDRESS = '* Invalid address, please change it';
    var ERROR_ZIP = '* Invalid Zip Code, must contain 5 digits';
    var ERROR_CREDIT_CARD = '* Invalid credit card, please change it';
    var ERROR_CVV = '* Invalid cvv, please change it';
    var ERROR_CHECK = '* You must agree with our terms and conditions';
    var ERROR_EXP_MONTH = '* You must select a month';
    var ERROR_EXP_YEAR = '* You must select a year';

    var SERVER_ERROR = 'Internal Server Error';
    var STATUS_FAIL = 'FAIL';

    var THANKYOU_PATH = '/thankyou';
    var SPINNER_ID = 'spinner-1';

    var DEFAULT_STATE = 'New York';
    var DEFAULT_CITY = 'New York';

    $scope.errorsRespond = [];
    $scope.PACKAGES = [{
        'poduct_id': 72,
        'title': 'Recommended',
        'subtitle': '1 month of Unlimited Reports',
        'price': '$22.95/mo',
        'selected': true
    },{
        'poduct_id': 72,
        'title': 'Recommended',
        'subtitle': '1 month of Unlimited Reports',
        'price': '$22.95/mo',
        'selected': false
    },{
        'poduct_id': 72,
        'title': 'Recommended',
        'subtitle': '1 month of Unlimited Reports',
        'price': '$22.95/mo',
        'selected': false
    }];
    $scope.isPhoneSearch = false;
    $scope.isAddressSearch = false;
    $scope.isPersonSearch = false;

    $scope.months = [
      'MONTH',
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12'
    ];

    $scope.years = [
      'YEAR',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020',
      '2021',
      '2022',
      '2023',
      '2024',
      '2025',
      '2026'
    ];

    $scope.showSpinner = false;

    /**
     * PRIVATE VARIABLES
     */
    var autocomplete;
    var componentForm = {};
    var person = persons.getPerson();

    /**
     * SCOPE VARIABLES
     */
    $scope.checkout = {
      'exp_month': INITIAL_EXP_MONTH,
      'exp_year': INITIAL_EXP_YEAR
    };
    $scope.errors = {};
    $scope.empty = {
      'first_name': true,
      'last_name': true,
      'email': true,
      'address': true,
      'credit_card': true,
      'zip': true
    };
    $scope.person = {};
    $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key='+constants.GoogleAPIKey;

    //$scope.mapPosition = '40.705311,-74.2581969';

    $scope.alerts = [{
      'icon': 'icon-bubble',
      'value': Math.floor((Math.random() * 50) + 1)
    },{
      'icon': 'icon-people',
      'value': Math.floor((Math.random() * 50) + 1)
    },{
      'icon': 'icon-notification',
      'value': Math.floor((Math.random() * 50) + 1)
    }];

    /**
     * SCOPE FUNCTIONS
     */
    $scope.selectPackage = function(pPackage) {
        cleanSelectedPackage();
        pPackage.selected = true;
    };

    $scope.processPayment = function() {
      $scope.errorsRespond = [];
      for(var key in componentForm) {
        $scope.checkout[key] = componentForm[key];
      }
      if(validateForm()) {
        var packageSelected = $scope.PACKAGES.filter(function isBigEnough(pPackage) {
          return pPackage.selected;
        });

        var country = geoip_country_code() ? geoip_country_code() : DEFAULT_COUNTRY_CODE;

        var data = {
          first_name : $scope.checkout.first_name,
          last_name : $scope.checkout.last_name,
          email : $scope.checkout.email,

          /*address : $scope.checkout.address,
          city : $scope.checkout.locality,
          state : $scope.checkout.administrative_area_level_1,
          zip : $scope.checkout.postal_code,*/

          address : '1 Main Str',
          city : geoip_city(),
          state : geoip_region(),
          country : country,
          zip : $scope.checkout.zip,

          phone : '8885554444',
          credit_card_number : $scope.checkout.credit_card,
          credit_card_exp_month : $scope.checkout.exp_month,
          credit_card_exp_year : $scope.checkout.exp_year,
          credit_card_cvv : $scope.checkout.cvv,
          productId : packageSelected[0].poduct_id,
          trackid : checkout.getTrackId()
        };

        startSpinner();

        if (!data.city || !data.state) {
          fetchRegionInfo(data, $scope.processPaymentRequest);
        } else {
          $scope.processPaymentRequest(data);
        }

      }
    };

    $scope.processPaymentRequest = function(data) {
      checkout.processPayment(data).then(function(pResult) {
        stopSpinner();

        if((pResult)&&(pResult.status)) {
          if(pResult.status===STATUS_FAIL) {
            $scope.errorsRespond = pResult.errors;
          } else {
            checkout.setCheckoutInfo(pResult);
            $location.path(THANKYOU_PATH);
          }
        } else {
          $scope.errorsRespond.push(SERVER_ERROR);
        }
      }).catch(function(pError) {
        stopSpinner();

        $scope.errorsRespond.push(pError);
        console.log(pError);
      });
    };

    var getRandomNumber = function(pMin, pMax) {
      return Math.floor(Math.random() * (pMax - pMin + 1)) + pMin;
    };

    /**
     * PRIVATE FUNCTIONS
     */
    var cleanSelectedPackage = function() {
        $scope.PACKAGES.forEach(function(pPackage) {
            pPackage.selected = false;
        });
    };

    var startSpinner = function() {
      $scope.showSpinner = true;
      usSpinnerService.spin(SPINNER_ID);
    };

    var stopSpinner = function() {
      $scope.showSpinner = false;
      usSpinnerService.stop(SPINNER_ID);
    };

    var validateForm = function() {
      var isValid = true;

      var regExpText = /^[a-zA-Z ]{2,30}$/;
      var regExpEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var regExpZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
      var regExpCreditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
      var regExpCVV = /^[0-9]{3,4}$/;

      $scope.errors = {};

      if((!$scope.checkout.first_name)||(!regExpText.test($scope.checkout.first_name))) {
        isValid = false;
        $scope.errors.first_name = ERROR_FIRST_NAME;
      }
      if((!$scope.checkout.last_name)||(!regExpText.test($scope.checkout.last_name))) {
        isValid = false;
        $scope.errors.last_name = ERROR_LAST_NAME;
      }
      if((!$scope.checkout.email)||(!regExpEmail.test($scope.checkout.email))) {
        isValid = false;
        $scope.errors.email = ERROR_EMAIL;
      }
      /*if(!$scope.checkout.address) {
        isValid = false;
        $scope.errors.address = ERROR_ADDRESS;
      }*/
      if ((!$scope.checkout.zip)||(!regExpZip.test($scope.checkout.zip))) {
        isValid = false;
        $scope.errors.zip = ERROR_ZIP;
      }
      /*if(!$scope.checkout.locality) {
        isValid = false;
        $scope.errors.address = ERROR_ADDRESS;
      }
      if(!$scope.checkout.administrative_area_level_1) {
        isValid = false;
        $scope.errors.address = ERROR_ADDRESS;
      }
      if((!$scope.checkout.postal_code)||(!regExpZip.test($scope.checkout.postal_code))) {
        isValid = false;
        $scope.errors.address = ERROR_ADDRESS;
      }
      if(!$scope.checkout.country) {
        isValid = false;
        $scope.errors.address = ERROR_ADDRESS;
      }*/
      if((!$scope.checkout.credit_card)||(!regExpCreditCard.test($scope.checkout.credit_card))) {
        isValid = false;
        $scope.errors.credit_card = ERROR_CREDIT_CARD;
      }
      if((!$scope.checkout.exp_month)||($scope.checkout.exp_month===INITIAL_EXP_MONTH)) {
        isValid = false;
        $scope.errors.exp_month = ERROR_EXP_MONTH;
      }
      if((!$scope.checkout.exp_year)||($scope.checkout.exp_year===INITIAL_EXP_YEAR)) {
        isValid = false;
        $scope.errors.exp_year = ERROR_EXP_YEAR;
      }
      if((!$scope.checkout.cvv)||(!regExpCVV.test($scope.checkout.cvv))) {
        isValid = false;
        $scope.errors.cvv = ERROR_CVV;
      }
      if(!$scope.checkout.first_check) {
        isValid = false;
        $scope.errors.first_check = ERROR_CHECK;
      }

      return isValid;
    };

    var fireConversion = function() {
      $window.google_trackConversion({
        google_conversion_id : 1061441233,
        google_conversion_language : 'en',
        google_conversion_format : '3',
        google_conversion_color : 'ffffff',
        google_conversion_label : '3nLzCIHO-GMQ0Z2R-gM',
        google_remarketing_only : false
      });
    };

    var fetchRegionInfo = function(data, cb) {
      cb || (cb = function() {});
      request.get('https://ziptasticapi.com/'+ data.zip)
        .then(function(regionData) {
          data.city = toTitleCase(regionData.city);
          data.state = toTitleCase(regionData.state);
          cb(data);
        }).catch(function(pError) {
          data.city = DEFAULT_CITY;
          data.state = DEFAULT_STATE;
          cb(data);
        });
    };

    var toTitleCase = function(str) {
      if (!str) { return; }
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

    $scope.checkInput = function(pInput) {
      $scope.empty[pInput] = $scope.checkout[pInput] ? undefined : true;
    };

    //Initializae map and set the options
    $scope.$on('mapInitialized', function(event, map) {
      map.setOptions({
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        draggable: false
      });
    });

    var init = function() {
    	fireConversion();

      $scope.person.name = $location.search().name;
      $scope.person.age = $location.search().age;
      $scope.person.location = $location.search().location;
      $scope.isPersonSearch = $scope.person.name ? true : false;

      $scope.person.phone = $location.search().phone;
      $scope.isPhoneSearch = $scope.person.phone ? true : false;

      $scope.person.address = $location.search().address;
      $scope.person.city = $location.search().city;
      $scope.person.state = $location.search().state;
      $scope.mapPosition = $location.search().mapPosition;
      $scope.isAddressSearch = $location.search().address ? true : false;
      $scope.recordsAvailable = getRandomNumber(50,100);

      //initAutocomplete();

      if(person) {
        request.get('https://maps.googleapis.com/maps/api/geocode/json?components=administrative_area:'+person.addresses[0].county+'&administrative_area:'+person.addresses[0].state+'|country:US&key='+constants.GoogleAPIKey)
        .then(function(mapData) {
          if(mapData.results.length) {
            $scope.mapPosition = mapData.results[0].geometry.location.lat +','+ mapData.results[0].geometry.location.lng;
          }
        }).catch(function(pError) {
          return pError;
        });
      } else {
        if((!$scope.isAddressSearch)&&(!scope.isPersonSearch)) {
          $location.path('/');
        }
      }
    };

    init();
  });
