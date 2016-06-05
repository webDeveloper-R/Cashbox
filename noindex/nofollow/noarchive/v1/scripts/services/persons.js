'use strict';

/**
 * @ngdoc service
 * @name frontendv1App.persons
 * @description
 * # persons
 * Service in the frontendv1App.
 */
angular.module('frontendv1App')
  .service('persons', function (request, settings) {
    var baseUrl = settings.getSetting('serviceURL');
	var personsURL = baseUrl + '/v1/search';
	
	var persons;
	var person;

	this.getMatchPersons = function(pFilters) {
		return request.post(personsURL, pFilters)
		.then(function(pResults) {
	        persons = pResults[0].data;
	        return persons;
	    }).catch(function(pError) {
	    	return pError;
	    });
	};

	this.getPersons = function() {
		return persons;
	};

	this.setPerson = function(pPerson) {
		person = pPerson;
	};

	this.getPerson = function() {
		return person;
	};
  });
