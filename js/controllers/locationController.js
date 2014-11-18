angular.module('orderup')
    .controller('LocationController',
        function($scope, $http) {
            'use strict';

            $scope.cafes = [{restaurant: 'Satellite Coffee'},{restaurant: 'Ladro'}];
            $scope.selectedCafe = $scope.cafes[0];
        });
