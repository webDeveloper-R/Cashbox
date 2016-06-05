'use strict';

/**
 * @ngdoc service
 * @name frontendv1App.utils
 * @description
 * # utils
 * Factory in the frontendv1App.
 */
angular.module('frontendv1App')
  .factory('utils', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
