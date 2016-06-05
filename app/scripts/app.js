'use strict';

/**
 * @ngdoc overview
 * @name frontendv1App
 * @description
 * # frontendv1App
 *
 * Main module of the application.
 */
var app = angular.module('frontendv1App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngMap',
    'ngshowvariant',
    'angularSpinner'
  ]);

app.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })

      .when('/sign-up', {
        controller : function(){
            window.location.replace('/sign-up.html');
        }, 
        template : '<div></div>'
      })

      .when('/blog', {
        controller : function(){
            window.location.replace('/blog/');
        }, 
        template : '<div></div>'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/search-phone', {
        templateUrl: 'views/search-phone.html',
        controller: 'SearchPhoneCtrl'
      })
      .when('/search-property', {
        templateUrl: 'views/search-property.html',
        controller: 'SearchPropertyCtrl'
      })
      
      .when('/results', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .when('/results-not-found', {
        templateUrl: 'views/results-not-found.html',
        controller: 'ResultsNotFoundCtrl'
      })
      .when('/checkout', {
        templateUrl: 'views/checkout.html',
        controller: 'CheckoutCtrl'
      })
      .when('/thankyou', {
        templateUrl: 'views/thank-you.html',
        controller: 'ThankYouCtrl'
      })
      .when('/404', {
        templateUrl: '404.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/404'
      });

      // use the HTML5 History API
      $locationProvider.html5Mode(true);
  });
    