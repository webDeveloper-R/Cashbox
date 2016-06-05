

angular.module('frontendv1App').controller('Search5ModalCtrl', function ($scope, $uibModalInstance, person) {

	/**
	 * CONSTANTS
	 */
	
	/**
	 * Scope variables
	 */
	$scope.person = person;
	
	/**
	 * Private variables
	 */
	
	/**
	 * SCOPE functions
	 */
	$scope.nextStep = function() {
		$uibModalInstance.close();
	};
});