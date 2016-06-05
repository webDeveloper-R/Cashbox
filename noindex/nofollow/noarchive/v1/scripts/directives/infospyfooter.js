'use strict';

/**
 * @ngdoc directive
 * @name frontendv1App.directive:infoSpyFooter
 * @description
 * # infoSpyFooter
 */
angular.module('frontendv1App')
  .directive('infoSpyFooter', function () {
    return {
		templateUrl: 'views/footer.html',
		restrict: 'E',
		controller: 'FooterController'
	};
  });
