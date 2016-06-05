'use strict';

/**
 * @ngdoc directive
 * @name frontendv1App.directive:infospyheader
 * @description
 * # infospyheader
 */
angular.module('frontendv1App')
  .directive('infoSpyHeader', function () {
    return {
		templateUrl: 'views/header.html',
		restrict: 'E',
		controller: 'HeaderController'
	};
  });
