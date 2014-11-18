angular.module('orderup')
    .controller('RestaurantController',
        function($scope, $routeParams) {
            'use strict';
            $scope.restaurant = $routeParams.restaurant;
            $scope.location = $routeParams.location;
            $scope.orders = [{
                size: 'small'
            }];
            $scope.pickupTime = new Date();
            $scope.previousPickupTime = new Date();
            $scope.config = {
                openTime: new Date($scope.pickupTime.toDateString()),
                closeTime: new Date($scope.pickupTime.toDateString()) + (20 * 60 * 1000),
                menu: {
                    drinks: [{
                        name: 'Americano',
                        small: '2.00',
                        medium: '2.4',
                        large: '3.00'
                    }, {
                        name: 'Latte',
                        small: '2.50',
                        medium: '3.00',
                        large: '3.25'
                    }, {
                        name: 'Mocha',
                        small: '3.00',
                        medium: '3.40',
                        large: '4.00'
                    }, {
                        name: 'Chai',
                        small: '3.00',
                        medium: '3.40',
                        large: '4.00'
                    }],
                    flavors: [{
                        name: 'Irish Cream',
                        small: '.70',
                        medium: '.70',
                        large: '.70'
                    }, {
                        name: 'Almond',
                        small: '.70',
                        medium: '.70',
                        large: '.70'
                    }, {
                        name: 'Hazelnut',
                        small: '.70',
                        medium: '.70',
                        large: '.70'
                    }, {
                        name: 'Caramel',
                        small: '.70',
                        medium: '.70',
                        large: '.70'
                    }, {
                        name: 'Vanilla',
                        small: '.70',
                        medium: '.70',
                        large: '.70'
                    }],
                    milks: [{
                        name: 'Half n half',
                        small: '.60',
                        medium: '.70',
                        large: '.80'
                    }, {
                        name: 'Hemp',
                        small: '.80',
                        medium: '1.00',
                        large: '1.20'
                    }, {
                        name: 'Rice',
                        small: '.60',
                        medium: '.70',
                        large: '.80'
                    }, {
                        name: 'Almond',
                        small: '.60',
                        medium: '.70',
                        large: '.80'
                    }, {
                        name: 'Soy',
                        small: '.60',
                        medium: '.70',
                        large: '.80'
                    }, {
                        name: 'Whole',
                        small: '.00',
                        medium: '.00',
                        large: '.00'
                    }, {
                        name: 'Non Fat',
                        small: '.00',
                        medium: '.00',
                        large: '.00'
                    }],
                    chocolates: [{
                        name: 'milk',
                        small: '.00',
                        medium: '.00',
                        large: '.00'
                    }, {
                        name: 'dark',
                        small: '.00',
                        medium: '.00',
                        large: '.00'
                    }],
                    shots: [{
                        name: 'shot',
                        small: '.60',
                        medium: '.60',
                        large: '.60'
                    }]
                }
            };

            $scope.getSize = function(count) {
                if (12 % count === 0) {
                    return 'col-md-' + (12 / count);
                }
                return '';
            };

            $scope.calcPrice = function(order) {
                var requestedSize = order.size;
                var findCost = function(item, size) {
                    if (!item) return 0;
                    var menu = $scope.config.menu;
                    for (var i = 0; i < menu.drinks.length; i++) {
                        if (menu.drinks[i].name === item) {
                            return menu.drinks[i][size];
                        }
                    }
                    for (var i = 0; i < menu.flavors.length; i++) {
                        if (menu.flavors[i].name === item) {
                            return menu.flavors[i][size];
                        }
                    }
                    for (var i = 0; i < menu.milks.length; i++) {
                        if (menu.milks[i].name === item) {
                            return menu.milks[i][size];
                        }
                    }
                    for (var i = 0; i < menu.chocolates.length; i++) {
                        if (menu.chocolates[i].name === item) {
                            return menu.chocolates[i][size];
                        }
                    }
                    for (var i = 0; i < menu.shots.length; i++) {
                        if (menu.shots[i].name === item) {
                            return menu.shots[i][size];
                        }
                    }
                };

                order.price = 0;
                order.price += parseFloat(findCost(order.drink, requestedSize));
                if (order.chocolate)
                    order.price += parseFloat(findCost(order.chocolate, requestedSize));
                if (order.extraShots)
                    order.price += (order.extraShots * parseFloat(findCost('shot', requestedSize)));


                if (order.milk) {
                    var milks = Object.keys(order.milk);
                    for (var i = 0; i < milks.length; i++) {
                        if (order.milk[milks[i]] === true) {
                            order.price += parseFloat(findCost(milks[i], requestedSize));
                        }
                    }
                }
                if (order.flavor) {
                    var flavors = Object.keys(order.flavor);
                    for (var i = 0; i < flavors.length; i++) {
                        if (order.flavor[flavors[i]] === true) {
                            order.price += parseFloat(findCost(flavors[i], requestedSize));
                        }
                    }
                }

                order.price = order.price.toFixed(2);
            };

            $scope.determineShotPlurality = function(numOfShots) {
                var verbage = ['no','single','double','triple'];
                return numOfShots ? verbage[numOfShots] + ' shot' : '';
            };

            $scope.determineTime = function(date) {
                var min = (date.getMinutes().toString().length === 1 ? '0':'') + date.getMinutes();
                var meridian = (date.getHours() >= 12 ? ' pm' : ' am');
                return (date.getHours() === 12 ? 12 : (date.getHours() % 12)) + ':' + min + meridian;
            };

            $scope.getTotal = function(orders){
                var cost = 0;
                for(var i = 0; i < orders.length; i++){
                    if(orders[i].price){
                        cost += parseFloat(orders[i].price);
                    }
                }

                $scope.total = cost.toFixed(2);
                return $scope.total;
            };
        }
);
