'use strict';

/**
 * @ngdoc function
 * @name frontendv1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendv1App
 */
angular.module('frontendv1App').controller('MainCtrl', function ($scope, $location, checkout) {
    /**
     * CONSTANTS
     */
    
    /**
     * SCOPE VARIABLES
     */
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.testimonials = [
        [{
            'description': 'I was shocked by what information I can dig up on people',
            'author': '- Kate, California',
            'image': 'img1.gif'
        },{
            'description': 'I was shocked by what information I can dig up on people',
            'author': '- Kate, California',
            'image': 'img2.gif'
        }],[{
            'description': 'I was shocked by what information I can dig up on people',
            'author': '- Kate, California',
            'image': 'img3.gif'
        },{
            'description': 'I was shocked by what information I can dig up on people',
            'author': '- Kate, California',
            'image': 'img4.gif'
        }],[{
            'description': 'I was shocked by what information I can dig up on people',
            'author': '- Kate, California',
            'image': 'img5.gif'
        },{
            'description': 'I was shocked by what information I can dig up on people',
            'author': '- Kate, California',
            'image': 'img6.gif'
        }]
    ];

    $scope.$on('$viewContentLoaded', function(){
        //Here your view content is fully loaded !!
        window.optimizely = window.optimizely || [];
        window.optimizely.push(['activate', 4235071338]);
    });


    /**
     * Private functions
     */
    var init = function () {
        if (Object.keys($location.search()).length!==0) {
            if ($location.search().s) {
                checkout.setTrackId($location.search().s);
            }
        }
    };

    init();
});
