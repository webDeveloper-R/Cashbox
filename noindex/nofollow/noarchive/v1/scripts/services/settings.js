'use strict';

/**
 * @ngdoc service
 * @name frontendv1App.settings
 * @description
 * # settings
 * Factory in the frontendv1App.
 */
angular.module('frontendv1App')
  .factory('settings', function () {
    // Current environmet: develop, staging or production
  var currentEnvironmet = 'develop';

  var configuration =
  {
    develop:
    {
      serviceURL:'http://be.playclick.net/api'
    },
    staging:
    {
      serviceURL:''
    },
    production: {
      serviceURL: ''
    }
  };
  return {
    getConfiguration : function() {
      return configuration[currentEnvironmet];
    },
    getSetting : function(pSettingName) {
      return configuration[currentEnvironmet][pSettingName];
    },
    getEnvironment: function() {
      return currentEnvironmet;
    }
  };
});
