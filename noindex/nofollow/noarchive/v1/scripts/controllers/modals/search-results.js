

angular.module('frontendv1App').controller('SearchResultsModalCtrl', function ($scope, $uibModalInstance, person) {

	/**
	 * CONSTANTS
	 */
	var ON_MESSAGE = 'Finish';
	var BROADCAST_MESSAGE = 'start';

	/**
	 * Scope variables
	 */
	$scope.person = person;
	$scope.tabs = [
		{
			title: 'Step 1',
			disabled: true
		},
		{ 
			title: 'Step 2',
			disabled: true
		},
		{ 
			title: 'Step 3',
			disabled: true
		}/*,
		{ 
			title: 'Step 4',
			disabled: true
		}*/
	];

	/**
	 * SCOPE functions
	 */
	$scope.$on(ON_MESSAGE, function (event, pData) {
		if(pData!==$scope.tabs.length) {
			$scope.$broadcast(BROADCAST_MESSAGE, pData + 1);
			$scope.tabs[pData].active = true;
		} else {
			$uibModalInstance.close();
		}
	});
	
	/**
	 * Private variables
	 */
	
	/**
	 * Private functions
	 */

	var init = function() {
    };

    init();
});