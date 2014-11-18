angular.module('orderup').service('ReservationService', function() {
    'use strict';
    var date = new Date();
    var currentHour = date.getHours();
    var currentDay = date.getDay();
    var expiredTime = [];

    for (var i = 0; i < 24; i++) {
        for (var j = 0; j < 7; j++) {
            var state = 0;
            if (currentDay > j) {
                state = -1;
            } else if (currentDay === j) {
                if (currentHour >= i) {
                    state = -1;
                }
            }

            if (state === -1) {
                if (!expiredTime[i]) {
                    expiredTime[i] = [];
                }
                expiredTime[i][j] = state;
            }
        }
    }

    return {
        test: function() {
            return Math.random();
        },
        isFree: function(hour, day) {
            var date = new Date();
            var isOccupied = function(hour, day, occupied, max) {
                if (!occupied[hour]) return true;
                if (!occupied[hour][day]) return true;
                return (occupied[hour][day] < max);
            };

            if (date.getDay() < day) {
                return isOccupied(hour, day, this.occupied, this.max);
            } else if (date.getDay() == day && date.getHours() < hour) {
                return isOccupied(hour, day, this.occupied, this.max);
            }
            return false;
        },
        reserve: function(hour, day) {
            if (!this.occupied[hour]) {
                this.occupied[hour] = [];
            }
            if (!this.occupied[hour][day]) {
                this.occupied[hour][day] = 1;
            } else {
                this.occupied[hour][day] += 1;
            }
        },
        max: 1,
        occupied: expiredTime,
        currentTime: new Date().getHours(),
        currentDay: new Date().getHours()
    };
});
