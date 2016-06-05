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
    'ui.bootstrap'
  ]);

app.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/results', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .when('/checkout', {
        templateUrl: 'views/checkout.html',
        controller: 'CheckoutCtrl'
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
    