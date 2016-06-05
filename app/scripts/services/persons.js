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
    var baseUrl = settings.getSetting('membersURL');
	var personsURL = baseUrl + '/search';
	
	var persons;
	var person;
	var allResults;

	this.getMatchPersons = function(pFilters) {
		return request.post(personsURL, pFilters)
		.then(function(pResults) {
	        persons = pResults.data;
	        allResults = pResults;
	        return persons;
	    }).catch(function(pError) {
	    	return pError;
	    });
	};

	this.getAllResults = function() {
		return allResults;
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
