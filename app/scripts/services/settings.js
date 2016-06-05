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
      membersURL: 'http://members.playclick.net/api'
    },
    staging:
    {
      membersURL: 'http://members.playclick.net/api'
    },
    production: {
      membersURL: 'http://members.playclick.net/api'
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
