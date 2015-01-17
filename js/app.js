'use strict';

/**
 * @ngdoc overview
 * @name docrjs
 * @description
 * # docrjs
 *
 * Main module of the application.
 */
angular
    .module('orderup', [
        'ui.router',
        'ui.bootstrap',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function($routeProvider) {
        // $routeProvider.when('/', {templateUrl: 'partials/welcome.html',controller: 'ScheduleController'});
        $routeProvider.when('/:restaurant', {
            templateUrl: 'partials/restaurant.html',
            controller: 'RestaurantController'
        }).when('/:restaurant/:location', {
            templateUrl: 'partials/restaurant.html',
            controller: 'RestaurantController'
        }).when('/:restaurant/:location/feed', {
            templateUrl: 'partials/feed.html',
            controller: 'RestaurantController'
        }).when('/',{
            templateUrl: 'partials/locationFinder.html',
            controller: 'LocationController'
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });
