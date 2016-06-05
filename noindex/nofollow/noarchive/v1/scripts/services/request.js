'use strict';

/**
 * @ngdoc service
 * @name frontendv1App.request
 * @description
 * # request
 * Factory in the frontendv1App.
 */
angular.module('frontendv1App')
  .factory('request',  ['$http', '$q', function ($http, $q) {
    return {
    /**
     * function to get response from the url pass by parameter
     * @param  {String} pUrl - Url to make the request
     * @return {Object} Return the promise object
     */
    get: function(pUrl){
      var deferred = $q.defer();

      $http({
        url: pUrl,
        method: 'GET',
        withCredentials: true
      }).success(function(data) {
        deferred.resolve(data);
      }).error(function(data, status) {
        deferred.reject(status, data);
      });
      //return the pormise object
      return deferred.promise;
    },
    /**
     * function to post a new document in the database
     * @param  {String} pUrl - url available to make a post
     * @param  {Object} pData - Object to save in the database
     * @return {Object} Return the promise object
     */
    post: function(pUrl, pData){
      var deferred = $q.defer();

      $http({
        url: pUrl,
        method: 'POST',
        withCredentials: true,
        data: pData
      }).success(function(data) {
        deferred.resolve(data);
      }).error(function(data, status) {
        deferred.reject(data, status);
      });
      //return the pormise object
      return deferred.promise;
    },
    /**
     * function to update document of collection in the database via request
     * @param  {String} pUrl - url available ti make the put request
     * @param  {Object} pData - object to update the document in the collection
     * @return {Object} Return the promise object
     */
    save: function(pUrl, pData) {
      var deferred = $q.defer();

      $http({
        url: pUrl,
        method: 'PUT',
        withCredentials: true,
        data: pData
      }).success(function(data) {
        deferred.resolve(data);
      }).error(function(data, status) {
        deferred.reject(data, status);
      });
      //return the pormise object
      return deferred.promise;
    },
    /**
     * function to delete document form collection in the database via request
     * @param  {String} pUrl - url available to delete document from db
     * @return {Object} Return the promise object
     */
    delete: function(pUrl){
      var deferred = $q.defer();

      $http({
        url: pUrl,
        method: 'DELETE',
        withCredentials: true
      }).success(function(data) {
        deferred.resolve(data);
      }).error(function(data, status) {
        deferred.reject(data, status);
      });
      //return the pormise object
      return deferred.promise;
    }
  };
}]);
